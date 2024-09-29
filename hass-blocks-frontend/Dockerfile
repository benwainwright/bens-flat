ARG BUILD_TYPE=addon

ARG BUILD_FROM

FROM $BUILD_FROM as build_base
ONBUILD RUN \
  echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories

ONBUILD RUN \
  echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
  
ONBUILD RUN \
  apk update

ONBUILD RUN \
  apk add --no-cache \
    nodejs \
    yarn \
    mongodb \
    mongodb-tools
    
ONBUILD COPY ./package.json /package.json
ONBUILD COPY ./yarn.lock /yarn.lock
ONBUILD RUN yarn install --production --frozen-lockfile
ONBUILD COPY ./src /src
ONBUILD COPY ./run.sh /run.sh
ONBUILD COPY ./tsconfig.json /tsconfig.json
ONBUILD COPY ./eslint.config.js /eslint.config.js
ONBUILD COPY ./next.config.js /next.config.js

FROM build_base as build_addon
ONBUILD COPY ./ingress-entry.ts /ingress-entry.ts

FROM build_base as build_local
ONBUILD COPY ./.env /.env

FROM build_${BUILD_TYPE}

RUN chmod 755 /run.sh

CMD [ "/run.sh" ]
