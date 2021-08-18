PIP = $(shell which pip3)
BRYTHON_REPO = https://raw.githubusercontent.com/brython-dev/brython
BRYTHON_URL = $(BRYTHON_REPO)/master/www/src
ADIA_VER = 2.1
ADIA_URL = https://pylover.github.io/adia/jsdist

all: build

.PHONY: build
build:
	npm run build

.PHONY: env
env: adia public/brython.js
	$(PIP) install 'yhttp >= 2.13.2'
	npm install

.PHONY: serve
serve: 
	npm run dev

public/brython.js:
	curl "$(BRYTHON_URL)/brython.js" > $@

.PHONY: adia
adia:
	- mkdir -p  $(ADIA_DIR)
	curl "$(ADIA_URL)/adia-$(ADIA_VER).tar.gz" | tar -zxvC public
	
clean::
	- rm public/brython.js
	- rm public/adia*.js
	- rm public/adia*.py
	- rm -rf public/adia


