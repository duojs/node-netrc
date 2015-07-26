
BIN := ./node_modules/.bin
MOCHA := $(BIN)/mocha

node_modules: package.json
	@npm install

test:
	@$(MOCHA)

.PHONY: test
