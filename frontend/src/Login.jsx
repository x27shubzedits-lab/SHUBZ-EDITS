import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://https://shubz-edits-website.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      setMessage(data.message);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
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
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
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
            Login
          </button>
        </form>

        {message && (
          <p style={{ color: "#d4af37", marginTop: "15px" }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px", color: "#aaa" }}>
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#d4af37",
              textDecoration: "none",
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;