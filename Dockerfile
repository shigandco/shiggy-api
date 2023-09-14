FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

RUN bun run getshiggies

ENTRYPOINT [ "bun run start" ]