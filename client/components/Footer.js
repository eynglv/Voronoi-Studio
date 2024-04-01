import React from "react";

const Footer = () => {
  return (
    <div className='bg-accent-900/70 w-full h-10 absolute bottom-0'>
      <div className='flex w-full h-full justify-center items-center'>
        <p className='mt-1 mx-auto text-center'>
          All artworks provided by{" "}
          <a
            href='https://www.metmuseum.org/blogs/now-at-the-met/2018/met-collection-api'
            className='mx-auto text-center'
          >
            The Met Collection API
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
