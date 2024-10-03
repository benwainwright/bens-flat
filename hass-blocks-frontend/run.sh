#!/usr/bin/with-contenv bashio

mkdir -p /data/db

mongod --fork --logpath /var/log/mongodb/mongod.log

if [ "${IN_ADDON:-false}" = "true" ]; then
    yarn get-ingress
    yarn build
fi

NODE_ENV=production yarn start

