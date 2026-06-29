#!/bin/sh
set -e

echo "🚀 Starting Chaos UI Production Server..."

# Function to start Next.js docs
start_nextjs() {
  echo "📖 Starting Next.js docs on port 3000..."
  cd /app
  exec node server.js
}

# Function to start Storybook static server
start_storybook() {
  echo "📚 Starting Storybook on port 6006..."
  serve -s /app/storybook-static -l 6006 &
}

# Trap signals for graceful shutdown
trap 'echo "Shutting down..."; kill $(jobs -p); exit 0' SIGTERM SIGINT

# Start Storybook in background
start_storybook

# Wait a moment for storybook to start
sleep 2

# Start Next.js (this keeps the container running)
start_nextjs
