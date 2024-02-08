import React from 'react';
import img1 from '../img/MainImg/캠핑 메인페이지 이미지.webp';
import img2 from '../img/MainImg/메인페이지 이미지2.jpeg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainPageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className='main-carousel' style={{ textAlign: 'center' }}>
      <Slider {...settings}>
        <div>
          <img
            src={img1}
            alt='Slide 1'
            style={{ width: '70%', height: 'auto', maxHeight: '600px', margin: '0 auto' }}
          />
        </div>
        <div>
          <img
            src={img2}
            alt='Slide 2'
            style={{ width: '70%', height: 'auto', maxHeight: '600px', margin: '0 auto' }}
          />
        </div>
        <div>
          <img
            src={img1}
            alt='Slide 3'
            style={{ width: '70%', height: 'auto', maxHeight: '600px', margin: '0 auto' }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default MainPageCarousel;
