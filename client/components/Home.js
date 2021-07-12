import React from "react";
import { Button } from "reactstrap";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1 className="display-3 mt-5 mx-3 text-center text-nowrap" id="welcome">Welcome to Voronoi Studio</h1>
        <p className="lead text-center mx-5">
          Project Description: Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet.
        </p>
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators" style={{ opacity: 0.5 }}>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" style={{ opacity: 0.8 }}>
              <img
                src="https://images.metmuseum.org/CRDImages/ep/web-large/DP-416-001.jpg"
                className="d-block mx-auto"
                alt="..."
              />
              <div
                className="carousel-caption d-none d-md-block mx-auto" style={{ opacity: 0.8 }}
              >
                <h5>Marie Joséphine Charlotte du Val d'Ognes </h5>
                <p>
                "I like this one because it reverses subject and object. Just as you observe a painting of her, she is observing and drawing you." - Josephine
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.metmuseum.org/CRDImages/ep/web-large/DT1342.jpg"
gi                className="d-block mx-auto"
                alt="..."
              />
              <div
                className="carousel-caption d-none d-md-block"
                style={{ opacity: 0.8 }}
              >
                <h5>Two Tahitian Women</h5>
                <p>
                  "The painting captures the artist's own views on the beauty and sexuality of Indigenous women. In this stunning rendition of two women, the male gaze permeates." - Phoebe
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.metmuseum.org/CRDImages/eg/web-large/DT564.jpg"
                className="d-block mx-auto"
                alt="..."
              />
              <div
                className="carousel-caption d-none d-md-block"
                style={{ opacity: 0.8 }}
              >
                <h5>Portrait of the Boy Eutyches</h5>
                <p>
                  " " - Adrienne
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div id="enterBtn">
          <Link to="/main">
            <Button
              className="d-block mx-auto mt-4 btn-lg col-6 rounded-0 "
              outline
              color="secondary"
            >
              Enter
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
