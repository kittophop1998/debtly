# Docker Commands for WeGoWhere

## Production Build

### Build and Run with Docker
```bash
# Build the image
docker build -t wegowhere:latest .

# Run the container
docker run -p 3000:3000 wegowhere:latest
```

### Build and Run with Docker Compose
```bash
# Build and run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## Development Build

### Build and Run Development with Docker Compose
```bash
# Build and run development server
docker-compose -f docker-compose.dev.yml up

# Run in background
docker-compose -f docker-compose.dev.yml up -d

# Stop development containers
docker-compose -f docker-compose.dev.yml down
```

## Docker Image Stages

The production Dockerfile uses multi-stage build with 3 stages:

1. **deps**: Install dependencies only
2. **builder**: Build the Next.js application
3. **runner**: Final lightweight image with only necessary files

This approach results in:
- Smaller final image size
- Better security (no build tools in production)
- Faster deployment
- Layer caching for faster rebuilds

## Environment Variables

You can pass environment variables using:
- `.env.local` file (for local development)
- Docker environment variables
- Docker Compose environment section

## Health Check

The production docker-compose includes a health check endpoint. Make sure to implement `/api/health` route in your Next.js app for proper health monitoring.

## Tips

- Use `.dockerignore` to exclude unnecessary files
- The production image uses standalone output for optimal size
- Development image supports hot reloading with volume mounts
- Both images support npm, yarn, or pnpm based on lockfile detection