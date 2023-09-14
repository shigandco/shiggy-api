FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb scripts ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

ENTRYPOINT [ "bun run start" ]