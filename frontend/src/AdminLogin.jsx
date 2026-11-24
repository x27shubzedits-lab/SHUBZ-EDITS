import { useState } from "react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@shubzedits.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "/admin";
    } else {
      setMessage("Invalid Admin Email or Password");
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
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#222",
          padding: "35px",
          borderRadius: "15px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#d4af37",
          }}
        >
          SHUBZ EDITS
        </h1>

        <h2 style={{ textAlign: "center" }}>
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "13px",
            background: "#d4af37",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Admin Login
        </button>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: "#ff5555",
              marginTop: "15px",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  margin: "8px 0",
  boxSizing: "border-box",
  borderRadius: "5px",
  border: "1px solid #444",
  background: "#111",
  color: "white",
  fontSize: "15px",
};

export default AdminLogin;