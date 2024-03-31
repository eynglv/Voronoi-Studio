import React, { useState, useEffect } from "react";

const CarouselItem = ({ carouselItem }) => {
  const { imgSrc, title, caption, alt } = carouselItem;
  return (
    <div className='flex flex-col items-center'>
      <img src={imgSrc} className='object-contain h-96' alt={alt} />
      <div className='flex flex-col items-center' style={{ opacity: 0.8 }}>
        <h5>{title}</h5>
        <p className=''>{caption}</p>
      </div>
    </div>
  );
};

const SlideIndicator = ({ active }) => (
  <div
    className={`w-6 h-1 ${active ? "bg-primary-50" : "bg-primary-500"}`}
  ></div>
);

const ChevronLeftIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-10 h-10 hover:text-primary-400'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15.75 19.5 8.25 12l7.5-7.5'
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-10 h-10 hover:text-primary-400'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m8.25 4.5 7.5 7.5-7.5 7.5'
    />
  </svg>
);

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    const nextIndex = (currentIndex + 1) % carouselItems.length;
    setCurrentIndex(nextIndex);
  };

  const handlePreviousSlide = () => {
    const prevIndex =
      (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const carouselItems = [
    {
      imgSrc: "https://images.metmuseum.org/CRDImages/ad/web-large/DT73.jpg",
      title: "Fur Traders Descending the Missouri",
      caption:
        "This piece was originally titled French Trader & Half Breed Son",
      alt: "painting depicting two people resting on a small boat",
    },
    {
      imgSrc:
        "https://collectionapi.metmuseum.org/api/collection/v1/iiif/38360/128077/main-image",
      title: "Bodhissatva (12th Century)",
      caption:
        "This piece was originally titled French Trader & Half Breed Son",
      alt: "bronze statue of a bodhissatva",
    },
    {
      imgSrc:
        "https://collectionapi.metmuseum.org/api/collection/v1/iiif/41494/183320/main-image",
      title: "Landscapes (1814)",
      caption:
        "This piece was originally titled French Trader & Half Breed Son",
      alt: "black and white sketch of a mountainous landscape",
    },
    {
      imgSrc:
        "https://collectionapi.metmuseum.org/api/collection/v1/iiif/313131/2185313/main-image",
      title: "Female Figure (12th-14th century)",
      caption: "Female Figure (12th-14th century)",
      alt: "statue of female figure",
    },
  ];

  return (
    <div className='flex flex-col justify-between h-3/5 w-full md:w-1/2 items-center'>
      <div className='flex justify-between w-full'>
        <button onClick={handlePreviousSlide}>
          <ChevronLeftIcon />
        </button>
        <CarouselItem carouselItem={carouselItems[currentIndex]} />
        <button onClick={handleNextSlide}>
          <ChevronRightIcon />
        </button>
      </div>
      <div className='flex justify-around w-2/6 md:w-3/12'>
        {carouselItems.map((_, index) => (
          <SlideIndicator active={index === currentIndex} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
