FROM 250075647450.dkr.ecr.ap-northeast-2.amazonaws.com/groupware-frontend:base as base 
WORKDIR /app

FROM base as build
COPY . .
RUN pnpm install
RUN pnpm build

FROM base as execute

COPY --from=build /app /app
COPY deployment/main/run.sh /app/

RUN chmod +x /app/run.sh

ENTRYPOINT [ "sh", "/app/run.sh" ]

EXPOSE 3000 80
