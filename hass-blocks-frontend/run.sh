#!/usr/bin/with-contenv bashio

mongod --fork --logpath /var/log/mongodb/mongod.log

if [ "${NODE_ENV:-development}" = "production" ]; then
    yarn get-ingress
    yarn build
fi

yarn start

