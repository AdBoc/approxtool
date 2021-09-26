package token

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"os"
	"time"
)

type parsedDetails struct {
	UserId   uint32
	UserRole string
}

// CreateTokens Create access (at) and refresh (rt) token with userId and userRole as claims.
func CreateTokens(userId uint32, userRole string) (string, string, error) {
	// TODO: CHANGE EXPIRY DATE
	atExpiry := time.Now().Add(time.Minute * 15).Unix() // 15 minutes expiry
	rtExpiry := time.Now().Add(time.Hour * 2190).Unix() // 3 months expiry

	// create AccessToken
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":   userId,
		"user_role": userRole,
		"exp":       atExpiry,
	})
	accessTokenString, err := accessToken.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil {
		return "", "", status.Error(codes.Unauthenticated, "token creation error")
	}

	// create RefreshToken
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":   userId,
		"user_role": userRole,
		"exp":       rtExpiry,
	})
	refreshTokenString, err := refreshToken.SignedString([]byte(os.Getenv("REFRESH_SECRET")))
	if err != nil {
		return "", "", status.Error(codes.Unauthenticated, "token creation error")
	}

	return accessTokenString, refreshTokenString, nil
}

// VerifyToken extract from token user role and user id details
func VerifyToken(token string, secret string) (*parsedDetails, error) {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(secret), nil
	})

	if err != nil {
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
		}, nil
	}

	return nil, status.Error(codes.Unauthenticated, "token claims error")
}
