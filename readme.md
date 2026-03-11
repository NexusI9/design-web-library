# Design Web Library

Design Web Library is an online platform that gathers essential information, documents, and templates for designers.  
It also includes downloadable **website modules** and **3D / shader-based templates** to serve as references for both developers and designers.

---

## Commands

| Command | Description |
|--------|-------------|
| make build-modules | Build the GLSL modules into the `dist` folder |
| make build | Build the client in production mode |
| make | Build the modules, start the PHP server, and watch the client application |

---

# Project Structure

## /client
- The main front-end app folder, contain all the TSX, React-like application side
- On build, the content is served to **/server/public/** which serves as the main distribution folder.

## /server
- Contains the main distribution folder under the name **public**
- Contains the APIs and Routing system as well

## Project Quick Start
The project includes a Makefile.
- The PHP server runs on localhost:8000
- The Client Dev Server runs localhost:9000

---

# Development mode

Use a mix of Webpack Serve and basic PHP server.
The Webpack Server fetch data from the PHP server.
1. Webpack server address: localhost:9000.
2. PHP server address: localhost:8000.

## Flow Overview

```
 
 .---- Client ----.                .---- Server ---.
 | Webpack Server |   <========>   |  PHP -S ...   |
 '----------------'                '---------------'
 ./server/public/                  ./server/public/

```

---

# Production mode

For the production we use an Apache server.

## Apache Configuration

The /etc/apache2/httpd.conf file has been adjusted to:
1. Enable Proxies (for PHP)
```
LoadModule proxy_module libexec/apache2/mod_proxy.so
LoadModule proxy_fcgi_module libexec/apache2/mod_proxy_fcgi.so
```

2. Enable Rewrite (htaccess)
```
LoadModule rewrite_module libexec/apache2/mod_rewrite.so
```

3. Enable Virtual Hosts (located at /etc/apache2/extra/httpd-vhosts.conf)
```
LoadModule vhost_alias_module libexec/apache2/mod_vhost_alias.so
Include /private/etc/apache2/extra/httpd-vhosts.conf
```

## htaccess Creation
The /server/public/.htaccess has been edited as to always redirect to index.html unless the requested file exists.
This ensures that when we try to directly access the website url via the browser it actually redirect to the index.

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite requests for actual files or directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Rewrite everything else to index.html
  RewriteRule . /index.html [L]
</IfModule>
```


## Apache Virtual Host Configuration

### Domain name 
Virtual hosts allow to setup and apache domains name with a directory (ex: my.domain.local => /Users/username/mywebsite/)

### Document Root
We then define our document root a project_path/**server/public**, which is where we also copy the compiled client (using webpack Copy Plugin)

### PHP
As of OSx12, Apache doesn't support internally PHP, as a result PHP need to run on a proxy.
That's why on top of starting the apachectl server, we also need to take care to start the php server via:
> brew services php start

Brew php daemon serves on **127.0.0.1:9000** by default.
Apache then connects to php via *FastCGY proxy* to pass PHP requests and get back the output.

### API
For security sakes, the API related functions (REST api, download modules) are not located in the public folder.
As a result we need to add an exception that disable the initial htaccess override, so when we try to access the 
api link it does not redirect to index.html.


```
<VirtualHost *:80>
    ServerName akacia.weblibrary.local

    # Set public folder as document root
    DocumentRoot "/Users/akacia/Projects/Akacia/WebLibrary/server/public/"

    <Directory "/Users/akacia/Projects/Akacia/WebLibrary/server/public/">
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Redirect PHP requests to proxy server (brew PHP)
    <FilesMatch \.php$>
    		SetHandler "proxy:fcgi://127.0.0.1:9000"
    </FilesMatch>

    # Create exepection for /api/ and /public/modules/ requests
    # Alias /api/ "/Users/akacia/Projects/Akacia/WebLibrary/server/api/"

    <Directory "/Users/akacia/Projects/Akacia/WebLibrary/server/api/">
    	       # Disable htaccess override
    	       AllowOverride None
    	       Require all granted
    </Directory>
	
	<Directory "/Users/akacia/Projects/Akacia/WebLibrary/server/public/modules/">
    	       # Disable htaccess override
    	       AllowOverride None
    	       Require all granted
    </Directory>
</VirtualHost>

```


## Host redirection
The /etc/hosts file has be adjusted so the previously set Virtual host domain redirect to 127.0.0.1.
As a result we can simply enter the my.domain.local in the browser to access our apache website.

```
127.0.0.1 my.domain.local
```

Virtual hosting use the **Host** value of the header request to define which website to serve on the url.
>Ex: http://example1.com/     host: example1.com  ip: 129.340.495.23
>    http://example2.com/     host: example2.com  ip: 129.340.495.23
> Although both links lead toward the same IP their host is different so it will lead to different websites/directory (DNS)


```
 
          
    .-----------------.                   .-------------.               .----------------.
	| my.domain.local | == /etc/hosts ==> |  127.0.0.1  | == apache ==> |  Virtual Host  |
    '-----------------'                   '-------------'               '----------------'
	                                                         


```


## Flow overview

```

  .----------------.
  |   Client App   |
  '----------------'
          ||
      Compile to
          ||
		  \/
  .----------------.            .-------------------.
  |     Apache     |  <======>  |  Brew PHP daemon  |
  '----------------'            '-------------------'
   ./server/public/ (docroot)
   ./server/api/
	


Merge compiled client into ./server/public
```

---

# Additional notes
We also ensure that during production build, webpack doesn't include dev-related functionalities such as DevServer or DevTool.
