#FROM node:latest AS build
#
#WORKDIR /build
#
#EXPOSE 8080
#
##COPY ["package.json", "package-lock.json*", "./"]
#COPY package.json package.json
#COPY package-lock.json package-lock.json
#
##RUN npm install
#RUN npm ci
#
#COPY public/ public
#COPY src/ src
#RUN npm run build
#
##FROM httpd:alpine
#
##COPY --from=build /build/build/ .
#
#FROM nginx:alpine
#COPY --from=build /build/build/ /usr/share/nginx/html
#WORKDIR /var/www/html
#
#
#
##CMD ["node", "server.js"]

FROM node:latest AS build
WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY public/ public
COPY src/ src
RUN npm run build

FROM httpd:latest
WORKDIR /var/www/html
#COPY --from=build /build/build/ .
COPY --from=build /build/build/ /usr/local/apache2/htdocs/