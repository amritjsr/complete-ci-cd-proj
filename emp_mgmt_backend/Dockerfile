# FROM python:3.12-slim

# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# WORKDIR /app

# # system deps needed for building DB client
# RUN apt-get update && \
#     apt-get install -y build-essential default-libmysqlclient-dev gettext pkg-config && \
#     rm -rf /var/lib/apt/lists/*

# # Install Python deps
# COPY requirements.txt .
# RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# # Copy project
# COPY . .

# # Non-root user
# RUN addgroup --system app && adduser --system --ingroup app app \
#     && chown -R app:app /app
# USER app

# EXPOSE 8080

# # Entrypoint will run migrations and collectstatic before exec'ing the CMD
# # COPY docker-entrypoint.sh /entrypoint.sh
# # RUN chmod +x /entrypoint.sh

# # ENTRYPOINT ["/entrypoint.sh"]
# CMD ["gunicorn", "emp_mgmt_backend.wsgi:application", "--bind", "0.0.0.0:8080", "--workers", "3"]


# -------- Stage 1: Build dependencies & wheels --------
FROM python:3.12-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# System deps needed only for building wheels
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        default-libmysqlclient-dev \
        pkg-config \
        gettext \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and build wheels for requirements
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt


# -------- Stage 2: Runtime image (small & clean) --------
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Only runtime libs (no compilers!)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Install wheels created in builder stage
COPY --from=builder /wheels /wheels
RUN pip install --no-cache-dir /wheels/*

# Copy app source only (no build tools)
COPY . .

# Non-root user
RUN addgroup --system app && adduser --system --ingroup app app \
    && chown -R app:app /app
USER app

EXPOSE 8080

CMD ["gunicorn", "emp_mgmt_backend.wsgi:application", "--bind", "0.0.0.0:8080", "--workers", "1"]
