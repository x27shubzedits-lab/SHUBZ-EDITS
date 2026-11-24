import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

 
useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    setLoading(false);
    return;
  }

  const user = JSON.parse(savedUser);

  const fetchBookings = () => {
    fetch(
      `http://localhost:5000/api/bookings/user/${encodeURIComponent(
        user.email
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Booking Error:", error);
        setLoading(false);
      });
  };

  // First fetch
  fetchBookings();

  // Refresh every 10 seconds
  const interval = setInterval(fetchBookings, 10000);

  return () => clearInterval(interval);
}, []);


  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return {
        color: "#00ff88",
        border: "1px solid #00ff88",
      };
    }

    if (status === "In Progress") {
      return {
        color: "#00bfff",
        border: "1px solid #00bfff",
      };
    }

    if (status === "Cancelled") {
      return {
        color: "#ff4444",
        border: "1px solid #ff4444",
      };
    }

    return {
      color: "#d4af37",
      border: "1px solid #d4af37",
    };
  };

  const getProgressStep = (status) => {
  if (status === "Completed") return 3;
  if (status === "In Progress") return 2;
  if (status === "Pending") return 1;
  return 0;
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
          textAlign: "center",
          color: "#d4af37",
        }}
      >
        SHUBZ EDITS
      </h1>

      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        My Bookings
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>
          Loading bookings...
        </p>
      ) : bookings.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>No bookings found.</p>

          <button
            onClick={() =>
              (window.location.href = "/booking")
            }
            style={{
              padding: "12px 20px",
              background: "#d4af37",
              color: "#000",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Book a Service
          </button>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
          }}

        >
          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                background: "#222",
                border: "1px solid #444",
                borderRadius: "12px",
                padding: "25px",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  color: "#d4af37",
                  marginTop: 0,
                }}
              >
                {booking.service}
              </h3>

              <p>
                <strong>Name:</strong> {booking.name}
              </p>

              <p>
                <strong>Email:</strong> {booking.email}
              </p>

              <p>
                <strong>Mobile:</strong> {booking.mobile}
              </p>

              <p>
                <strong>Message:</strong>{" "}
                {booking.message || "No message"}
              </p>

 {booking.files && booking.files.length > 0 && (
  <div
    style={{
      marginTop: "20px",
      marginBottom: "20px",
    }}
  >
    <h4
      style={{
        color: "#d4af37",
        marginBottom: "15px",
      }}
    >
      Uploaded Videos
    </h4>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {booking.files.map((file, index) => (
        <div
          key={file}
          style={{
            background: "#111",
            border: "1px solid #444",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <p
            style={{
              color: "#d4af37",
              fontWeight: "bold",
              marginTop: 0,
            }}
          >
            Video {index + 1}
          </p>

          <video
            controls
            preload="metadata"
            style={{
              width: "100%",
              maxHeight: "220px",
              borderRadius: "8px",
              background: "#000",
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
              marginTop: "10px",
              padding: "8px 14px",
              background: "#d4af37",
              color: "#000",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            Open Video
          </a>
        </div>
      ))}
    </div>
  </div>
)}

{booking.editedFiles && booking.editedFiles.length > 0 && (
  <div
    style={{
      marginTop: "25px",
      marginBottom: "20px",
      padding: "20px",
      background: "#111",
      border: "1px solid #00ff88",
      borderRadius: "12px",
    }}
  >
    <h4
      style={{
        color: "#00ff88",
        marginTop: 0,
        marginBottom: "15px",
        fontSize: "20px",
      }}
    >
      🎬 Your Edited Video
    </h4>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {booking.editedFiles.map((file, index) => (
        <div
          key={file}
          style={{
            background: "#222",
            border: "1px solid #00ff88",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <p
            style={{
              color: "#00ff88",
              fontWeight: "bold",
              marginTop: 0,
            }}
          >
            Final Video {index + 1}
          </p>

          <video
            controls
            preload="metadata"
            style={{
              width: "100%",
              maxHeight: "300px",
              borderRadius: "8px",
              background: "#000",
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
              marginTop: "10px",
              padding: "9px 15px",
              background: "#00ff88",
              color: "#000",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            ⬇ Open / Download Final Video
          </a>
        </div>
      ))}
    </div>
  </div>
)}

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  booking.createdAt
                ).toLocaleDateString()}
              </p>

              <div style={{ marginTop: "20px" }}>
  <h3 style={{ color: "#d4af37" }}>Project Tracking</h3>

  <div style={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>
    {["Pending", "In Progress", "Completed"].map((step, index) => {
      const currentStep = getProgressStep(booking.status || "Pending");
      const active = index < currentStep;

      return (
        <div key={step} style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              height: "8px",
              borderRadius: "10px",
              background: active ? "#00ff88" : "#555",
              marginBottom: "8px",
            }}
          ></div>

          <small style={{ color: active ? "#00ff88" : "#aaa" }}>
            {step}
          </small>
        </div>
      );
    })}
  </div>

  <div
    style={{
      display: "inline-block",
      marginTop: "15px",
      padding: "8px 15px",
      borderRadius: "20px",
      fontWeight: "bold",
      ...getStatusStyle(booking.status || "Pending"),
    }}
  >
    Status: {booking.status || "Pending"}
  </div>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;