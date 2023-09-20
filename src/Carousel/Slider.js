import React, { useState,useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

function Slider() {
  const [curr, setCurr] = useState(0);
  const slides = [
    
    {
      url: require("./V1.jpg"),
    },
    {
      url: require("./V3.jpg"),
    },
    
    {
      url: require("./Vi1.jpg"),
    },
   
  ];

  // const [currentIndex, setCurrentIndex] = useState(0);

  // const prevSlide = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  // const nextSlide = () => {
  //   const isLastSlide = currentIndex === slides.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //   setCurrentIndex(newIndex);
  // };

  const prev = () =>
  setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
const next = () =>
  setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

useEffect(() => {
  // if (!autoSlide) return;
  const slideInterval = setInterval(next,5000);
  return () => clearInterval(slideInterval);
}, []);



  // const goToSlide = (slideIndex) => {
  //   setCurrentIndex(slideIndex);
  // };/

  return (
    <div className='max-w-[700px] h-[620px] w-full m-auto py-28 px-2 relative group'>
      <div
        style={{ backgroundImage: `url(${slides[curr].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prev} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={next} size={30} />
      </div>
      <div className='flex top-2 justify-center'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            // onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
