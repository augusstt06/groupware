FROM node:20-alpine as base 

RUN npm install -g pnpm 

WORKDIR /app

FROM base as build

COPY . .
RUN pnpm install
RUN pnpm build

FROM base as execute

COPY deployment/main/run.sh /app/

RUN chmod +x /app/run.sh

ENTRYPOINT [ "/bin/sh", "/app/run.sh" ]

EXPOSE 3000 80
