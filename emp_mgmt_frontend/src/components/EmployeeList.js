function EmployeeList({ employees = [], onDelete }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>User Name</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.user_name}>
            <td>{emp.user_name}</td>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.phone}</td>
            <td>{emp.role}</td>
            <td>{emp.department}</td>
            <td>{emp.salary}</td>
            <td>
                <button
                    onClick={() => {
                        const confirmed = window.confirm(
                        "Are you sure you want to delete this employee?"
                        );
                        if (confirmed) {
                        onDelete(emp.user_name);
                        }
                    }}
                    >
                    Delete
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



export default EmployeeList;
