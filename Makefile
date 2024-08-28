BRYTHON_REPO = https://raw.githubusercontent.com/brython-dev/brython
BRYTHON_URL = $(BRYTHON_REPO)/master/www/src
ADIA_VER = 4.1
ADIA_URL = https://pylover.github.io/adia/jsdist

# Python
VENV_NAME ?= adia-live
PREFIX ?= $(HOME)/.virtualenvs/$(VENV_NAME)
PIP = $(PREFIX)/bin/pip


all: build

ifeq ("", "$(filter venv fresh, $(MAKECMDGOALS))")
  ifeq ("", "$(wildcard ${PREFIX}/bin)")
    $(error No virtual environemnt exists at ${PREFIX}, please create one  \
		with `make venv`)
  endif
endif


.PHONY: venv
venv:
ifeq ($(shell echo $(PREFIX) | cut -d'/' -f2), usr)
	@echo "Cannot create venv on $(PREFIX)"
else
	python3 -m venv $(PREFIX)
endif


.PHONY: venv-delete
venv-delete: clean
ifeq ($(shell echo $(PREFIX) | cut -d'/' -f2), usr)
	@echo "Cannot delete venv: $(PREFIX)"
else
	-rm -rf $(PREFIX)
endif


.PHONY: fresh
fresh: clean venv-delete venv


.PHONY: build
build:
	npm run build


.PHONY: env
env: adia public/brython.js public/brython_stdlib.js
	$(PIP) install 'yhttp >= 5.3, < 6'
	npm install


.PHONY: lint
lint: 
	npm run lint


.PHONY: serve
serve: 
	npm run dev


public/brython.js:
	curl "$(BRYTHON_URL)/brython.js" > $@


public/brython_stdlib.js:
	curl "$(BRYTHON_URL)/brython_stdlib.js" > $@


.PHONY: adia
adia:
	- mkdir -p  $(ADIA_DIR)
	curl "$(ADIA_URL)/adia-$(ADIA_VER).tar.gz" | tar -zxvC public
	rm public/adia.js
	rm public/adia_worker.py
	rm public/adia.bundle.js
	
clean::
	- rm public/brython*.js
	- rm public/adia*.js
	- rm public/adia*.py
	- rm -rf public/adia
