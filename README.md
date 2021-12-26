# musicxml

`musicxml` is a JavaScript library that makes it easy to parse and edit [musicXML](https://www.w3.org/2021/06/musicxml40/) documents.

## 🔨 Usage

TODO

## 💻 Development

### Prerequisites

`musicxml` uses Docker and Docker Compose to create the test environment. The tests will not pass if you try to run them locally.

- [install Docker](https://docs.docker.com/get-docker/)
- [install docker-compose](https://docs.docker.com/compose/install/)

### Testing

`musicxml` uses [xsdvalidate](https://pkg.go.dev/github.com/terminalstatic/go-xsd-validate) to validate XML against an xsd schema. This library is exposed as an HTTP service in the [xmlvalidator](https://github.com/stringsync/musicxml/tree/master/xmlvalidator) directory. The schema was adapted directly from [w3](https://www.w3.org/2021/06/musicxml40/listings/musicxml.xsd/).

To run the tests, run the following in the project directory:

```
yarn test
```

`musicxml` uses the `jest` testing framework. You can pass any of the `jest` CLI options to the test command. For example, to run the tests in watch mode (recommended), run:

```
yarn test --watchAll
```

A complete list of options are in the [jest docs](https://jestjs.io/docs/cli).
