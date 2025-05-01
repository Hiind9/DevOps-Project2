FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

# Bundle app source - Copy all the code from host machine to docker image
COPY . .

RUN npm run build

#  Expose the port 3000 to enable communication inside the container
EXPOSE 3000

# Start the application with npm start command
CMD [ "npm", "start" ]