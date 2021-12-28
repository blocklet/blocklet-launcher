TOP_DIR=.
README=$(TOP_DIR)/README.md

VERSION=$(strip $(shell cat version))

build: clean init
	@echo "Building static pages..."
	@yarn build

all: build

init:
	@echo "Install npm dependencies required for this repo..."
	@yarn global add @blocklet/cli
	@yarn

github-action-init:
	@echo "Install npm dependencies required for this repo..."
	@sudo npm install -g @blocklet/cli
	@yarn

clean:
	@echo "All cache and build are cleaned."
	@rm -rf .blocklet

deploy:
	@echo "Deploy software..."

run:
	@echo "Run software..."
	@yarn start

serve: build
	@echo "Serve software..."
	@yarn serve

include .makefiles/*.mk

.PHONY: build init travis-init install dep pre-build post-build all test doc precommit travis clean watch run bump-version create-pr
