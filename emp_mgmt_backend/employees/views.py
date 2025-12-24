from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer


class EmployeeListCreateAPIView(APIView):

    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeDetailAPIView(APIView):

    def get_object(self, pk):
        try:
            return Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            return None

    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

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
            return Response({"error": "No search parameters provided"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = EmployeeSerializer(employees, many=True)
        if len(employees) == 0:
            return Response({"message": "No employees found matching the criteria"}, status=status.HTTP_404_NOT_FOUND)
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
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        employee = self.get_object(pk)
        if not employee:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
