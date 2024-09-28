ARG BUILD_FROM
FROM $BUILD_FROM

RUN \
  apk add --no-cache \
    nodejs \
    yarn

COPY ./package.json /package.json
COPY ./yarn.lock /yarn.lock
RUN yarn install --production --frozen-lockfile
COPY ./next.config.mjs /next.config.mjs
COPY ./src /src
COPY ./tsconfig.json /tsconfig.json
COPY ./.eslintrc.json /.eslintrc.json
RUN yarn build
COPY ./.next /.next

RUN chmod 755 /run.sh

CMD [ "/run.sh" ]
