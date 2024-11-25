import { useState } from "react";

function RegisterAdmin() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1234/register-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Admin registered:", data);
      alert("Admin registered: " + data);
    } catch (error) {
      console.error("Error registering admin:", error);
      alert("Error registering: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="form-label">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control mb-3 p-3"
        />
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-3 p-3"
        />
        <label className="form-label">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control mb-5 p-3"
        />
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterAdmin;
