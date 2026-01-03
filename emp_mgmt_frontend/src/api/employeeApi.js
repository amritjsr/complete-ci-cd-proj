// const BACKEND_API_BASE_URI =
//   (typeof window !== "undefined" && window.__ENV && window.__ENV.BACKEND_API_BASE_URI) ||
//   process.env.BACKEND_API_BASE_URI ||
//   "http://localhost:8080/api";

const BACKEND_API_BASE_URI = "/api";


export async function getEmployees() {
  const response = await fetch(`${BACKEND_API_BASE_URI}/employees/`);
  return response.json();
}

export async function createEmployee(employee) {
  const response = await fetch(`${BACKEND_API_BASE_URI}/employees/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return response.json();
}

export async function deleteEmployee(user_name) {
  await fetch(`${BACKEND_API_BASE_URI}/employees/${user_name}/update/`, {
    method: "DELETE",
  });
}

export async function checkHealth() {
  try {
    const res = await fetch(`${BACKEND_API_BASE_URI}/health/`);
    return res.ok;
  } catch (e) {
    return false;
  }
} 
