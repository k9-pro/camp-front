FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt install nodejs
RUN npm install -g http-server

WORKDIR /camp-front

COPY dist ./dist


RUN npm run build


EXPOSE 8080
CMD [ "http-server", "dist" ]