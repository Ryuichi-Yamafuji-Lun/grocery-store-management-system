import os

# Use 2 workers per CPU core for optimal performance
workers = 2 * (os.cpu_count() or 1)

# Bind to all available network interfaces on port 8000
bind = "0.0.0.0:8000"

# Set the timeout to 30 seconds
timeout = 30

# Log requests to stdout
accesslog = "-"

# Log errors to stdout
errorlog = "-"

# Set log level (debug, info, warning, error, critical)
loglevel = "info"

# Use the sync worker class
worker_class = "sync"

# Set the graceful shutdown timeout
graceful_timeout = 10

# Set the keep-alive timeout
keepalive = 5

# Set the maximum number of requests per worker
max_requests = 1000

# Limit each worker to 100MB of memory
worker_memory_limit = '100M'