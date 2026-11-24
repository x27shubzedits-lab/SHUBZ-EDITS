import './App.css'
import Login from "./Login";
import Register from "./Register";
import Booking from "./Booking";
import Admin from "./Admin";
import MyBookings from "./MyBookings";
import AdminLogin from "./AdminLogin";
import Reviews from "./Reviews";

function App() {

  if (window.location.pathname === "/login") {
    return <Login />;
  }

  if (window.location.pathname === "/register") {
    return <Register />;
  }

  if (window.location.pathname === "/booking") {
    return <Booking />;
  }

  if (window.location.pathname === "/admin-login") {
    return <AdminLogin />;
  }

  if (window.location.pathname === "/admin") {
    const isAdmin = localStorage.getItem("adminLoggedIn");

    if (isAdmin !== "true") {
      window.location.href = "/admin-login";
      return null;
    }

    return <Admin />;
  }

  if (window.location.pathname === "/my-bookings") {
    return <MyBookings />;
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>SHUBZ EDITS</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#demos">Our Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#reviews">Reviews</a>

          {localStorage.getItem("user") ? (
            <>
              <button
                onClick={() => {
                  window.location.href = "/my-bookings";
                }}
              >
                My Bookings
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="hero-content">

          <p className="tagline">
            PROFESSIONAL VIDEO EDITING
          </p>

          <h1>
            Turn Your Videos Into
            <span> Amazing Stories</span>
          </h1>

          <p className="description">
            Professional video editing services for Instagram Reels,
            YouTube videos, weddings, business promotions and more.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => window.location.href = "/booking"}
            >
              Book Editing Service
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                document.getElementById("services").scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              View Services
            </button>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services">

        <h2>Our Services</h2>

        <p className="section-text">
          Choose the editing service you need
        </p>

        <div className="service-grid">

          <div className="service-card">
            <h3>Instagram Reels</h3>

            <p>
              Creative and engaging reels with smooth transitions,
              effects and professional color grading.
            </p>

            <button
              onClick={() => {
                localStorage.setItem(
                  "selectedService",
                  "Instagram Reels"
                );
                window.location.href = "/booking";
              }}
            >
              Book Now
            </button>
          </div>

          <div className="service-card">
            <h3>YouTube Editing</h3>

            <p>
              Professional YouTube video editing with clean cuts,
              animations and engaging visuals.
            </p>

            <button
              onClick={() => {
                localStorage.setItem(
                  "selectedService",
                  "YouTube Editing"
                );
                window.location.href = "/booking";
              }}
            >
              Book Now
            </button>
          </div>

          <div className="service-card">
            <h3>Wedding Videos</h3>

            <p>
              Cinematic wedding videos with beautiful transitions,
              music synchronization and color grading.
            </p>

            <button
              onClick={() => {
                localStorage.setItem(
                  "selectedService",
                  "Wedding Videos"
                );
                window.location.href = "/booking";
              }}
            >
              Book Now
            </button>
          </div>

          <div className="service-card">
            <h3>Business Promotion</h3>

            <p>
              Promotional videos designed to help your business
              attract more customers.
            </p>

            <button
              onClick={() => {
                localStorage.setItem(
                  "selectedService",
                  "Business Promotion"
                );
                window.location.href = "/booking";
              }}
            >
              Book Now
            </button>
          </div>

        </div>
      </section>

      {/* DEMO VIDEOS */}
      <section id="demos" className="demos">

        <h2>Our Editing Work</h2>

        <p className="section-text">
          Check out our latest video editing samples
        </p>

        <div className="demo-grid">

          <div className="demo-card">
            <video controls preload="metadata" playsInline>
            <source
                   src="/videos/final.mp4"
                   type="video/mp4"
/>
c browser does not support video.
            </video>

            <h3>Video Editing Demo 1</h3>
          </div>

          <div className="demo-card">
            <video controls preload="metadata" playsInline>
              <source
                src="/videos/0901.mp4"
                type="video/mp4"
              />
              Your browser does not support video.
            </video>

            <h3>Video Editing Demo 2</h3>
          </div>

          <div className="demo-card">
            <video controls preload="metadata" playsInline>
              <source
  src="/videos/PART%201%20FINAL.mp4"
  type="video/mp4"
/>
              Your browser does not support video.
            </video>

            <h3>Video Editing Demo 3</h3>
          </div>

          <div className="demo-card">
            <video controls preload="metadata" playsInline>
             <source
  src="/videos/furniture.mp4"
  type="video/mp4"
/>
              Your browser does not support video.
            </video>

            <h3>Video Editing Demo 4</h3>
          </div>

          <div className="demo-card">
            <video controls preload="metadata" playsInline>
              <source
  src="/videos/car%20delivery.mp4"
  type="video/mp4"
/>
              Your browser does not support video.
            </video>

            <h3>Video Editing Demo 5</h3>
          </div>

          <div className="demo-card">
            <video controls preload="metadata" playsInline>
              <source
  src="/videos/101.mp4"
  type="video/mp4"
/>
              Your browser does not support video.
            </video>

            <h3>Video Editing Demo 6</h3>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">

        <h2>Why Choose SHUBZ EDITS?</h2>

        <div className="features">

          <div>
            <h3>🎬 Professional Editing</h3>
            <p>
              High-quality and creative video editing.
            </p>
          </div>

          <div>
            <h3>⚡ Fast Delivery</h3>
            <p>
              Get your edited videos within the agreed time.
            </p>
          </div>

          <div>
            <h3>📱 Social Media Ready</h3>
            <p>
              Videos optimized for Instagram, YouTube and more.
            </p>
          </div>

        </div>
      
      </section>

      {/* CUSTOMER REVIEWS */}
<section id="reviews" className="services">
  <Reviews />
</section>

      {/* CONTACT */}
      <section id="contact" className="contact">

        <h2>Ready to Edit Your Video?</h2>

        <p>
          Book your video editing service today.
        </p>

        <button
          className="primary-btn"
          onClick={() => window.location.href = "/booking"}
        >
          Get Started
        </button>

      </section>

      {/* FOOTER */}
      <footer>
        <p>
          © 2026 SHUBZ EDITS | Online Video Editing Management System
        </p>
      </footer>

    </div>
  );
}

export default App;