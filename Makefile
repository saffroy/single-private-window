SRC := manifest.json background.js
ZIPPED := single.zip

all: $(ZIPPED)

$(ZIPPED): $(SRC)
	zip $(ZIPPED) $(SRC)

build:
	web-ext build -i '*~' -o

sign:
	web-ext sign -i '*~' -i Makefile -i '*.html' -i '*.zip'
