FROM node:20-alpine as base 

RUN npm install -g pnpm 

WORKDIR /app

FROM base as build

WORKDIR /app

COPY . .
RUN pnpm install
RUN pnpm build

FROM build as execute

WORKDIR /app

COPY deployment/main/run.sh .

RUN chmod +x /app/run.sh

ENTRYPOINT [ "/bin/sh", "/app/run.sh" ]

EXPOSE 3000 80
