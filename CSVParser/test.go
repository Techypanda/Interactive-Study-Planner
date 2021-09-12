package main

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
)

func main() {
	b, err := ioutil.ReadFile("Test.csv")
	if err != nil {
		fmt.Print(err)
	} else {
		str := base64.StdEncoding.EncodeToString(b)
		var jsonStr = []byte(fmt.Sprintf(`{ "csvData": "%s" }`, str))
		fmt.Println(string(jsonStr))
		// req, err := http.NewRequest("POST", "http://localhost:3000/add", bytes.NewBuffer(jsonStr))
		// client := &http.Client{}
		// resp, err := client.Do(req)
		// if err != nil {
		// 	panic(err)
		// }
		// defer resp.Body.Close()
		// body, _ := ioutil.ReadAll(resp.Body)
		// fmt.Println("repsonse body:", string(body))
	}
}
