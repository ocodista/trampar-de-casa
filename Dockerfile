FROM node:18-alpine AS base
 
FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune web --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

# Install build-essential for native addons
RUN apk update && apk add --no-cache python3 make g++ && ln -sf /usr/bin/python3 /usr/bin/python
RUN npm install -g node-gyp sharp

RUN yarn install
 
# Build the project
COPY --from=builder /app/out/full/ .

# Declare arguments
ARG DATABASE_URL
ARG SUPABASE_URL
ARG SUPABASE_SERVICE_ROLE
ARG EMAIL_KEY
ARG EMAIL_PASS
ARG CRYPT_SECRET
ARG RESEND_KEY
ARG RESEND_WEBHOOK_SECRET
ARG OWNER_EMAIL
ARG NEXT_PUBLIC_MIXPANEL_KEY
ARG CRON_SECRET
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD

# Convert build-time variables to environment variables
ENV DATABASE_URL=$DATABASE_URL \
    SUPABASE_URL=$SUPABASE_URL \
    SUPABASE_SERVICE_ROLE=$SUPABASE_SERVICE_ROLE \
    EMAIL_KEY=$EMAIL_KEY \
    EMAIL_PASS=$EMAIL_PASS \
    CRYPT_SECRET=$CRYPT_SECRET \
    RESEND_KEY=$RESEND_KEY \
    RESEND_WEBHOOK_SECRET=$RESEND_WEBHOOK_SECRET \
    OWNER_EMAIL=$OWNER_EMAIL \
    NEXT_PUBLIC_MIXPANEL_KEY=$NEXT_PUBLIC_MIXPANEL_KEY \
    CRON_SECRET=$CRON_SECRET \
    NEXT_SHARP_PATH=/app/node_modules/sharp \
    POSTGRES_HOST=$POSTGRES_HOST \
    POSTGRES_PORT=$POSTGRES_PORT \
    POSTGRES_USER=$POSTGRES_USER \
    POSTGRES_PASSWORD=$POSTGRES_PASSWORD

# Add environment variables to the build command
RUN NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PHASE=build \
    yarn turbo run build --filter=web
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
 
CMD node apps/web/server.js
