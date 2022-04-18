FROM php:8.0-fpm

# COPY php.ini
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

RUN apt-get update && \
    apt-get -y install \
    git \
    zip \
    unzip \
    vim \
    && docker-php-ext-install pdo_mysql bcmath

# Composerのインストール & パス通す
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# nodeインストール(aptだとNodejsは古いため、パッケージマネージャの n を使用してインストール)
RUN apt-get install -y npm \
    && npm install n -g \
    && n stable

WORKDIR /var/www