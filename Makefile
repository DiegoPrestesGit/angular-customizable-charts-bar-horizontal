build:
	yarn && yarn build

start: build
	yarn start

full-forever: build
	forever start -c "yarn start" .
