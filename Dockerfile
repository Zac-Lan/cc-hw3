FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
<<<<<<< HEAD
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
=======
COPY package-lock.json /usr/src/app/
RUN yarn install && yarn cache clean
>>>>>>> 679f6f1cf8e9e8be6e733ab38cafdfb0aa82b0a3

# Bundle app source
COPY . .

EXPOSE 8080
<<<<<<< HEAD
CMD [ "node", "app.js" ]
=======
CMD [ "yarn", "start" ]
>>>>>>> 679f6f1cf8e9e8be6e733ab38cafdfb0aa82b0a3
