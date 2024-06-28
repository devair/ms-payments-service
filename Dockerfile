FROM node

ENV APP_PORT=3333
ENV DB_DATABASE=pagamentos
ENV DB_USER=docker
ENV DB_PASS=docker
ENV DB_HOST=mongo
ENV DB_PORT=27017

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3333

CMD [ "npm", "start" ]



