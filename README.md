# This is README file for Employee Management Application
# Description:
This application consists of a backend built with Django REST Framework and a frontend built with React. The backend provides RESTful APIs for managing employee data, while the frontend offers a user-friendly interface to interact with these APIs.
And Backend use MySQL as database. This MYSQL database is expected to be running separately and accessible to the backend service.


# How to build Backend Docker Image
# Employee Management Backend Docker Build Instructions
bash````
$ cd emp_mgmt_backend
$ docker build . -t emp_mgmt_backend:0.1
```` 
# Frontend Docker build Instructions
bash````
$ cd ../emp_mgmt_frontend
$ docker build . -t emp_mgmt_frontend:0.1
````
# How to run Backend and Frontend Docker Containers

# Employee Management Backend Docker Run Instructions

export DB_NAME='employee_db'
export DB_USER='emp_admin'
export DB_PASSWORD_ENCRYPTED='base464encodedpassword=='
export DB_HOST='192.168.0.199'
export DB_PORT='3306'

docker rm -f employee_db_container
docker run \
  --name employee_db_container \
  -e DB_NAME=$DB_NAME \
  -e DB_USER=$DB_USER \
  -e DB_PASSWORD_ENCRYPTED=$DB_PASSWORD_ENCRYPTED \
  -e DB_HOST=$DB_HOST \
  -e DB_PORT=$DB_PORT \
  -p 8080:8080 \
  emp_mgmt_backend:0.1


# Employee Management Frontend Docker Run Instructions
export REACT_APP_API_BASE_URL=http://localhost:8080/api
docker run -p 8081:80 emp_mgmt_frontend:0.1


# Jenkins Pipeline Setup Instructions
1. Ensure Docker is installed and running on the Jenkins server.
2. Create a directory on the host machine to persist Jenkins data:
   mkdir -p $HOME/jenkins_home
3. Use the provided Jenkins_Compose.yaml file to set up the Jenkins container with Docker-in-Docker capabilities.
4. Start the Jenkins container using Docker Compose:
   docker-compose -f Jenkins_Compose.yaml up -d
5. Access Jenkins at http://localhost:8080 and complete the initial setup.


# Setting up GitHub Personal Access Token for Jenkins
✅ Step-1 — Create a GitHub Personal Access Token

On GitHub:
Go to Settings → Developer settings → Personal access tokens
Click Generate new token (classic or fine-grained)
Give permissions like:
repo
Copy the token (you’ll need it only once)

# Adding Credentials to Jenkins
✅ Step-2 — Add the token to Jenkins Credentials

Open Jenkins → Manage Jenkins → Credentials
Choose System → Global credentials
Click Add Credentials
Select type → Secret text
Paste your GitHub token
Give an ID (example: gthub_token)
Save


# Using the Token in Jenkins Pipeline
✅ Step-3 — Use the token in your Jenkins Pipeline
In your Jenkinsfile, use the withCredentials step to access the token:
withCredentials([string(credentialsId: 'gthub_token', variable: 'GITHUB_TOKEN')]) {
    // Use GITHUB_TOKEN in your pipeline steps
} 


# Run ArgoCD for Deployment as docker container outside kubernetes cluster
At minimum, the target cluster must have:
  namespace argocd
  argocd-cm ConfigMap
  argocd-rbac-cm
  argocd-secret

The easiest way is to install the Argo CD core resources in the cluster (they won’t run Pods — they only create config/state objects):
bash````
kubectl create namespace argocd
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/core-install.yaml
````
docker compose -f kube_cluster_configs/argocd_compose.yaml up
