import React from "react";
import { useHistory } from "react-router-dom";

import Footer from "./Footer";
import Carousel from "./Carousel";

const Home = () => {
  const history = useHistory();

  return (
    <div className='h-dvh w-full` flex flex-col items-center'>
      {/* TODO update this text */}
      <h1 className='text-2xl text-primary-300 my-5 sm:text-6xl'>
        Replace this opening text
      </h1>
      <Carousel />
      <button
        className='w-1/3 h-12 mt-5 bg-secondary-800 rounded-md hover:bg-secondary-700'
        onClick={() => history.push("/main")}
      >
        Go To Essay
      </button>
      <Footer />
    </div>
  );
};
export default Home;
