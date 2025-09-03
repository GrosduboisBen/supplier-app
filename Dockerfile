FROM node:24-alpine AS build
WORKDIR /usr/src/app/
COPY angular.json material.import.ts package-lock.json package.json tsconfig.app.json tsconfig.json ./
COPY src ./src
RUN npm ci
RUN npm run build -- --configuration production

FROM nginx:1.29.1-alpine-slim AS serve
WORKDIR /usr/share/nginx/html
COPY --from=build usr/src/app/dist/supplier-app/browser .
COPY nginx.conf /etc/nginx/conf.d/default.conf
