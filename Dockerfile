FROM node:16-alpine

# Setting up the work directory
WORKDIR /app

# Copying all the files in our project
COPY . ./

# Installing dependencies
RUN npm install

# Exposing server port
EXPOSE 3000

# Starting our application
CMD [ "npm", "start" ]
