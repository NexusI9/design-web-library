# Start dev environment
default:
# Build server modules first
	$(MAKE) build-modules
# Start PHP server in background
	php -S localhost:8000 -t server/public &
# Start Webpack dev server (foreground)
	npx webpack serve --config webpack.client.config.js --mode development --progress


# Build the client
build:
	npx webpack --config webpack.client.config.js --mode production

# Compile server modules
build-modules:
	npx webpack --config webpack.server.config.js
