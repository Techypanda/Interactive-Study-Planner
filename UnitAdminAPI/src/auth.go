package main

import (
	"context"
	"errors"
	"fmt"

	"github.com/dgrijalva/jwt-go"
	"github.com/lestrrat-go/jwx/jwk"
)

func validateJWT(accessTokenString string) (bool, error) {
	keySet, err := jwk.Fetch(context.TODO(), "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_1EmEPwI2J/.well-known/jwks.json")
	_, err = jwt.Parse(accessTokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		kid, ok := token.Header["kid"].(string)
		if !ok {
			return nil, errors.New("kid header missing")
		}
		keys, ok := keySet.LookupKeyID(kid)
		if !ok {
			return nil, fmt.Errorf("key with specified kid is not present in jwks")
		}
		var publickey interface{}
		err = keys.Raw(&publickey)
		if err != nil {
			return nil, fmt.Errorf("could not parse pubkey")
		}
		return publickey, nil
	})
	if err != nil {
		return false, err
	}
	return true, nil
}
