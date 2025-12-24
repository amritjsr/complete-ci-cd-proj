FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# system deps needed for building DB client
RUN apt-get update && \
    apt-get install -y build-essential default-libmysqlclient-dev gettext pkg-config && \
    rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Non-root user
RUN addgroup --system app && adduser --system --ingroup app app \
    && chown -R app:app /app
USER app

EXPOSE 8080

# Entrypoint will run migrations and collectstatic before exec'ing the CMD
# COPY docker-entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# ENTRYPOINT ["/entrypoint.sh"]
CMD ["gunicorn", "emp_mgmt_backend.wsgi:application", "--bind", "0.0.0.0:8080", "--workers", "3"]