# ==========================================
# Stage 1: Build & Dependency Stage
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Package files Copy  (Layer caching optimization)
COPY package*.json ./
RUN npm ci --only=production

# ==========================================
# Stage 2: Minimal Production Runtime
# ==========================================
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

# DevSecOps: dont run to root user 
# Create a dedicated non-root user and group
RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

# Stage 1 production dependencies copy
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

# Set File permissions to noroot user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to non-root user
USER appuser

EXPOSE 3000

# Native Docker Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
