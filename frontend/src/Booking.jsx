import { useEffect, useState } from "react";

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const selectedService = localStorage.getItem("selectedService");

  if (savedUser) {
    const user = JSON.parse(savedUser);

    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
      service: selectedService || "",
    }));
  }
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setMessage("Please login first");
      return;
    }

    const user = JSON.parse(savedUser);

    const uploadData = new FormData();

uploadData.append("name", formData.name);
uploadData.append("email", user.email);
uploadData.append("mobile", formData.mobile);
uploadData.append("service", formData.service);
uploadData.append("message", formData.message);

files.forEach((file) => {
  uploadData.append("files", file);
});

    try {
     const response = await fetch("http://localhost:5000/api/bookings", {
  method: "POST",
  body: uploadData,
});

      const data = await response.json();

      setMessage(data.message);

      if (data.success) {
        setFormData({
          name: user.name || "",
          email: user.email || "",
          mobile: "",
          service: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
      setMessage("Server connection failed");
    }
  };

  return (
   <div
  style={{
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, rgba(212,175,55,0.12), transparent 35%), #080808",
    color: "white",
    padding: "60px 20px",
    fontFamily: "Arial, sans-serif",
  }}
><div
  style={{
    maxWidth: "650px",
    margin: "auto",
    background: "rgba(20,20,20,0.95)",
    padding: "40px",
    borderRadius: "18px",
    border: "1px solid #333",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  }}
>
       <h1
  style={{
    textAlign: "center",
    color: "#d4af37",
    fontSize: "32px",
    letterSpacing: "3px",
    marginBottom: "10px",
  }}
>
  SHUBZ EDITS
</h1>
       <h2
  style={{
    textAlign: "center",
    color: "#fff",
    marginBottom: "30px",
    fontSize: "24px",
  }}
>
  Book Video Editing Service
</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            readOnly
            style={inputStyle}
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            style={inputStyle}
          />
   
<select
  name="service"
  value={formData.service}
  onChange={handleChange}
  required
  style={inputStyle}
>
  <option value="">Select Service</option>

  <option value="Instagram Reels">
    Instagram Reels
  </option>

  <option value="YouTube Editing">
    YouTube Editing
  </option>

  <option value="Wedding Videos">
    Wedding Videos
  </option>

  <option value="Business Promotion">
    Business Promotion
  </option>
</select>
          <textarea
            name="message"
            placeholder="Tell us about your video..."
            value={formData.message}
            onChange={handleChange}
            rows="5"
            style={inputStyle}
          />
         <div
  style={{
    marginTop: "15px",
    padding: "20px",
    border: "1px dashed #d4af37",
    borderRadius: "10px",
    background: "#0d0d0d",
    textAlign: "center",
  }}
>
  <p
    style={{
      color: "#d4af37",
      fontWeight: "bold",
      fontSize: "16px",
      marginBottom: "8px",
    }}
  >
    📁 Upload Your Video / Image
  </p>

  <p
    style={{
      color: "#888",
      fontSize: "13px",
      marginBottom: "15px",
    }}
  >
    Select the video or image you want us to edit
  </p>
<input
  type="file"
  accept="image/*,video/*"
  multiple
  onChange={(e) => setFiles(Array.from(e.target.files))}
  style={{
    width: "100%",
    color: "#aaa",
    fontSize: "14px",
  }}
/>
  {files.length > 0 && (
  <div
    style={{
      marginTop: "12px",
      textAlign: "left",
    }}
  >
    <p
      style={{
        color: "#00ff88",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      ✓ Selected Files ({files.length})
    </p>

    {files.map((file, index) => (
      <p
        key={index}
        style={{
          color: "#aaa",
          fontSize: "13px",
          margin: "6px 0",
        }}
      >
        {index + 1}. {file.name}
      </p>
    ))}
  </div>
)}
</div>
          <button
            type="submit"
           style={{
  width: "100%",
  padding: "15px",
  marginTop: "20px",
  background: "#d4af37",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
  letterSpacing: "0.5px",
  transition: "0.3s",
}}
          >
            Submit Booking
          </button>
        </form>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: "#d4af37",
              marginTop: "20px",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 15px",
  margin: "9px 0",
  boxSizing: "border-box",
  borderRadius: "8px",
  border: "1px solid #3a3a3a",
  background: "#0d0d0d",
  color: "white",
  fontSize: "15px",
  outline: "none",
};
export default Booking;