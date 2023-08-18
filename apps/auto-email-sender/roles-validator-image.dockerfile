FROM node:20 as base

FROM base AS builder

WORKDIR /app
RUN yarn global add turbo
COPY . .

RUN turbo prune --scope=roles-validator --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apt-get update

RUN curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
RUN rm google-chrome-stable_current_amd64.deb 

WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

RUN yarn install
RUN yarn global add turbo

CMD [ "turbo", "run", "roles-validator:start" ] 