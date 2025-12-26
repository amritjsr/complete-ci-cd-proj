import { useEffect, useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import { getEmployees, createEmployee, deleteEmployee, checkHealth } from "./api/employeeApi";

function App() {
  const [employees, setEmployees] = useState([]);
  const [backendUp, setBackendUp] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    let mounted = true;

    async function check() {
      const ok = await checkHealth();
      if (mounted) setBackendUp(!!ok);
    }

    check();
    const id = setInterval(check, 30000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
      setBackendUp(true);
    } catch (e) {
      setBackendUp(false);
      setEmployees([]);
    }
  }

  async function handleAddEmployee(employee) {
    await createEmployee(employee);
    loadEmployees();
  }

  async function handleDeleteEmployee(user_name) {
    await deleteEmployee(user_name);
    loadEmployees();
  }

  // Filter employees based on search text
  const filteredEmployees = employees.filter(emp =>
    Object.values(emp).some(v =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
  {/* 📦 Bordered container */}
    <div
      style={{
        display: "inline-block",
        border: "1px solid #ccc",       // thin boundary line
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        background: "#fff",
        textAlign: "center",
      }}
    >
    <h1>Employee Management System - Version 1</h1>

    {!backendUp && (
      <div
        style={{
          background: "#ffefef",
          color: "#900",
          padding: "8px 12px",
          marginBottom: "12px",
          borderRadius: "4px",
          border: "1px solid #f5c2c2",
        }}
      >
        ⚠️ Backend unavailable — data may be stale. Retrying…
      </div>
    )}

    <EmployeeForm onAdd={handleAddEmployee} />

    <br />

    {/* 🔍 Full-width search bar */}
    <input
      type="text"
      placeholder="Search employees…"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: "10px",
        width: "100%",                // ⬅️ stretch end-to-end
        marginBottom: "12px",
        borderRadius: "6px",
        border: "1px solid #999",
        boxSizing: "border-box",      // keeps padding inside width
      }}
    />

    <div
  style={{
    width: "100%",
    overflowX: "auto",        // 🔹 enables horizontal scroll if needed
    borderRadius: "6px",
  }}
>
  <EmployeeList
    employees={filteredEmployees}
    onDelete={handleDeleteEmployee}
  />
</div>

  </div>
</div>

  );
}

export default App;
