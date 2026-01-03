#!/bin/sh
set -eux

: "${BACKEND_SERVICE_URL:=http://localhost:8080}"

cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV__ = {
  BACKEND_SERVICE_URL: "${BACKEND_SERVICE_URL}"
};
EOF

# Generate Nginx config from template
envsubst '${BACKEND_SERVICE_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"