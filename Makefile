PIP = $(shell which pip3)

.PHONY: env
env:
	$(PIP) install 'yhttp >= 2.13.2'
	npm install


.PHONY: serve
serve:
	npm run dev
