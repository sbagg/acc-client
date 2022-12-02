FROM node:14.17.4

COPY ./wait-for.sh .
RUN apt-get update && apt-get install -y netcat

WORKDIR /acc-client
COPY package.json package.json

RUN npm install -g

COPY . .


EXPOSE 4000
CMD ["npm", "start"]









