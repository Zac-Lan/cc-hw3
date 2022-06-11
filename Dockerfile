# Base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package-lock.json /usr/src/app/
RUN yarn install && yarn cache clean

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "yarn", "start" ]
