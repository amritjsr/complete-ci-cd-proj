# Employee Management Application (CI/CD Project)

This project is a full-stack Employee Management System designed to demonstrate a complete CI/CD pipeline and cloud-native observability stack.

## � Cluster Setup & Topology
This application is designed to run on a **Multi-Node Kubernetes Cluster**.

*   **Control Plane (Master)**: Manages the cluster state.
*   **Worker Nodes (k8s-w1 to k8s-w4)**: Run the application workloads.
    *   **Operating System**: Linux (Ubuntu 24.04 recommended)
    *   **Container Runtime**: Docker / Containerd
    *   **Networking**: Calico / Flannel CNI
    *   **Load Balancer**: MetalLB (Layer 2 Mode)

## �🏗 Logical Architecture
*   **Frontend**: React (served via Nginx)
*   **Backend**: Django REST Framework (Python)
*   **Database**: MySQL (External or Kubernetes-hosted)
*   **Observability**: Loki (Logs), Promtail (Log Shipping), Grafana (Visualization)
*   **Orchestration**: Kubernetes (K8s)

## 🚀 Prerequisites
*   Docker
*   Kubernetes Cluster (Minikube, Kind, or Bare-metal)
*   `kubectl` CLI

---

## 🛠 Kubernetes Deployment Guide

All Kubernetes manifests are located in the `kube_cluster_configs/` directory.

### 1. Setup Secrets & Configuration
**Crucial Step**: You must configure your Database connection details before deploying.

**A. Edit `kube_cluster_configs/config-maps.yaml`**:
Update the `DB_HOST` to point to your MySQL server IP.
```yaml
data:
  DB_HOST: "192.168.1.100" # <--- Change this to your MySQL IP
  DB_NAME: "employee_db"   # Your Database Name
  DB_USER: "emp_admin"     # Your Database User
```

**B. Edit `kube_cluster_configs/secrets.yaml`**:
You must provide your database password in **Base64 Encoded** format.
1.  Generate the encoded password:
    ```bash
    echo -n 'your-real-password' | base64
    ```
2.  Update the file:
    ```yaml
    data:
      DB_PASSWORD_ENCRYPTED: "cjNMs..." # <--- Paste the Output here
    ```

**C. Apply the Configs**:
```bash
kubectl apply -f kube_cluster_configs/secrets.yaml
kubectl apply -f kube_cluster_configs/config-maps.yaml
```

### 2. Setup Storage & Logging Stack (The "OLG" Stack)
This project uses **Loki** for persistent log aggregation.
*   **Storage**: A specific `PersistentVolume` is required for the log files.
*   **Provisioner**: If using a dynamic cluster, apply the `storage-class.yaml`. If manual, ensure `backend-log-pv.yaml` matches your node name.

**Important Manual Steps**:
1.  **Prepare Worker Nodes**: You must manually create the directory on **ALL** worker nodes.
    ```bash
    # Run this on every worker node (k8s-w1, k8s-w2, etc.)
    sudo mkdir -p /tmp/backend-logs
    sudo chmod 777 /tmp/backend-logs
    ```
2.  **Update Manifest**: Open `kube_cluster_configs/backend-log-pv.yaml`.
    *   Find the `nodeAffinity` section.
    *   Update the `values` list to include **your specific worker node hostnames** (e.g., `k8s-w1`, `k8s-w2`, ...).

```bash
# 1. Apply Persistent Log Volume
kubectl apply -f kube_cluster_configs/backend-log-pv.yaml
kubectl apply -f kube_cluster_configs/backend-log-pvc.yaml

# 2. Deploy Loki & Grafana
kubectl apply -f kube_cluster_configs/loki-infra.yaml

# 3. Deploy Promtail Sidecar Config
kubectl apply -f kube_cluster_configs/promtail-config.yaml
```

### 3. Deploy Applications
Deploy the backend (with simple init-containers for log permission) and frontend.
```bash
# Backend (Django + Promtail Sidecar)
kubectl apply -f kube_cluster_configs/backend-deployment.yaml
kubectl apply -f kube_cluster_configs/backend-services.yaml

# Frontend (React + Nginx)
kubectl apply -f kube_cluster_configs/frontend-deployments.yaml
kubectl apply -f kube_cluster_configs/frontend-service.yaml
kubectl apply -f kube_cluster_configs/ingress.yaml
```

---

## 📊 Observability (How to check logs)

Instead of `kubectl logs`, use **Grafana** to search persistent logs.

1.  **Access Grafana**:
    *   URL: `http://<NodeIP>:32000` (NodePort)
    *   **User**: `admin` / **Password**: `admin` (change on first login)

2.  **Setup Data Source** (First time only):
    *   Go to **Configuration** -> **Data Sources** -> **Add Data Source**.
    *   Select **Loki**.
    *   URL: `http://loki:3100`

3.  **Search Logs**:
    *   Go to **Explore**.
    *   Query: `{job="emp-mgmt-backend"}` to see all backend logs.
    *   Query: `{job="emp-mgmt-backend"} |= "ERROR"` to find errors.

---

## 🐳 Manual Docker Build & Run
If you want to run without Kubernetes:

**Backend**:
```bash
cd emp_mgmt_backend
docker build -t emp_mgmt_backend:0.1 .
docker run -p 8080:8080 emp_mgmt_backend:0.1
```

**Frontend**:
```bash
cd emp_mgmt_frontend
docker build -t emp_mgmt_frontend:0.1 .
docker run -p 8081:80 emp_mgmt_frontend:0.1
```

---

## ⚙️ Jenkins & ArgoCD
*   **Jenkins**: Used for CI. See `Jenkins_Compose.yaml` and `JenkinsPipelineSteps.txt`.
*   **ArgoCD**: Used for GitOps deployment. See `kube_cluster_configs/argocd_compose.yaml`.
