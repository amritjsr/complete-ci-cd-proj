#!/bin/sh
set -eux

: "${REACT_APP_API_BASE_URL:=http://localhost:8080/api}"

cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV__ = {
  REACT_APP_API_BASE_URL: "${REACT_APP_API_BASE_URL}"
};
EOF

exec "$@"