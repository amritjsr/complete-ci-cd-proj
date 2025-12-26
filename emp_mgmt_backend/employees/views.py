from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer
from django.http import JsonResponse
from django.db import connections
from django.db.utils import OperationalError
from django.db.models import Q
import logging
logger = logging.getLogger(__name__)
class EmployeeGetCreateAPIView(APIView):

    def get(self, request):
        search = request.query_params.get("search", "")

        employees = Employee.objects.all()

        if search:
            employees = employees.filter(
                Q(user_name__icontains=search) |
                Q(name__icontains=search) |
                Q(email__icontains=search) |
                Q(phone__icontains=search) |
                Q(role__icontains=search) |
                Q(department__icontains=search)
            )
            logger.info(f"Search query='{search}', matched {employees.count()} employees")

        serializer = EmployeeSerializer(employees, many=True)

        if not employees:
            logger.warning("No employees found for search request")
        else:
            logger.info(f"Fetched {employees.count()} employees for search request")
        return Response(serializer.data)
    # def get(self, request):
    #     employees = Employee.objects.all()
    #     serializer = EmployeeSerializer(employees, many=True)
    #     logger.warning("No employees found in the database.") if not employees else logger.info("Fetched all employees successfully.")
    #     return Response(serializer.data)
    
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"Employee {serializer.data['name']} created successfully.")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class EmployeeDetailAPIView(APIView):

#     def get_object(self, pk):
#         try:
#             return Employee.objects.get(pk=pk)
#         except Employee.DoesNotExist:
#             return None

#     def get(self, request):
#         employees = Employee.objects.all()
#         serializer = EmployeeSerializer(employees, many=True)
#         return Response(serializer.data)

class EmployeeSearchAPIView(APIView):
    def get(self, request):
        name = request.query_params.get('name', None)
        user_name = request.query_params.get('user_name', None)
        email = request.query_params.get('email', None)
        phone = request.query_params.get('phone', None)

        if name:
            employees = Employee.objects.filter(name__icontains=name)
        elif user_name:
            employees = Employee.objects.filter(user_name__icontains=user_name)
        elif email:
            employees = Employee.objects.filter(email__icontains=email)
        elif phone:
            employees = Employee.objects.filter(phone__icontains=phone)
        else:
            employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        if len(employees) == 0:
            logger.warning("No employees found matching the search criteria.")
            return Response({"message": "No employees found matching the criteria"}, status=status.HTTP_404_NOT_FOUND)
        logger.info(f"Found {len(employees)} employees matching the search criteria.")
        return Response(serializer.data, status=status.HTTP_200_OK)

class EmployeeUpdateAPIView(APIView):

    def get_object(self, pk):
        try:
            return Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            return None

    def put(self, request, pk):
        employee = self.get_object(pk)
        if not employee:
            logger.warning("Employee not found.")
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"Employee {serializer.data['name']} updated successfully.")
            return Response(serializer.data)
        logger.error(f"Error updating employee: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        employee = self.get_object(pk)
        if not employee:
            logger.warning("Employee not found.")
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        employee.delete()
        logger.info(f"Employee with id {pk} deleted successfully.")
        return Response(status=status.HTTP_204_NO_CONTENT)


def health(request):
    """
    Simple health endpoint that checks DB connectivity.
    """
    print("Health check endpoint called.")
    try:
        connections['default'].cursor()
    except OperationalError:
        return JsonResponse({'database': 'unavailable'}, status=503)
    return JsonResponse({'status': 'ok'}, status=200)
