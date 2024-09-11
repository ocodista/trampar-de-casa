FROM oven/bun:1.1.27

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .
EXPOSE 5500

CMD ["bun", "run", "index.ts"]
