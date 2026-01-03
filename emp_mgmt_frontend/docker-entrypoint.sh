#!/bin/sh
set -eux

: "${BACKEND_API_BASE_URL:=http://localhost:8080/api}"

cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV__ = {
  BACKEND_API_BASE_URL: "${BACKEND_API_BASE_URL}"
};
EOF

exec "$@"