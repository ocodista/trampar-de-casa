FROM node:20-alpine as base

FROM base AS builder
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN yarn global add turbo
COPY . .

RUN turbo prune --scope=email-composer --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

RUN yarn install
RUN yarn global add turbo

CMD [ "turbo", "run", "email-composer:start" ] 