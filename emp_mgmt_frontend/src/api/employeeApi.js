const API_BASE_URL =
  (typeof window !== "undefined" && window.__ENV && window.__ENV.REACT_APP_API_BASE_URL) ||
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:8080/api";


console.log(API_BASE_URL);

export async function getEmployees() {
  const response = await fetch(`${API_BASE_URL}/employees/`);
  return response.json();
}

export async function createEmployee(employee) {
  const response = await fetch(`${API_BASE_URL}/employees/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return response.json();
}

export async function deleteEmployee(user_name) {
  await fetch(`${API_BASE_URL}/employees/${user_name}/update/`, {
    method: "DELETE",
  });
}

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health/`);
    return res.ok;
  } catch (e) {
    return false;
  }
} 
