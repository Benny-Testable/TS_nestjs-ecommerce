.PHONY: test test-ts test-js test-python test-go

test: test-ts test-js test-python test-go

test-ts:
	npm test

test-js:
	npm run test:js

test-python:
	cd services/pricing-engine && python3 -m pytest

test-go:
	go test -C services/inventory ./...
