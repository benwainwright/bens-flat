ARG BUILD_TYPE=addon

ARG BUILD_FROM

FROM $BUILD_FROM as build_addon

FROM $BUILD_FROM as build_local
ONBUILD COPY ./.env /.env

FROM build_${BUILD_TYPE}

RUN \
  apk add --no-cache \
    nodejs \
    yarn

COPY ./package.json /package.json
COPY ./yarn.lock /yarn.lock
RUN yarn install --production --frozen-lockfile
COPY ./src /src
COPY ./config.yaml /config.yaml
COPY ./vite.config.ts /vite.config.ts
COPY ./run.sh /run.sh
COPY ./tsconfig.json /tsconfig.json

RUN chmod 755 /run.sh

CMD [ "/run.sh" ]
