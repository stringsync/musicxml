package main

import (
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

type ValidateResponse struct {
	Code string `json:"code"`
	Error string `json:"error,omitempty"`
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
		encoder.Encode(ValidateResponse{badRequest, err.Error()})
		return
	}

	err = xsdHandler.ValidateMem(body, xsdvalidate.ParsErrVerbose)
	if err != nil {
		encoder.Encode(ValidateResponse{validationError, err.Error()})
		return
	}

	encoder.Encode(ValidateResponse{ok, ""})
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
