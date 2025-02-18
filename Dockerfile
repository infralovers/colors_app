FROM docker.io/node:gallium-slim

WORKDIR /app
LABEL MAINTAINER=mbuchleitner@infralovers.com
COPY package* ./
RUN npm i 

EXPOSE 8080

COPY colors.js ./
COPY index.html ./

ENTRYPOINT [ "/usr/local/bin/node", "/app/colors.js" ]
