# This script runs on specif machine for create emails to send.
# The crontab should execute this script at 01:00 PM, only on Wednesday(UTC+0)
# 0 13 * * 3 /home/ubuntu/trampar-de-casa/scripts/auto-email-sender-setup.sh
#! /bin/bash
set -e
# Enter on project folder
cd /home/ubuntu/trampar-de-casa

# Initiate container
docker compose --file auto-email-sender-compose.yml up rabbitmq -d
docker compose --file auto-email-sender-compose.yml up mongo -d
sleep 60

# Run subs-to-queue
yarn turbo run start --filter=subs-to-queue

# Run roles-renderer
yarn turbo run start --filter=roles-renderer

# Run roles-assigner in parallel
yarn turbo run start --filter=roles-assigner & yarn turbo run start --filter=roles-assigner & yarn turbo run start --filter=roles-assigner & yarn turbo run start --filter=roles-assigner

# Run email-pre-renderer
yarn turbo run start --filter=email-pre-renderer & yarn turbo run start --filter=email-pre-renderer & yarn turbo run start --filter=email-pre-renderer & yarn turbo run start --filter=email-pre-renderer

# Run email-composer
yarn turbo run start --filter=email-composer & yarn turbo run start --filter=email-composer & yarn turbo run start --filter=email-composer & yarn turbo run start --filter=email-composer
