from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  EmployeeGetCreateAPIView, EmployeeUpdateAPIView, EmployeeSearchAPIView, health


urlpatterns = [
    path('employees/', EmployeeGetCreateAPIView.as_view(), name='employee-list-create'),
    path('health/', health, name='health'),
    path('employees/search/', EmployeeSearchAPIView.as_view(), name='employee-search'),
    path('employees/<str:pk>/update/', EmployeeUpdateAPIView.as_view(), name='employee-update'),
]
