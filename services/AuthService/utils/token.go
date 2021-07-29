package token

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
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

	atExpiry := time.Now().Add(time.Minute * 1).Unix() //atExpires := time.Now().Add(time.Minute * 15).Unix()
	atUuid := uuid.New()
	rtExpiry := time.Now().Add(time.Minute * 2).Unix() //rtExpires := time.Now().Add(time.Hour * 24 * 7).Unix()
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
		return "", "", err
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
		return "", "", err
	}

	// Convert Unix to UTC
	atUtc := time.Unix(atExpiry, 0)
	rtUtc := time.Unix(rtExpiry, 0)
	now := time.Now()

	err = redisClient.Set(ctx, atUuid.String(), userId, atUtc.Sub(now)).Err()
	if err != nil {
		return "", "", err
	}
	err = redisClient.Set(ctx, rtUuid.String(), userId, rtUtc.Sub(now)).Err()
	if err != nil {
		return "", "", err
	}

	return accessTokenString, refreshTokenString, nil
}

func LookupToken(redisClient *redis.Client, uuid string) error {
	_, err := redisClient.Get(context.Background(), uuid).Result()
	if err != nil {
		return err
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
		return nil, fmt.Errorf("token parsing error")
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if ok && parsedToken.Valid {
		return &parsedDetails{
			UserId:   uint32(claims["user_id"].(float64)),
			UserRole: claims["user_role"].(string),
			Uuid:     claims["uuid"].(string),
		}, nil
	}

	return nil, fmt.Errorf("invalid token")
}

// DeleteToken Delete token from redis store
func DeleteToken(redisClient *redis.Client, token string, secret string) error {
	parsedToken, err := DecodeToken(token, secret)
	if err != nil {
		return err
	}

	_, err = redisClient.Del(context.Background(), parsedToken.Uuid).Result()
	if err != nil {
		return err
	}

	return nil
}

//	type customClaims struct { https://pkg.go.dev/github.com/golang-jwt/jwt#NewWithClaims
//		UserId uint32 `json:"user_id"`
//		Username string `json:"username"`
//		UserRole string `json:"user_role"`
//		jwt.StandardClaims
//	}
//
//	claims := customClaims{
//		UserId:         request.UserId,
//		Username:       request.Username,
//		UserRole:       request.UserRole,
//		StandardClaims: jwt.StandardClaims{
//			Issuer:    "",
//			ExpiresAt: 0,
//		},
//	}
