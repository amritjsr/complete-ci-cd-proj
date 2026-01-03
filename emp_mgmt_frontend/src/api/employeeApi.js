// const BACKEND_API_BASE_URL =
//   (typeof window !== "undefined" && window.__ENV && window.__ENV.BACKEND_API_BASE_URL) ||
//   process.env.BACKEND_API_BASE_URL ||
//   "http://localhost:8080/api";

const BACKEND_API_BASE_URL = "/api";
console.log(BACKEND_API_BASE_URL);

export async function getEmployees() {
  const response = await fetch(`${BACKEND_API_BASE_URL}/employees/`);
  return response.json();
}

export async function createEmployee(employee) {
  const response = await fetch(`${BACKEND_API_BASE_URL}/employees/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return response.json();
}

export async function deleteEmployee(user_name) {
  await fetch(`${BACKEND_API_BASE_URL}/employees/${user_name}/update/`, {
    method: "DELETE",
  });
}

export async function checkHealth() {
  try {
    const res = await fetch(`${BACKEND_API_BASE_URL}/health/`);
    return res.ok;
  } catch (e) {
    return false;
  }
} 
