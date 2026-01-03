#!/bin/sh
set -eux

: "${BACKEND_API_BASE_URL:=http://localhost:8080/api}"

cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV__ = {
  BACKEND_API_BASE_URL: "${BACKEND_API_BASE_URL}"
};
EOF

# Generate Nginx config from template
envsubst '${BACKEND_API_BASE_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

echo "/etc/nginx/conf.d/default.conf.template"
cat /etc/nginx/conf.d/default.conf.template

echo "/etc/nginx/conf.d/default.conf"
cat /etc/nginx/conf.d/default.conf

exec "$@"