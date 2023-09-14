FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

RUN rm -rf shiggy/*

RUN bun run build

RUN bun run getshiggies

CMD [ "bun", "run", "start" ]