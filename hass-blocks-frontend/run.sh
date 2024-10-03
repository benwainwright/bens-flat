#!/usr/bin/with-contenv bashio

mkdir -p /data/db

mongod --fork --logpath /var/log/mongodb/mongod.log

if [ "${IN_ADDON:-false}" = "true" ]; then
    yarn get-ingress
    yarn build
fi

NEXT_PUBLIC_IS_PROD_RUNTIME=true yarn start

