FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM alpine:latest
WORKDIR /app
RUN mkdir -p dist
COPY --from=builder /app/dist ./dist

VOLUME ["/app/dist"]

CMD ["sh", "-c", "echo '=== Frontend Builder Started ==='; ls -la /app/dist; echo '=== Maintaining volume ==='; while true; do sleep 3600; done"]