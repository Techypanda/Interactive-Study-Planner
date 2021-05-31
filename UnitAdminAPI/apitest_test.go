package UnitAdminAPI_test

// aws cognito-idp admin-initiate-auth --user-pool-id ap-southeast-2_gn4KIEkx0 --client-id 5ou2dj6rrbrs53vh4kh3uknk6b --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters "USERNAME=$USERNAME,PASSWORD=$PASSWORD"

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"os"
	"testing"
)

func deepCompare(file1, file2 string) (bool, error) {
	const chunkSize = 64000
	// Check file size ...
	f1, err := os.Open(file1)
	if err != nil {
		return false, err
	}
	defer f1.Close()

	f2, err := os.Open(file2)
	if err != nil {
		return false, err
	}
	defer f2.Close()

	for {
		b1 := make([]byte, chunkSize)
		_, err1 := f1.Read(b1)

		b2 := make([]byte, chunkSize)
		_, err2 := f2.Read(b2)

		if err1 != nil || err2 != nil {
			if err1 == io.EOF && err2 == io.EOF {
				return true, nil
			} else if err1 == io.EOF || err2 == io.EOF {
				return false, err1
			} else {
				return false, err1
			}
		}

		if !bytes.Equal(b1, b2) {
			return false, errors.New(fmt.Sprintf("Files not the same: %s & %s\nContents of File 1: %v\nContents of File 2: %v", file1, file2, b1, b2))
		}
	}
}

func TestAddUnitEndpoint(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualaddunitresponse.json", "./unittests/responses/expectedaddunitresponse.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestAddMajorEndpoint(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualaddmajorresponse.json", "./unittests/responses/expectedaddmajorresponse.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestAddSpecEndpoint(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualaddspecresponse.json", "./unittests/responses/expectedaddspecresponse.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}

func TestUpdateUnitEndpoint(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualupdateunitresponse.json", "./unittests/responses/expectedupdateunitresponse.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestUpdateSpecEndpoint(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualupdatespecresponse.json", "./unittests/responses/expectedupdatespecresponse.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestUpdateMajorEndpoint(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualupdatemajorresponse.json", "./unittests/responses/expectedupdatemajorresponse.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}

func TestRemoveUnitEndpoint(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualremoveunitresponse.json", "./unittests/responses/expectedremoveunitresponse.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestRemoveMajorEndpoint(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualremovemajorresponse.json", "./unittests/responses/expectedremovemajorresponse.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestRemoveSpecEndpoint(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualremovespecresponse.json", "./unittests/responses/expectedremovespecresponse.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
