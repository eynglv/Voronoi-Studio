import React from "react";

class Footer extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="footer card mt-4 mb-0 rounded-0 position-sticky">
        <div className="names card-header row-cols-auto text-center d-flex justify-content-evenly">
          <span className="names" >
            <a href="https://github.com/oterech" className="names github" >
              Phoebe Torchia
            </a>
          </span>
          <span className="names">
            {" "}
            <a href="https://github.com/eynglv" className="names github">
              Elvy Yang{" "}
            </a>
          </span>
          <span className="names">
            {" "}
            <a href="https://github.com/Scutellicious" className="names github">
              Adrienne Scutellaro{" "}
            </a>
          </span>
          <span className="names">
            <a href="https://github.com/jo-z" className="names github">
              Josephine Bartholoma
            </a>
          </span>
        </div>
        <div className="names card-body text-center justify-content-center">
        <p className="names mt-1">
          All artworks provided by{" "}
          <a
            href="https://www.metmuseum.org/blogs/now-at-the-met/2018/met-collection-api"
            className="names"
            style={{ color: "#FFCAB1" }}
          >
            The Met Collection API
          </a>{" "}
        </p>
          <span className="names h4">Voronoi Studio</span>
        </div>
      </div>
    );
  }
}

export default Footer;
