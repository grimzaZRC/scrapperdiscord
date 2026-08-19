# scrapperdiscord

An Alloy-ready workspace for developing Discord data collection tools. The current application is a dependency-free Node.js landing page with a live health check.

## Run with Docker

```sh
docker compose -f docker-compose.alloy.yaml up -d
```

The application listens on port `3000`. Alloy proxies the session preview from `http://localhost:8080`.

Check the service directly with:

```sh
curl http://localhost:3000/health
```
