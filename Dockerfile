FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ARG ANTHROPIC_API_KEY
ARG BUILTWITH_API_KEY
ARG PAGESPEED_API_KEY
ARG MAX_PAGES_TO_CRAWL=20
ARG TIMEOUT_SECONDS=60

ENV ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY
ENV BUILTWITH_API_KEY=$BUILTWITH_API_KEY
ENV PAGESPEED_API_KEY=$PAGESPEED_API_KEY
ENV MAX_PAGES_TO_CRAWL=$MAX_PAGES_TO_CRAWL
ENV TIMEOUT_SECONDS=$TIMEOUT_SECONDS

# Build the Next.js application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user to run the app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy the build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 