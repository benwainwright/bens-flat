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
COPY ./run.sh /run.sh
COPY ./tsconfig.json /tsconfig.json
COPY ./.eslintrc.json /.eslintrc.json
COPY ./next.config.js /next.config.js
RUN yarn build

RUN chmod 755 /run.sh

CMD [ "/run.sh" ]
