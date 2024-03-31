import React, { useState, useEffect } from "react";

const CarouselItem = ({ imgSrc, title, caption }) => (
  <div className=''>
    <img src={imgSrc} className='md:shrink-0' alt />
    <div className='' style={{ opacity: 0.8 }}>
      <h5>{title}</h5>
      <p className=''>{caption}</p>
    </div>
  </div>
);

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {}, []);

  const carouselItems = [
    {
      imgSrc: "https://images.metmuseum.org/CRDImages/ad/web-large/DT73.jpg",
      title: "Fur Traders Descending the Missouri",
      caption:
        "This piece was originally titled French Trader & Half Breed Son",
    },
    {
      imgSrc:
        "https://collectionapi.metmuseum.org/api/collection/v1/iiif/38360/128077/main-image",
      title: "Bodhissatva (12th Century)",
      caption:
        "This piece was originally titled French Trader & Half Breed Son",
    },
    {
      imgSrc:
        "https://collectionapi.metmuseum.org/api/collection/v1/iiif/41494/183320/main-image",
      title: "Landscapes (1814)",
      caption:
        "This piece was originally titled French Trader & Half Breed Son",
    },
    {
      imgSrc:
        "https://collectionapi.metmuseum.org/api/collection/v1/iiif/313131/2185313/main-image",
      title: "Fur Traders Descending the Missouri",
      caption: "Female Figure (12th-14th century)",
    },
  ];
  return <div className='bg-primary-500 h-2/5'>hello</div>;
};

export default Carousel;
