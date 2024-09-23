# Base Stage
FROM node:18-alpine AS base

WORKDIR /app

ARG BSKY_EMAIL
ARG BSKY_PASSWORD
ARG SUPABASE_URL
ARG SUPABASE_SERVICE_ROLE

ENV BSKY_EMAIL=$BSKY_EMAIL \
    BSKY_PASSWORD=$BSKY_PASSWORD \
    SUPABASE_URL=$SUPABASE_URL \
    SUPABASE_SERVICE_ROLE=$SUPABASE_SERVICE_ROLE

# Dependencies Stage
FROM base AS dependencies

WORKDIR /app

# Copie apenas os arquivos necessários para instalar dependências
COPY apps/bluesky-job-poster ./apps/bluesky-job-poster
COPY packages ./packages
COPY package*.json turbo.json yarn.lock ./

# Instale dependências
RUN yarn install

# Final Stage (Runner)
FROM base AS runner

WORKDIR /app

# Copie apenas o necessário da etapa de dependências
COPY --from=dependencies /app /app

# Instale ts-node globalmente
RUN npm install -g ts-node

WORKDIR /app/apps/bluesky-job-poster

CMD ["ts-node", "src/index.ts"]