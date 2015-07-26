
BIN := ./node_modules/.bin
MOCHA := $(BIN)/mocha
ESLINT := $(BIN)/eslint

node_modules: package.json
	@npm install

lint:
	@$(ESLINT) .

test:
	@$(MOCHA)

.PHONY: test
