"use client";

import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <>
      <Swiper
        loop={true}
        navigation={true}
        speed={5000}
        autoplay={{ delay: 2000 }}
        modules={[Navigation, Autoplay]}
        className="mySwiper home-slider"
      >
        <SwiperSlide>
          <img src="/images/slider-3.jpg" alt="slide"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slider-2.jpg" alt="slide"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slider-1.jpg" alt="slide"></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Banner;
