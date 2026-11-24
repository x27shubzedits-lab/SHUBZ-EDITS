
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Failed:", err.message));

// Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    files: {
      type: [String],
      default: [],
    },
    editedFiles: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Customer Review Schema
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

// Upload API
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded"
    });
  }

  res.json({
    success: true,
    message: "File uploaded successfully",
    file: req.file.filename
  });
});

// Create Booking API
app.post("/api/bookings", upload.array("files", 10), async (req, res) => {
  try {
    const booking = new Booking({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      service: req.body.service,
      message: req.body.message || "",
      files: req.files ? req.files.map((file) => file.filename) : [],
    });

    await booking.save();

    res.json({
      success: true,
      message: "Booking submitted successfully",
    });
  } catch (error) {
    console.log("BOOKING ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Register API
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration Successful!",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Registration Failed",
    });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    res.json({
      success: true,
      message: "Login Successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
});

// Test API
app.get("/", (req, res) => {
  res.send("Online Video Editing Management System Backend is Running!");
});

// Upload Edited Video
app.post(
  "/api/bookings/:id/edited-video",
  upload.array("editedFiles", 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No edited video uploaded",
        });
      }

      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      const newEditedFiles = req.files.map(
        (file) => file.filename
      );

      booking.editedFiles = [
        ...(booking.editedFiles || []),
        ...newEditedFiles,
      ];

      booking.status = "Completed";

      await booking.save();

      res.json({
        success: true,
        message: "Edited video uploaded successfully",
        booking,
      });
    } catch (error) {
      console.log("EDITED VIDEO ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Update Booking Status
app.put("/api/bookings/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
    });
  }
});

// Get User Bookings
app.get("/api/bookings/user/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({
      email: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user bookings",
    });
  }
});

// Get All Bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
});

// Submit Customer Review
app.post("/api/reviews", async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;

    if (!name || !email || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (
      !Number.isInteger(Number(rating)) ||
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check Completed Booking
    const completedBooking = await Booking.findOne({
      email: email,
      status: "Completed",
    });

    if (!completedBooking) {
      return res.status(403).json({
        success: false,
        message: "Only customers with completed bookings can submit reviews.",
      });
    }
 // Check if customer already submitted a review
const existingReview = await Review.findOne({ email });

if (existingReview) {
  return res.status(409).json({
    success: false,
    message: "You have already submitted a review.",
  });
}

    const review = new Review({
      name,
      email,
      rating: Number(rating),
      comment,
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.log("REVIEW ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Customer Reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.log("GET REVIEWS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
});

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
