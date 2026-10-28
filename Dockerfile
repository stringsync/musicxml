FROM oven/bun:1.4.4

WORKDIR /musicxml

COPY package.json bun.lock ./
COPY packages/musicxml/package.json packages/musicxml/package.json
COPY packages/mxl/package.json packages/mxl/package.json
RUN bun install --frozen-lockfile

COPY packages/mxl packages/mxl
COPY packages/musicxml packages/musicxml
COPY xmlvalidator/schema xmlvalidator/schema
WORKDIR /musicxml/packages/musicxml

CMD ["bun", "test"]
