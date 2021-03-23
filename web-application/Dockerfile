FROM node:15.6

WORKDIR /the-web-application

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY src ./src

CMD npm run start