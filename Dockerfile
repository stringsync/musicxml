FROM node:16.0.0

WORKDIR /musicxml

# install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn

# copy the src files (which include the tests)
COPY babel.config.js .
COPY src src

CMD [ "yarn", "test" ]
