FROM node:8

# Create app directory
# RUN mkdir -p /src/app

# Tell your container where your app's source code will live
WORKDIR /urs/src/app

# Install app dependencies
COPY package.json .
COPY package-lock.json .

# What source code do you what to copy, and where to put it?
# COPY . /src/app

# Install dependencies for app
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
ENV PORT 8080
CMD [ "npm", "start" ]
