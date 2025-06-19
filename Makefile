# Makefile

# Default target
start:
	$(MAKE) php-server & \
	$(MAKE) webpack-server

# Run the PHP server
php-server:
	php -q -S localhost:8000 -t ./server/public

# Run the Webpack dev server
webpack-server:
	cd ./client && npx webpack serve
