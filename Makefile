# Makefile

# Default target
start:
	$(MAKE) webpack-server
	$(MAKE) php-server & \
	$(MAKE) webpack-client


# Run the PHP server
php-server:
	php -q -S localhost:8000 -t ./server

# Run the Webpack dev server
webpack-client:
	npx webpack serve --config webpack.client.config.js


# Compile the GL modules to the server
webpack-server:
	npx webpack --config webpack.server.config.js
