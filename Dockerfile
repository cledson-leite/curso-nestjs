FROM node:18-alpine

WORKDIR /usr/src/api

COPY . .
COPY ./.env ./.env

#para rodar a migrations
RUN apt update -y && apt install netcat -y
RUN chmod +x ./wait-for.sh ./startup.sh
RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npm run build
# porta ser exposta
# 8080 sera a api gateway e os serviço em sequencia 8081, 8082, etc...
# no caso do front deve setar a applicação para expor a porta 80
EXPOSE 8080

CMD [ "npm", "run", "prod" ]