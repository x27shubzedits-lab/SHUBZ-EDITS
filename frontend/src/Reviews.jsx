
import { useEffect, useState } from "react";

function Reviews() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchReviews = () => {
    fetch("http://https://shubz-edits-website.onrender.com/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    try {
      const response = await fetch("http://https://shubz-edits-website.onrender.com/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Thank you! Your review submitted successfully.");
        setComment("");
        setRating(5);
        fetchReviews();
      } else {
        setMessage(data.message || "Review submission failed.");
      }
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ background: "#111", color: "white", padding: "25px", borderRadius: "12px" }}>
      <h2 style={{ color: "#d4af37" }}>Customer Reviews</h2>

      <form onSubmit={handleSubmit}>
        <h3>Give Your Rating</h3>

        <div style={{ fontSize: "30px", marginBottom: "15px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#ffc107" : "#777",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback..."
          required
          rows="4"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "12px",
            padding: "12px 22px",
            background: "#d4af37",
            color: "black",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Submit Review
        </button>
      </form>

      {message && <p>{message}</p>}

      <hr />

      <h3>What Our Customers Say</h3>

      {reviews.map((review) => (
        <div
          key={review._id}
          style={{
            background: "#222",
            padding: "15px",
            marginTop: "12px",
            borderRadius: "8px",
          }}
        >
          <strong>{review.name}</strong>
          <p style={{ color: "#ffc107", fontSize: "20px" }}>
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
