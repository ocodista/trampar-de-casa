FROM node:20.5.1

# Install build-essential for native addons
RUN apt-get update && apt-get install -y python3 make g++ && ln -s /usr/bin/python3 /usr/bin/python

COPY . .

# Install node-gyp globally to avoid ENOENT error
RUN npm install -g node-gyp

RUN yarn install
RUN yarn build:dev
CMD ["yarn", "start:dev"]

