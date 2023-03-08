FROM node:18-alpine3.17 AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY ./package*.json ./
COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN npm ci

FROM deps AS dev-deps
RUN apk add --no-cache postgresql-client
RUN chown -R node node_modules

FROM dev-deps AS development
CMD ["npm", "run", "dev"]

FROM dev-deps AS prisma-migrate-dev
CMD ["npm", "run", "prisma", "migrate", "dev"]

FROM dev-deps AS prisma-studio
CMD ["npm", "run", "prisma", "studio"]

FROM node:18-alpine3.17 AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
ENV SKIP_ENV_VALIDATION 1
COPY --from=deps /app/node_modules ./node_modules
COPY ./ ./
RUN npm run build

FROM node:18-alpine3.17 AS production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=build /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
USER node
CMD ["node", "server.js"]

FROM node:18-alpine3.17 AS prisma-migrate-deploy
COPY --from=deps /app/package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY ./prisma/schema.prisma ./prisma/schema.prisma
COPY ./prisma/migrations ./prisma/migrations
CMD ["npm", "run", "prisma", "migrate", "deploy"]
