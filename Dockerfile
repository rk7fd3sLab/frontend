FROM public.ecr.aws/docker/library/node:24 AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM public.ecr.aws/docker/library/node:24 AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM public.ecr.aws/docker/library/node:24 AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
ARG APP_VERSION=unknown
ENV APP_VERSION=${APP_VERSION}

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

EXPOSE 5000
USER node
CMD ["node", "server.js"]
