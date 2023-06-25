FROM node:lts-slim

WORKDIR /home
COPY . .
COPY  ./turbo.json /home/apps/web

WORKDIR /home/apps/web

RUN yarn install
RUN yarn build

EXPOSE 3000
CMD ["yarn", "dev"]