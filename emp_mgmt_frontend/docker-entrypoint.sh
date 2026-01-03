#!/bin/sh
set -eux

: "${BACKEND_API_BASE_URI:=/api}"
: "${BACKEND_SERVICE_URL:=http://emp-mgmt-backend-service:8080}"

export BACKEND_API_BASE_URI
export BACKEND_SERVICE_URL

# Update env.js for React App
cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV__ = {
  BACKEND_API_BASE_URI: "${BACKEND_API_BASE_URI}"
};
EOF

# Generate Nginx config from template
# We only want to substitute BACKEND_SERVICE_URL
envsubst '${BACKEND_SERVICE_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"