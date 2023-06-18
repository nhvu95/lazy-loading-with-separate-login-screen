# Use the official NGINX image as the base image
FROM nginx:latest

# Copy the NGINX configuration file to the container
RUN mkdir /etc/nginx/sites-enabled
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the HTML files to the container
COPY login.html /usr/share/nginx/html/login.html
COPY index.html /usr/share/nginx/html/index.html
