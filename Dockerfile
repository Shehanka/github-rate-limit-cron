FROM node:14-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile --non-interactive --silent

COPY . .

RUN rm -Rf yarn.lock

EXPOSE 4000

RUN yarn run build

CMD [ "node", "build/main" ]