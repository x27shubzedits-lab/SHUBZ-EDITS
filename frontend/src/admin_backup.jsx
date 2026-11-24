import { useEffect, useState } from "react";

function Admin() {
  useEffect(() => {
  const adminLoggedIn = localStorage.getItem("adminLoggedIn");

  if (adminLoggedIn !== "true") {
    window.location.href = "/admin-login";
  }
}, []);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://https://shubz-edits-website.onrender.com/api/bookings");
      const data = await response.json();

      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://https://shubz-edits-website.onrender.com/api/bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("Booking status updated successfully!");

        setBookings((oldBookings) =>
          oldBookings.map((booking) =>
            booking._id === id
              ? { ...booking, status: data.booking.status }
              : booking
          )
        );
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("Failed to update status");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: "40px 20px",
        fontFamily: "Arial",
      }}
    >
      <h1
  style={{
    color: "#d4af37",
    textAlign: "center",
    marginBottom: "10px",
  }}
>
  SHUBZ EDITS
</h1>

<h2 style={{ textAlign: "center", marginBottom: "30px" }}>
  Admin Dashboard
</h2>

<div style={{ textAlign: "center", marginBottom: "30px" }}>
  <button
    onClick={() => {
      localStorage.removeItem("adminLoggedIn");
      window.location.href = "/admin-login";
    }}
    style={{
      padding: "10px 20px",
      background: "#d4af37",
      color: "#000",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Admin Logout
  </button>
</div>

{/* Dashboard Statistics */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto 30px",
  }}
>
  <div style={cardStyle}>
    <h3>Total Bookings</h3>
    <p>{bookings.length}</p>
  </div>

  <div style={cardStyle}>
    <h3>Pending</h3>
    <p>
      {bookings.filter(
        (booking) => (booking.status || "Pending") === "Pending"
      ).length}
    </p>
  </div>

  <div style={cardStyle}>
    <h3>In Progress</h3>
    <p>
      {bookings.filter(
        (booking) => booking.status === "In Progress"
      ).length}
    </p>
  </div>

  <div style={cardStyle}>
    <h3>Completed</h3>
    <p>
      {bookings.filter(
        (booking) => booking.status === "Completed"
      ).length}
    </p>
  </div>

  <div style={cardStyle}>
    <h3>Cancelled</h3>
    <p>
      {bookings.filter(
        (booking) => booking.status === "Cancelled"
      ).length}
    </p>
  </div>
</div>
      {message && (
        <p
          style={{
            textAlign: "center",
            color: "#d4af37",
            marginBottom: "20px",
          }}
        >
          {message}
        </p>
      )}

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p style={{ textAlign: "center" }}>No bookings found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#222",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Mobile</th>
                <th style={thStyle}>Service</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td style={tdStyle}>{booking.name}</td>

                  <td style={tdStyle}>{booking.email}</td>

                  <td style={tdStyle}>{booking.mobile}</td>

                  <td style={tdStyle}>{booking.service}</td>

                  <td style={tdStyle}>{booking.message}</td>

                  <td style={tdStyle}>
                    <select
                      value={booking.status || "Pending"}
                      onChange={(e) =>
                        updateStatus(booking._id, e.target.value)
                      }
                      style={selectStyle}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td style={tdStyle}>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
const cardStyle = {
  background: "#222",
  border: "1px solid #444",
  borderRadius: "12px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
};

const thStyle = {
  padding: "15px",
  border: "1px solid #444",
  color: "#d4af37",
  textAlign: "left",
};

const tdStyle = {
  padding: "15px",
  border: "1px solid #444",
  color: "#ddd",
};

const selectStyle = {
  padding: "8px",
  background: "#111",
  color: "white",
  border: "1px solid #d4af37",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Admin;