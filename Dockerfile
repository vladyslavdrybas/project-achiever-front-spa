ARG NGINX_VERSION=1.22-alpine

### ### ###
FROM nginx:${NGINX_VERSION} AS nginx_server

WORKDIR /app

CMD ["nginx"]

EXPOSE 80


