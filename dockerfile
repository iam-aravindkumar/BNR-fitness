FROM ubuntu:22.04
RUN apt update && apt install apache2 -y
COPY . /var/www/html/
EXPOSE 80
CMD ["apachectl", "-D", "FOREGROUND"]
