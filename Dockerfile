# base image
FROM node:12.2.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9 http-server

# add app
COPY . /app

# build app
RUN ng build --prod

# serve the app
CMD http-server ./dist -a 0.0.0.0 -p 8080 -d False

# expose the port
EXPOSE 8080