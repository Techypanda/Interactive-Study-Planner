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
			return false, errors.New(fmt.Sprintf("Files not the same: %s & %s\nContents of File 1: %s\nContents of File 2: %s", file1, file2, b1, b2))
		}
	}
}

func TestAddCareer(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualaddcareer.json", "./unittests/responses/expectedaddcareer.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestAddMajor(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualaddmajor.json", "./unittests/responses/expectedaddmajor.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestAddSpec(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualaddspec.json", "./unittests/responses/expectedaddspec.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}

func TestAddUnit(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualaddunit.json", "./unittests/responses/expectedaddunit.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestBadBulkAdd(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualbadbulkadd.json", "./unittests/responses/expectedbadbulkadd.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestBadCareer(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualbadcareer.json", "./unittests/responses/expectedbadcareer.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}

func TestBadMajor(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualbadmajor.json", "./unittests/responses/expectedbadmajor.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestBadSpec(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualbadspec.json", "./unittests/responses/expectedbadspec.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestBadUnit(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualbadunit.json", "./unittests/responses/expectedbadunit.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
func TestBulkAdd(t *testing.T) {
	_, err := deepCompare("./unittests/responses/actualbulkadd.json", "./unittests/responses/expectedbulkadd.json")
	if err != nil {
		t.Fatalf("%v", err)
	}
}
