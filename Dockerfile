FROM node:lts-slim as builder

COPY apps/ ./apps/
WORKDIR /apps

COPY package.json yarn.lock turbo.json ./
#COPY turbo.json ./apps
RUN yarn install
RUN yarn build

EXPOSE 3000
CMD ["yarn", "dev"]