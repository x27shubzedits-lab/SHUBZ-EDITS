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
  const [search, setSearch] = useState("");
  const [uploadingBooking, setUploadingBooking] = useState(null);

const fetchBookings = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/bookings");
    const data = await response.json();

    console.log("bookings data:", data);

    setBookings(data);
    setLoading(false);
  

  } catch (error) {
    console.log(error);
    setLoading(false);
    setMessage("Failed to refresh bookings");
  }
};

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
  const searchText = search.toLowerCase().trim();

  return (
    booking.name?.toLowerCase().includes(searchText) ||
    booking.email?.toLowerCase().includes(searchText) ||
    booking.mobile?.includes(searchText)
  );
});

const uploadEditedVideo = async (bookingId, files) => {
  if (!files || files.length === 0) {
    return;
  }

  if (files.length > 10) {
    setMessage("Maximum 10 edited videos can be uploaded.");
    return;
  }

  try {
    setUploadingBooking(bookingId);

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("editedFiles", file);
    });

    const response = await fetch(
      `http://localhost:5000/api/bookings/${bookingId}/edited-video`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      setMessage("Edited video uploaded successfully!");

      setBookings((oldBookings) =>
        oldBookings.map((booking) =>
          booking._id === bookingId
            ? data.booking
            : booking
        )
      );
    } else {
      setMessage(data.message);
    }
  } catch (error) {
    console.log(error);
    setMessage("Failed to upload edited video");
  } finally {
    setUploadingBooking(null);
  }
};


  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${id}/status`,
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



<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "30px",
    flexWrap: "wrap",
  }}
>
  <button
   onClick={() => {
  fetchBookings();
  setMessage("Bookings refreshed successfully!");
}}
    style={{
      padding: "10px 20px",
      background: "#222",
      color: "#d4af37",
      border: "1px solid #d4af37",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    🔄 Refresh Bookings
  </button>

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
  <div style={{ ...cardStyle, border: "1px solid #d4af37" }}>
    <div style={{ fontSize: "30px" }}>📊</div>
    <h3 style={{ color: "#d4af37" }}>Total Bookings</h3>
    <p style={numberStyle}>{bookings.length}</p>
  </div>

  <div style={{ ...cardStyle, border: "1px solid #d4af37" }}>
    <div style={{ fontSize: "30px" }}>🕐</div>
    <h3 style={{ color: "#d4af37" }}>Pending</h3>
    <p style={numberStyle}>
      {bookings.filter(
        (booking) => (booking.status || "Pending") === "Pending"
      ).length}
    </p>
  </div>

  <div style={{ ...cardStyle, border: "1px solid #00bfff" }}>
    <div style={{ fontSize: "30px" }}>⚙️</div>
    <h3 style={{ color: "#00bfff" }}>In Progress</h3>
    <p style={numberStyle}>
      {bookings.filter(
        (booking) => booking.status === "In Progress"
      ).length}
    </p>
  </div>

  <div style={{ ...cardStyle, border: "1px solid #00ff88" }}>
    <div style={{ fontSize: "30px" }}>✅</div>
    <h3 style={{ color: "#00ff88" }}>Completed</h3>
    <p style={numberStyle}>
      {bookings.filter(
        (booking) => booking.status === "Completed"
      ).length}
    </p>
  </div>

  <div style={{ ...cardStyle, border: "1px solid #ff4444" }}>
    <div style={{ fontSize: "30px" }}>❌</div>
    <h3 style={{ color: "#ff4444" }}>Cancelled</h3>
    <p style={numberStyle}>
      {bookings.filter(
        (booking) => booking.status === "Cancelled"
      ).length}
    </p>
  </div>
</div>
{/* Search Bookings */}
<div
  style={{
    maxWidth: "1000px",
    margin: "0 auto 25px",
  }}
>
  <input
    type="text"
    placeholder="Search by Name, Email or Mobile..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "100%",
      padding: "14px",
      boxSizing: "border-box",
      borderRadius: "8px",
      border: "1px solid #d4af37",
      background: "#222",
      color: "white",
      fontSize: "16px",
      outline: "none",
    }}
  />
</div>

{message && (
  <p
    style={{
      textAlign: "center",
      color: "#00ff88",
      fontWeight: "bold",
      fontSize: "18px",
      margin: "15px 0",
    }}
  >
    {message}
  </p>
)}
  

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading bookings...</p>
      ) :filteredBookings.length === 0 ? (
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
               <th style={thStyle}>Videos</th>
               <th style={thStyle}>Edited Video</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>

            <tbody>
            {filteredBookings.map((booking) => (
                <tr key={booking._id}>
                  <td style={tdStyle}>{booking.name}</td>

                  <td style={tdStyle}>{booking.email}</td>

                  <td style={tdStyle}>{booking.mobile}</td>

                  <td style={tdStyle}>{booking.service}</td>

                  <td style={tdStyle}>{booking.message}</td>

                 <td style={tdStyle}>
  {booking.files && booking.files.length > 0 ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "220px",
      }}
    >
      {booking.files.map((file, index) => (
        <div key={file}>
          <p
            style={{
              margin: "0 0 5px",
              color: "#d4af37",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            Video {index + 1}
          </p>

          <video
            controls
            preload="metadata"
            style={{
              width: "200px",
              maxHeight: "120px",
              borderRadius: "8px",
              background: "#000",
              display: "block",
            }}
          >
            <source
              src={`http://localhost:5000/uploads/${file}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <a
            href={`http://localhost:5000/uploads/${file}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "6px",
              padding: "6px 10px",
              background: "#d4af37",
              color: "#000",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            Open Video
          </a>
        </div>
      ))}
    </div>
  ) : (
    "No Video"
  )}
</td>

<td style={tdStyle}>
  <div style={{ minWidth: "230px" }}>

    {booking.editedFiles &&
    booking.editedFiles.length > 0 ? (
      <div>
        {booking.editedFiles.map((file, index) => (
          <div
            key={file}
            style={{
              marginBottom: "12px",
              padding: "10px",
              background: "#111",
              borderRadius: "8px",
            }}
          >
            <p
              style={{
                color: "#00ff88",
                fontWeight: "bold",
                margin: "0 0 8px",
              }}
            >
              Final Video {index + 1}
            </p>

            <video
              controls
              preload="metadata"
              style={{
                width: "200px",
                maxHeight: "120px",
                borderRadius: "8px",
                background: "#000",
              }}
            >
              <source
                src={`http://localhost:5000/uploads/${file}`}
                type="video/mp4"
              />
            </video>

            <br />

            <a
              href={`http://localhost:5000/uploads/${file}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "7px",
                padding: "6px 10px",
                background: "#00ff88",
                color: "#000",
                borderRadius: "5px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              Open Final Video
            </a>
          </div>
        ))}
      </div>
    ) : (
      <p style={{ color: "#aaa", fontSize: "13px" }}>
        No edited video
      </p>
    )}

    <input
      type="file"
      accept="video/*"
      multiple
      onChange={(e) => {
        uploadEditedVideo(
          booking._id,
          e.target.files
        );
        e.target.value = "";
      }}
      style={{
        width: "100%",
        color: "white",
        marginTop: "5px",
      }}
    />

    {uploadingBooking === booking._id && (
      <p
        style={{
          color: "#d4af37",
          fontWeight: "bold",
          marginTop: "8px",
        }}
      >
        Uploading...
      </p>
    )}

  </div>
</td>

                  <td style={tdStyle}>
                    <select
  value={booking.status || "Pending"}
  onChange={(e) =>
    updateStatus(booking._id, e.target.value)
  }
  style={{
    ...selectStyle,
    border:
      booking.status === "Completed"
        ? "1px solid #00ff88"
        : booking.status === "In Progress"
        ? "1px solid #00bfff"
        : booking.status === "Cancelled"
        ? "1px solid #ff4444"
        : "1px solid #d4af37",
  }}
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

const numberStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  marginTop: "10px",
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
  padding: "9px 12px",
  background: "#111",
  color: "white",
  border: "1px solid #d4af37",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  outline: "none",
};
export default Admin;