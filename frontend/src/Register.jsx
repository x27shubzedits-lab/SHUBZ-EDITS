import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://https://shubz-edits-website.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setMessage(data.message);

      if (data.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setMessage("Server connection failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "35px",
          background: "#222",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#d4af37" }}>SHUBZ EDITS</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              boxSizing: "border-box",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              background: "#d4af37",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Create Account
          </button>
        </form>

        {message && (
          <p style={{ color: "#d4af37", marginTop: "15px" }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px", color: "#aaa" }}>
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#d4af37",
              textDecoration: "none",
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;

