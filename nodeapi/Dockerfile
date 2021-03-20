#pull base image alphine linux
FROM node:14.16.0-alpine3.12

#create working dir
RUN mkdir -p /app/src

#set working dir
WORKDIR /app/src

#copy dependencies to current work dir
COPY package.json .

#install dependencies
RUN npm install 

#copy project files to work dir
COPY . .

EXPOSE 5000

CMD [ "npm" , "start" ]