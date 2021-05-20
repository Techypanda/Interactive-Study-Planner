package UnitAdminAPI_test

// aws cognito-idp admin-initiate-auth --user-pool-id ap-southeast-2_gn4KIEkx0 --client-id 5ou2dj6rrbrs53vh4kh3uknk6b --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters "USERNAME=$USERNAME,PASSWORD=$PASSWORD"

import (
	"context"
	"errors"
	"fmt"
	"os"
	"testing"

	"github.com/dgrijalva/jwt-go"
	"github.com/lestrrat-go/jwx/jwk"
)

func parseToken(token *jwt.Token) (interface{}, error) {
	set, err := jwk.Fetch(context.Background(), "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_gn4KIEkx0/.well-known/jwks.json")
	if err != nil {
		return nil, err
	}
	keyID, ok := token.Header["kid"].(string)
	if !ok {
		return nil, errors.New("expecting JWT header to have string kid")
	}
	if key := set.LookupKeyID(keyID); len(key) == 1 {
		return key[0].Materialize()
	}
	return nil, fmt.Errorf("unable to find key %q", keyID)
}

/*
	The Assumption Is Made API is running on localhost.
*/
func TestAddEndpoint(t *testing.T) {
	token := os.Getenv("token")
	if token != "" {
		jwToken, err := jwt.Parse(token, parseToken)
		if err != nil {
			t.Fatalf("JWT Passing Error: %v", err)
		}
		fmt.Println(jwToken)
	} else {
		t.Fatalf("Missing Token Environment Variable!")
	}
	/* client := resty.New()
	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetBody(`{"unitCode": "COMP7001","unitName": "This was updated","unitDescription": "A very long unit description 2.0","credits": 50,"delivery": "In Person","prerequistes": [ "COMP7001"],"antirequistes": [""],"corequistes": [""]}`).
		Post("http://localhost:3000/addunit")
	if err == nil {
		if resp.StatusCode() != http.StatusOK {
			t.Fatalf("Failed Addition (Expected Success) Status Code: %d, resp: %s", resp.StatusCode(), resp)
		}
		resp2, err2 := client.R().
			SetHeader("Content-Type", "application/json").
			SetBody(`{"unitCode": "COMP7001","unitName": "This was updated","unitDescription": "A very long unit description 2.0","credits": 50,"delivery": "In Person","prerequistes": [ "COMP7001"],"antirequistes": [""],"corequistes": [""]}`).
			Post("http://localhost:3000/addunit")
		if err2 == nil {
			if resp2.StatusCode() != http.StatusBadRequest {
				t.Fatalf("Failed To Fail Addition (Expected Failure) Status Code: %d, resp: %s", resp2.StatusCode(), resp2)
			}
			// cleanup, we can assume it will pass
			client.R().
				SetHeader("Content-Type", "application/json").
				SetBody(`{"unitCode": "COMP7001","unitName": "This was updated","unitDescription": "A very long unit description 2.0","credits": 50,"delivery": "In Person","prerequistes": [ "COMP7001"],"antirequistes": [""],"corequistes": [""]}`).
				Post("http://localhost:3000/removeunit")
		} else {
			t.Fatalf("Failed To Fail Addition (Expected Failure): %s", err2.Error())
		}
	} else {
		t.Fatalf("Failed Addition (Expected Success): %s", err.Error())
	} */
}

func TestUpdateEndpoint(t *testing.T) {
	token := os.Getenv("token")
	if token != "" {

	} else {
		t.Fatalf("Missing Token Environment Variable!")
	}
	/* client := resty.New()
	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetBody(`{"unitCode": "COMPZZZZZ","unitName": "This was updated","unitDescription": "A very long unit description 2.0","credits": 50,"delivery": "In Person","prerequistes": [ "COMP7001"],"antirequistes": [""],"corequistes": [""]}`).
		Post("http://localhost:3000/addunit")
	if err == nil {
		if resp.StatusCode() != http.StatusOK {
			t.Fatalf("Failed Update - Couldn't Create Unit To Update (Expected Success) Status Code: %d, resp: %s", resp.StatusCode(), resp)
		}
		updateResp, updateErr := client.R().
			SetHeader("Content-Type", "application/json").
			SetBody(`{"unitCode": "COMPZZZZZ","unitName": "test update","unitDescription": "A very long unit description 2.0","credits": 50,"delivery": "In Person","prerequistes": [ "COMP7001"],"antirequistes": [""],"corequistes": [""]}`).
			Post("http://localhost:3000/removeunit")
		if updateErr == nil {
			if updateResp.StatusCode() != http.StatusOK {
				t.Fatalf("Failed Update (Expected Success) Status Code: %d, resp: %s", updateResp.StatusCode(), updateResp)
			}
			updateFailResp, updateFailErr := client.R().
				SetHeader("Content-Type", "application/json").
				SetBody(`{"unitCode": "THISDOESNOTEXISTINTHEDEVDB","unitName": "test update","unitDescription": "A very long unit description 2.0","credits": 50,"delivery": "In Person","prerequistes": [ "COMP7001"],"antirequistes": [""],"corequistes": [""]}`).
				Post("http://localhost:3000/removeunit")
			if updateFailErr == nil {
				if updateFailResp.StatusCode() != http.StatusBadRequest {
					t.Fatalf("Failed To Fail Update (Expected Failure) Status Code: %d, resp: %s", updateFailResp.StatusCode(), updateFailResp)
				}
			} else {
				t.Fatalf("Failed To Fail Update (Expected Failure): %s", updateErr.Error())
			}
		} else {
			t.Fatalf("Failed Update (Expected Success): %s", updateErr.Error())
		}
	} else {
		t.Fatalf("Failed Update - Couldn't Create Unit To Update (Expected Success): %s", err.Error())
	} */
}

func TestRemoveEndpoint(t *testing.T) {
	token := os.Getenv("token")
	if token != "" {

	} else {
		t.Fatalf("Missing Token Environment Variable!")
	}
	/* client := resty.New()
	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetBody(`{"unitCode": "COMP90101010101","unitName": "This was updated","unitDescription": "A very long unit description 2.0","credits": 50,"delivery": "In Person","prerequistes": [ "COMP7001"],"antirequistes": [""],"corequistes": [""]}`).
		Post("http://localhost:3000/addunit")
	if err == nil {
		if resp.StatusCode() != http.StatusOK {
			t.Fatalf("Failed Delete - Couldn't Create Unit To Delete (Expected Success) Status Code: %d, resp: %s", resp.StatusCode(), resp)
		}
		deleteResp, deleteErr := client.R().
			SetHeader("Content-Type", "application/json").
			SetBody(`{ "unitCode": "COMP90101010101" }`).
			Post("http://localhost:3000/removeunit")
		if deleteErr == nil {
			if deleteResp.StatusCode() != http.StatusOK {
				t.Fatalf("Failed Delete (Expected Success) Status Code: %d, resp: %s", deleteResp.StatusCode(), deleteResp)
			}
			deleteFailResp, deleteFailErr := client.R().
				SetHeader("Content-Type", "application/json").
				SetBody(`{ "unitCode": "COMP90101010101" }`).
				Post("http://localhost:3000/removeunit")
			if deleteFailErr == nil {
				if deleteFailResp.StatusCode() != http.StatusBadRequest {
					t.Fatalf("Failed To Fail Delete (Expected Failure) Status Code: %d, resp: %s", deleteFailResp.StatusCode(), deleteFailResp)
				}
			} else {
				t.Fatalf("Failed To Fail Delete (Expected Failure): %s", deleteFailErr.Error())
			}
		} else {
			t.Fatalf("Failed Delete (Expected Success): %s", deleteErr.Error())
		}
	} else {
		t.Fatalf("Failed Delete - Couldn't Create Unit To Delete (Expected Success): %s", err.Error())
	} */
}
