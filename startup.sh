#!/usr/bin/env sh

sed -i "s|AWS_KEY_ID|$AWS_KEY_ID|g" ./const/aws-config.json
sed -i "s|AWS_SECRET_ACCESS_KEY|$AWS_SECRET_ACCESS_KEY|g" ./const/aws-config.json
sed -i "s|AWS_REGION|$AWS_REGION|g" ./const/aws-config.json
node ./bin/www