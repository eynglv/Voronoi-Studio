import React from "react";

class Footer extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="footer card my-4 mb-4 rounded-0">
        <div className="card-header row justify-content-center text-center">
          <span className="names col-3">
            <a href="https://github.com/oterech" className="names github">
              Phoebe Torchia
            </a>
          </span>
          <span className="names col-3">
            {" "}
            <a href="https://github.com/eynglv" className="names github">
              Elvy Yang{" "}
            </a>
          </span>
          <span className="names col-3">
            {" "}
            <a href="https://github.com/Scutellicious" className="names github">
              Adrienne Scutellaro{" "}
            </a>
          </span>
          <span className="names col-3">
            <a href="https://github.com/jo-z" className="names github">
              Josephine Bartholoma
            </a>
          </span>
        </div>
        <p className="names text-center mt-4">
          All artworks provided by{" "}
          <a
            href="https://www.metmuseum.org/blogs/now-at-the-met/2018/met-collection-api"
            className="names"
            style={{ color: "#FFCAB1" }}
          >
            Metropolitan API
          </a>{" "}
        </p>
        <div className=" names card-body row justify-content-center text-center">
          <span className="names h3">Voronoi Studio</span>
        </div>
      </div>
    );
  }
}

export default Footer;
