PIP = $(shell which pip3)
BRYTHON_REPO = https://raw.githubusercontent.com/brython-dev/brython
BRYTHON_URL = $(BRYTHON_REPO)/master/www/src
ADIA_URL = https://pylover.github.io/adia/jsdist

all: build

.PHONY: build
build: adia
	npm run build

.PHONY: env
env:
	$(PIP) install 'yhttp >= 2.13.2'
	npm install

.PHONY: serve
serve:
	npm run dev

public/brython.js:
	curl "$(BRYTHON_URL)/brython.js" > $@

public/adia.lib.js:
	curl "$(ADIA_URL)/adia.lib.js" > $@

public/adia.js:
	curl "$(ADIA_URL)/adia.js" > $@

.PHONY: adia
adia: public/brython.js public/adia.lib.js public/adia.js

