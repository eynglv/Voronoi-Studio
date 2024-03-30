import React from "react";
import { Button } from "reactstrap";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1
          className='text-6xl font-bold leading-10 text-rose-800'
          // id='welcome'
        >
          Welcome to Voronoi Studio
        </h1>
        <div
          id='carouselExampleCaptions'
          className='carousel slide mx-auto'
          data-bs-ride='carousel'
          style={{ width: "60%" }}
        >
          <div className='carousel-indicators' style={{ opacity: 0.5 }}>
            <button
              type='button'
              data-bs-target='#carouselExampleCaptions'
              data-bs-slide-to='0'
              className='active'
              aria-current='true'
              aria-label='Slide 1'
            ></button>
            <button
              type='button'
              data-bs-target='#carouselExampleCaptions'
              data-bs-slide-to='1'
              aria-label='Slide 2'
            ></button>
            <button
              type='button'
              data-bs-target='#carouselExampleCaptions'
              data-bs-slide-to='2'
              aria-label='Slide 3'
            ></button>
            <button
              type='button'
              data-bs-target='#carouselExampleCaptions'
              data-bs-slide-to='3'
              aria-label='Slide 4'
            ></button>
          </div>
          <div className='carousel-inner'>
            <div className='carousel-item active' style={{ opacity: 0.8 }}>
              <img
                src='https://images.metmuseum.org/CRDImages/ep/web-large/DP-416-001.jpg'
                className='d-block mx-auto'
                alt='...'
              />
              <div
                className='carousel-caption d-none d-md-block mx-auto'
                style={{ opacity: 0.8 }}
              >
                <h5>Marie Joséphine Charlotte du Val d'Ognes </h5>
                <p className='text-center mx-auto'>
                  "I like this one because it reverses subject and object. Just
                  as you observe a painting of her, she is observing and drawing
                  you." - Josephine
                </p>
              </div>
            </div>
            <div className='carousel-item'>
              <img
                src='https://images.metmuseum.org/CRDImages/ep/web-large/DT1342.jpg'
                className='d-block mx-auto'
                alt='...'
              />
              <div
                className='carousel-caption d-none d-md-block'
                style={{ opacity: 0.8 }}
              >
                <h5>Two Tahitian Women</h5>
                <p className='text-center mx-auto'>
                  "The painting captures the artist's own views on the beauty
                  and sexuality of Indigenous women. In this stunning rendition
                  of two women, the male gaze permeates." - Phoebe
                </p>
              </div>
            </div>
            <div className='carousel-item'>
              <img
                src='https://images.metmuseum.org/CRDImages/eg/web-large/DT564.jpg'
                className='d-block mx-auto'
                alt='...'
              />
              <div
                className='carousel-caption d-none d-md-block'
                style={{ opacity: 0.8 }}
              >
                <h5>Portrait of the Boy Eutyches</h5>
                <p className='text-center mx-auto'>
                  "This is an Egyptian piece from around 100 AD painted on wood.
                  I am captivated by this boy's gaze and imagining the life
                  behind his portrait." - Adrienne
                </p>
              </div>
            </div>
            <div className='carousel-item'>
              <img
                src='https://images.metmuseum.org/CRDImages/ad/web-large/DT73.jpg'
                className='d-block mx-auto'
                alt='...'
              />
              <div
                className='carousel-caption d-none d-md-block'
                style={{ opacity: 0.8 }}
              >
                <h5>Fur Traders Descending the Missouri</h5>
                <p className='text-center mx-auto'>
                  "This piece was originally titled “French Trader & Half Breed
                  Son,” and its revision into something less controversial, as
                  well as the serene depiction of the American frontier,
                  represents a slice of American history that is both idealized
                  and problematic" - Elvy
                </p>
              </div>
            </div>
          </div>
          <button
            className='carousel-control-prev w-60'
            type='button'
            data-bs-target='#carouselExampleCaptions'
            data-bs-slide='prev'
          >
            <span
              className='carousel-control-prev-icon'
              aria-hidden='true'
            ></span>
            <span className='visually-hidden'>Previous</span>
          </button>
          <button
            className='carousel-control-next'
            type='button'
            data-bs-target='#carouselExampleCaptions'
            data-bs-slide='next'
          >
            <span
              className='carousel-control-next-icon'
              aria-hidden='true'
            ></span>
            <span className='visually-hidden'>Next</span>
          </button>
        </div>
        <div id='enterBtn' className='mx-auto' style={{ width: "70%" }}>
          <Link to='/main'>
            <Button
              className='d-block mx-auto mt-4 btn-lg col-6 rounded-0'
              outline
              color='secondary'
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
