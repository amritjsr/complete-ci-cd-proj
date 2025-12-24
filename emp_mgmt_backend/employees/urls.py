from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  EmployeeListCreateAPIView, EmployeeDetailAPIView, EmployeeUpdateAPIView, EmployeeSearchAPIView


urlpatterns = [
    path('employees/', EmployeeListCreateAPIView.as_view(), name='employee-list-create'),
    path('employees/<str:pk>/', EmployeeDetailAPIView.as_view(), name='employee-detail'),
    path('employees/search/', EmployeeSearchAPIView.as_view(), name='employee-search'),
    path('employees/<str:pk>/update/', EmployeeUpdateAPIView.as_view(), name='employee-update'),
]
