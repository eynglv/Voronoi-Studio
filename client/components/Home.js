import React from "react";
import { Button } from "reactstrap";
import Footer from "./Footer";

class Home extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1 className="display-1 text-center">Welcome</h1>
        <p className="lead text-center">
          Project Description: Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet.
        </p>
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
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
            <div className="carousel-item active">
              <img
                src="https://images.metmuseum.org/CRDImages/as/web-large/DP152319.jpg"
                className="d-block w-75 mx-auto"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.metmuseum.org/CRDImages/as/web-large/DP152319.jpg"
                className="d-block w-75 mx-auto"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.metmuseum.org/CRDImages/as/web-large/DP152319.jpg"
                className="d-block w-75 mx-auto"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
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
        <div id="enterBtn ">
          <Button
            className=" d-block mx-auto mt-4 btn-large col-6 rounded-0 "
            outline
            color="secondary"
          >
            Enter
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
