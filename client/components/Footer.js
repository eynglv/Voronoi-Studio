import React from "react";

const Footer = () => {
  return (
    <div className='bg-accent-900/70 w-full h-125 absolute bottom-0'>
      <div className='names card-body text-center justify-content-center'>
        <p
          className='mt-1 mx-auto text-center names'
          style={{ backgroundColor: "transparent" }}
        >
          All artworks provided by{" "}
          <a
            href='https://www.metmuseum.org/blogs/now-at-the-met/2018/met-collection-api'
            className='namesCollection mx-auto text-center'
            style={({ color: "#FFCAB1" }, { backgroundColor: "transparent" })}
          >
            The Met Collection API
          </a>{" "}
        </p>
        <span className='names h4' style={{ backgroundColor: "transparent" }}>
          Voronoi Studio
        </span>
      </div>
    </div>
  );
};

export default Footer;
