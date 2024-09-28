ARG BUILD_TYPE=addon

ARG BUILD_FROM

FROM $BUILD_FROM as build_base
ONBUILD RUN \
  apk add --no-cache \
    nodejs \
    yarn
ONBUILD COPY ./package.json /package.json
ONBUILD COPY ./yarn.lock /yarn.lock
ONBUILD RUN yarn install --production --frozen-lockfile
ONBUILD COPY ./src /src
ONBUILD COPY ./run.sh /run.sh
ONBUILD COPY ./tsconfig.json /tsconfig.json
ONBUILD COPY ./.eslintrc.json /.eslintrc.json
ONBUILD COPY ./next.config.js /next.config.js

FROM build_base as build_addon
ONBUILD COPY ./ingress-entry.ts /ingress-entry.ts
ONBUILD RUN yarn get-ingress 
ONBUILD RUN yarn build

FROM build_base as build_local
ONBUILD COPY ./.env /.env

FROM build_${BUILD_TYPE}

RUN chmod 755 /run.sh

CMD [ "/run.sh" ]
