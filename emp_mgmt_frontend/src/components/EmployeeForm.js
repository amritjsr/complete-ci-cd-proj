import { useState } from "react";

function EmployeeForm({ onAdd }) {
  const [form, setForm] = useState({
    user_name: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    salary: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.user_name.trim()) {
      setError("User name is required");
      return;
    }
    setError("");
    onAdd(form);
    setForm({
      user_name: "",
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      salary: "",
    });
  }


  
  return (
   <form className="employee-form" onSubmit={handleSubmit}>
  <fieldset className="panel">
    <legend className="panel-header">Employee Joining Form</legend>

    <table className="form-table">
      <tbody>
        <tr>
          <th>User Name *</th>
          <td>
            <input
              id="user_name"
              name="user_name"
              value={form.user_name}
              onChange={handleChange}
              required
            />
          </td>
        </tr>

        <tr>
          <th>Full Name</th>
          <td>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <th>Email Address</th>
          <td>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <th>Phone Number</th>
          <td>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <th>Role</th>
          <td>
            <input
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <th>Department</th>
          <td>
            <input
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <th>Salary</th>
          <td>
            <input
              id="salary"
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
            <th></th>
            <td colSpan="3" style={{ textAlign: "center"}}>
                <button type="submit" className="btn-primary btn-wide">Submit</button>
            </td>
        </tr>
      </tbody>
    </table>

    {error && <div className="form-error">{error}</div>}

    
  </fieldset>
</form>

  );
}

export default EmployeeForm;
