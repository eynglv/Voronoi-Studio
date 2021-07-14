import React from "react";

class Footer extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="footer names card mt-5 mb-0 rounded-0 position-sticky">
        <div className="names card-header row-cols-auto text-center d-flex justify-content-evenly">
          <span className="names"style={{backgroundColor: "transparent"}} >
            <a href="https://github.com/oterech"style={{backgroundColor: "transparent"}} className="names github" >
              Phoebe Torchia
            </a>
          </span>
          <span className="names" style={{backgroundColor: "transparent"}}>
            {" "}
            <a href="https://github.com/eynglv" style={{backgroundColor: "transparent"}} className="names github">
              Elvy Yang{" "}
            </a>
          </span>
          <span className="names" style={{backgroundColor: "transparent"}}>
            {" "}
            <a href="https://github.com/Scutellicious"  style={{backgroundColor: "transparent"}}className="names github">
              Adrienne Scutellaro{" "}
            </a>
          </span>
          <span className="names" style={{backgroundColor: "transparent"}}>
            <a href="https://github.com/jo-z" style={{backgroundColor: "transparent"}} className="names github">
              Josephine Bartholoma
            </a>
          </span>
        </div>
        <div className="names card-body text-center justify-content-center" >
        <p className="mt-1 mx-auto text-center names"style={{backgroundColor: "transparent"}}>
          All artworks provided by{" "}
          <a
            href="https://www.metmuseum.org/blogs/now-at-the-met/2018/met-collection-api"
            className="names mx-auto text-center"
            style={{ color: "#FFCAB1" }, {backgroundColor:"transparent"}}
          >
            The Met Collection API
          </a>{" "}
        </p>
          <span className="names h4" style={{backgroundColor: "transparent"}}>Voronoi Studio</span>
        </div>
      </div>
    );
  }
}

export default Footer;
