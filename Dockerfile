FROM alpine:latest
MAINTAINER Baptiste Assmann <bedis9@gmail.com>

RUN apk add -U nodejs

ADD colors.js /

ENTRYPOINT [ "/usr/bin/node", "/colors.js" ]
