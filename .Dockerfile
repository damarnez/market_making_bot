FROM node:11-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY src ./src

RUN npm install --production
RUN npm prune

CMD [ "npm", "start" ]