package token

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"log"
	"os"
	"time"
)

type parsedDetails struct {
	UserId   uint32
	UserRole string
	Uuid     string
}

// TODO: Change in APP ROLEs to ENUM

// CreateToken Create access (at) and refresh (rt) token with userId, userRole and uuid as claims.
func CreateToken(redisClient *redis.Client, userId uint32, userRole string) (string, string, error) {
	var ctx = context.Background()

	atExpiry := time.Now().Add(time.Minute * 1).Unix()
// 	atExpiry := time.Now().Add(time.Minute * 15).Unix()
	atUuid := uuid.New()
// 	rtExpiry := time.Now().Add(time.Minute * 2).Unix()
	rtExpiry := time.Now().Add(time.Hour * 24 * 7).Unix()
	rtUuid := uuid.New()

	// CREATE ACCESS TOKEN
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":   userId,
		"uuid":      atUuid,
		"user_role": userRole,
		"exp":       atExpiry,
	})
	accessTokenString, err := accessToken.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil {
		return "", "", status.Error(codes.Unauthenticated, "token creation error")
	}

	// CREATE REFRESH TOKEN
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":   userId,
		"uuid":      rtUuid,
		"user_role": userRole,
		"exp":       rtExpiry,
	})
	refreshTokenString, err := refreshToken.SignedString([]byte(os.Getenv("REFRESH_SECRET")))
	if err != nil {
		return "", "", status.Error(codes.Unauthenticated, "token creation error")
	}

	// Convert Unix to UTC
	atUtc := time.Unix(atExpiry, 0)
	rtUtc := time.Unix(rtExpiry, 0)
	now := time.Now()

	err = redisClient.Set(ctx, atUuid.String(), userId, atUtc.Sub(now)).Err()
	if err != nil {
		return "", "", status.Error(codes.Unauthenticated, "token set error")
	}
	err = redisClient.Set(ctx, rtUuid.String(), userId, rtUtc.Sub(now)).Err()
	if err != nil {
		return "", "", status.Error(codes.Unauthenticated, "token set error")
	}

	return accessTokenString, refreshTokenString, nil
}

func LookupToken(redisClient *redis.Client, uuid string) error {
	_, err := redisClient.Get(context.Background(), uuid).Result()
	if err != nil {
		return status.Error(codes.Unauthenticated, "no access token found")
	}

	return nil
}

// DecodeToken extract from token uuid, user role and user id details
func DecodeToken(token string, secret string) (*parsedDetails, error) {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(secret), nil
	})

	if err != nil {
	    log.Println("decode/parse token error", err, token)
		v, _ := err.(*jwt.ValidationError)
		if v.Errors == jwt.ValidationErrorExpired {
			return nil, status.Error(codes.Unauthenticated, "token is expired")
		} else {
			return nil, status.Error(codes.Unauthenticated, "token format error")
		}
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if ok && parsedToken.Valid {
		return &parsedDetails{
			UserId:   uint32(claims["user_id"].(float64)),
			UserRole: claims["user_role"].(string),
			Uuid:     claims["uuid"].(string),
		}, nil
	}

	return nil, status.Error(codes.Unauthenticated, "token claims error")
}

// DeleteToken Delete token from redis store
func DeleteToken(redisClient *redis.Client, token string, secret string) error {
	parsedToken, err := DecodeToken(token, secret)
	if err != nil {
		return status.Error(codes.Unauthenticated, "token format error")
	}

	_, err = redisClient.Del(context.Background(), parsedToken.Uuid).Result()
	if err != nil {
		return status.Error(codes.Unauthenticated, "token delete error")
	}

	return nil
}
