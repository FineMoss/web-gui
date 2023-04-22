FROM node:18

# create app directory
WORKDIR /opt/web-gui

# install dependencies
COPY package*.json ./
RUN npm install

# copy source code
COPY . .

# environment variables
ENV PORT=8008

# expose the correct port
EXPOSE ${PORT}

# run the node server 
CMD node server/app.js