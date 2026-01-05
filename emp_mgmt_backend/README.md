# Employee Management Backend Service

This directory contains the Backend API service for the Employee Management system. It is a high-performance RESTful API built with **Django REST Framework**.

## 🛠 Tech Stack
*   **Language**: Python 3.12+
*   **Framework**: Django 5.2.7
*   **API Toolkit**: Django REST Framework (DRF)
*   **Server**: Gunicorn (WSGI HTTP Server)
*   **Database**: MySQL (accessed via `mysqlclient`)

## 💾 App Structure
The core application logic resides in the `employees` app.

### Data Model (`Employee`)
| Field Name | Type | Description |
|:---|:---|:---|
| `user_name` | String (16) | **Primary Key**. Unique ID for the employee. |
| `name` | String (100) | Full name of the employee. |
| `email` | Email | Contact email. |
| `phone` | String (15) | Contact number. |
| `role` | String (100) | Job title/Role. |
| `department` | String (100) | Department name. |
| `salary` | Decimal | Monthly/Yearly salary. |
| `created_at` | DateTime | Auto-generated timestamp. |

## 🔌 API Endpoints
Base URL: `/api/`

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/health/` | Health check endpoint. Returns 200 OK if service is up. |
| `GET` | `/employees/` | List all employees. |
| `POST` | `/employees/` | Create a new employee. |
| `GET` | `/employees/search/?query=<str>` | Search employees by name or department. |
| `PUT/PATCH` | `/employees/<user_name>/update/` | Update an existing employee. |

## ⚙️ Configuration
The application is configured via **Environment Variables** (See `settings.py` for details).

| Variable | Default | Description |
|:---|:---|:---|
| `DB_HOST` | `localhost` | MySQL Hostname or IP. |
| `DB_NAME` | `employee_db` | Database Name. |
| `DB_USER` | `emp_admin` | Database User. |
| `DB_PASSWORD` | - | **Base64 Encoded** Password (decoded at runtime). |
| `LOG_LEVEL` | `INFO` | Logging verbosity. |

## 🚀 Local Development
1.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
2.  **Run Migrations**:
    ```bash
    python manage.py migrate
    ```
3.  **Start Server**:
    ```bash
    python manage.py runserver 0.0.0.0:8080
    ```
