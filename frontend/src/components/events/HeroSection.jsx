import "./HeroSection.css";
import heroImage from "../../assets/images/events/hero.avif";

function HeroSection() {
  return (
    <section className="hero-section">

      <div className="container">

        <div className="row align-items-center">

          {/* Left Content */}

          <div className="col-lg-6">

            <h1 className="hero-title">
              Discover & Register for
              <br />
              <span>Amazing College Events</span>
            </h1>

            <p className="hero-description">
              Explore technical, cultural, sports and many more events.
              <br />
              Participate, learn and grow with your community.
            </p>

          </div>

          {/* Right Image */}

          <div className="col-lg-6 text-center">

            <img src={heroImage}
            alt="Students"
            className="hero-image"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;