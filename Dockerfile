FROM oven/bun:1.4.4

WORKDIR /musicxml

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY bunfig.toml tsconfig.json ./
COPY src src

CMD ["bun", "test"]
