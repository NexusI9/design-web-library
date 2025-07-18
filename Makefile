# Makefile



# Build the client into the server/public dir
build:
	npx webpack --config webpack.client.config.js --mode production


# start the PHP and Webpack server after compiling the modules
start:
	$(MAKE) build-modules
	$(MAKE) serve-server & \
	$(MAKE) serve-client


# Run the PHP server
serve-server:
	brew services start php

# Run the Webpack dev server
serve-client:
	npx webpack serve --config webpack.client.config.js --mode development

php-server:
	brew services start php

# Compile the GL modules to the server
build-modules:
	npx webpack --config webpack.server.config.js
