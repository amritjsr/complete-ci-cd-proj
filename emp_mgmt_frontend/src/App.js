import { useEffect, useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import { getEmployees, createEmployee, deleteEmployee } from "./api/employeeApi";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    const data = await getEmployees();
    setEmployees(data);
  }

  async function handleAddEmployee(employee) {
    await createEmployee(employee);
    loadEmployees();
  }

  async function handleDeleteEmployee(user_name) {
    await deleteEmployee(user_name);
    loadEmployees();
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", paddingTop: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Employee Management System - Version 1</h1>
        <EmployeeForm onAdd={handleAddEmployee} />
        <br />
        <EmployeeList employees={employees} onDelete={handleDeleteEmployee} />
      </div>
    </div>
  );
}

export default App;
