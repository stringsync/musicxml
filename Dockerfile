FROM node:18.0.0

WORKDIR /musicxml

# install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn

# copy the rest of the files for tests
COPY babel.config.json .
COPY tsconfig.json .
COPY src src

CMD [ "yarn", "jest" ]
