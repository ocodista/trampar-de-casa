
# This script runs on specif machine for send emails.
# The crontab should execute this script at 01:55 PM, only on Wednesday(UTC+0)
# 55 13 * * 3 /home/ubuntu/trampar-de-casa/scripts/auto-email-sender.sh
#! /bin/bash
set -e
# Enter on project folder
cd /home/ubuntu/trampar-de-casa

# Run email-sender
yarn turbo run start --filter=email-sender

# Down services
docker compose --file auto-email-sender-compose.yml down

# Clear volumes
docker volume prune -f