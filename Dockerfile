FROM node:21.7.3-alpine

RUN apk add --no-cache curl
RUN npm i -g pnpm@9.0.1

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]
