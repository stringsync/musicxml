package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	xsdvalidate "github.com/terminalstatic/go-xsd-validate"
)

const (
	// config
	defaultPort = "8080"
	schemaUrl = "file://app/schema/musicxml.xsd"

	// codes
	ok = "OK"
	badRequest = "BAD_REQUEST"
	validationError = "VALIDATION_ERROR"
)

var xsdHandler *xsdvalidate.XsdHandler

type nullableString struct {
	sql.NullString
}

type validateResponse struct {
	Code string `json:"code"`
	Error nullableString `json:"error"`
}

func (s nullableString) MarshalJSON() ([]byte, error) {
	if !s.Valid {
		return []byte("null"), nil
	}
	return json.Marshal(s.String)
}

func newValidateResponse(code string, err error) validateResponse {
	var errorStr nullableString
	if err == nil {
		errorStr = nullableString{
			NullString: sql.NullString{Valid: false},
		}
	} else {
		errorStr = nullableString{
			NullString: sql.NullString{String: err.Error(), Valid: true},
		}
	}
	return validateResponse{
		Code: code,
		Error: errorStr,
	}
}

func validate(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if req.Method != "POST" {
		http.NotFound(w, req)
		return
	}
	
	encoder := json.NewEncoder(w)
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		encoder.Encode(newValidateResponse(badRequest, err))
		return
	}

	err = xsdHandler.ValidateMem(body, xsdvalidate.ParsErrVerbose)
	if err != nil {
		encoder.Encode(newValidateResponse(validationError, err))
		return
	}

	encoder.Encode(newValidateResponse(ok, nil))
}

func main() {
	xsdvalidate.Init()
	defer xsdvalidate.Cleanup()

	var err error
	xsdHandler, err = xsdvalidate.NewXsdHandlerUrl(schemaUrl, xsdvalidate.ParsErrDefault)
	defer xsdHandler.Free()
	if err != nil {
		log.Fatalf("failed to create xsd handler: err=%v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	http.HandleFunc("/validate", validate)

	fmt.Println(fmt.Sprintf("running on port %s", port))
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
