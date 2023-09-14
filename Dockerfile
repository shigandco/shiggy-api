FROM oven/bun:latest

RUN apt-get update && apt-get install -y \
  curl

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

CMD [ "bun", "run", "start" ]