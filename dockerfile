FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -y apache2

# Enable site-specific configurations
RUN a2enmod headers
RUN a2enmod rewrite
RUN a2enmod include
RUN a2dissite 000-default.conf

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_RUN_DIR /var/www/html

COPY apache.conf /etc/apache2/sites-available/apache.conf
RUN ln -s /etc/apache2/sites-available/apache.conf /etc/apache2/sites-enabled/apache.conf

COPY index.html /var/www/html/index.html
COPY login.html /var/www/html/login.html

EXPOSE 80

ENTRYPOINT ["/usr/sbin/apache2"]
CMD ["-D", "FOREGROUND"]
