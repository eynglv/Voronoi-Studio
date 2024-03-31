import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { BrowserRouter as Link } from "react-router-dom";

import Footer from "./Footer";
import Carousel from "./Carousel";

const Home = () => {
  return (
    <div className='h-dvh w-full` flex flex-col items-center'>
      <h1 className='text-2xl text-primary-300 my-5 sm:text-6xl'>
        Replace this opening text
      </h1>
      <Carousel />
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
};
export default Home;
