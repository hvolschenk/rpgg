FROM nginx:alpine

ENV NGINX_LOCATION_CONFIG=/etc/nginx/conf.d

COPY .nginx/default.conf $NGINX_LOCATION_CONFIG
