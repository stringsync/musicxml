FROM node:16.0.0

WORKDIR /musicxml

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY babel.config.js .
COPY src src
