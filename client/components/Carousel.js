import React, { useState, useEffect } from "react";

const CarouselItem = ({ carouselItem }) => {
  const { imgSrc, title, caption, alt } = carouselItem;
  return (
    <div className='flex flex-col items-center'>
      <img src={imgSrc} className='object-contain h-96' alt={alt} />
      <div
        className='flex flex-col items-center text-center max-w-96'
        style={{ opacity: 0.8 }}
      >
        <h5>{title}</h5>
        <p>{caption}</p>
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

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     handleNextSlide();
  //   }, 5000);

  //   return () => clearInterval(timer);
  // }, [currentIndex]);

  // TODO: change all the text
  const carouselItems = [
    {
      imgSrc: "https://images.metmuseum.org/CRDImages/ad/web-large/DT73.jpg",
      title: "Fur Traders Descending the Missouri (1845)",
      caption:
        "This piece was originally titled 'French Trader & Half Breed Son', which was deemed too controversial and subsequently renamed.",
      alt: "painting depicting two people resting on a small boat",
    },
    {
      imgSrc:
        "https://collectionapi.metmuseum.org/api/collection/v1/iiif/38360/128077/main-image",
      title: "Bodhisattva (12th Century)",
      caption:
        "The Met acquired this sculpture in 1989 through a longtime collaborator, Douglas Latchford, who was indicted for antiquities trafficking and charged by prosecutors for falsifying the provenance of Khmer works of art.",
      alt: "bronze statue of a Bodhisattva",
    },
    {
      imgSrc:
        "https://collectionapi.metmuseum.org/api/collection/v1/iiif/41494/183320/main-image",
      title: "Landscapes (1814)",
      caption:
        "Chinese art dealer Robert H. Ellsworth made a fortune dealing to millionaire collectors of 'Oriental' art.",
      alt: "black and white sketch of a mountainous landscape",
    },
    {
      imgSrc:
        "https://collectionapi.metmuseum.org/api/collection/v1/iiif/313131/2185313/main-image",
      title: "Female Figure (12th-14th century)",
      caption:
        "This statue was displayed in the Museum of Primitive Art, the precursor to The Michael C. Rockefeller Wing.",
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
      <div className='flex justify-around w-2/6 mt-1 md:w-3/12'>
        {carouselItems.map((_, index) => (
          <SlideIndicator
            active={index === currentIndex}
            key={`indicator-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
