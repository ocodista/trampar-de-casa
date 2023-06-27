FROM node:lts-slim

WORKDIR /home
COPY . .
COPY  ./turbo.json /home/apps/web

WORKDIR /home/apps/web

# copy env.example into .env
RUN if [ ! -f .env ]; then cp .env.example .env; fi


RUN yarn install
RUN yarn build
RUN npx prisma migrate && npx prisma generate command

EXPOSE 3000
CMD ["yarn", "dev"]