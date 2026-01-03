#!/bin/bash

kubectl delete -f config-maps.yaml
kubectl delete -f secrets.yaml
kubectl delete -f frontend-deployments.yaml
sleep 5
kubectl delete -f backend-deployment.yaml
sleep 5
kubectl delete -f backend-services.yaml
sleep 5
kubectl delete -f frontend-service.yaml
sleep 5
kubectl delete -f ingress.yaml
sleep 5
kubectl delete -f backend-netpol.yaml
sleep 5
kubectl delete -f frontend-netpol.yaml
sleep 5

kubectl apply -f config-maps.yaml
kubectl apply -f secrets.yaml
kubectl apply -f backend-deployment.yaml
sleep 5
kubectl apply -f backend-services.yaml
sleep 5
kubectl apply -f frontend-deployments.yaml
sleep 5
kubectl apply -f frontend-service.yaml
sleep 5
kubectl apply -f ingress.yaml
sleep 5
kubectl apply -f backend-netpol.yaml
sleep 5
kubectl apply -f frontend-netpol.yaml
sleep 5

