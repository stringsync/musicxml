FROM oven/bun:1.4.4

WORKDIR /musicxml

COPY package.json bun.lock ./
COPY packages/musicxml/package.json packages/musicxml/package.json
COPY packages/mxl/package.json packages/mxl/package.json
RUN bun install --frozen-lockfile

COPY packages/musicxml packages/musicxml
WORKDIR /musicxml/packages/musicxml

CMD ["bun", "test"]
