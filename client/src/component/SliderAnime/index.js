import React, { useRef, useState,useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link, withRouter } from "react-router-dom";
import { Routes, Route, useParams } from "react-router-dom";
import './index.scss'
const SliderAnime=(props)=>{
    const {animeList ,tagAnime,mode} =props
    return(
        <div className="slide-anime-header">
            <h2>{tagAnime}</h2>
            <Swiper
              slidesPerView={7}
              spaceBetween={20}
              slidesPerGroup={7}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              id="swiper-anime"
              >
                {animeList.map((item,index)=>
                  <SwiperSlide key={index} className='swiper-slide-anime'><img src={item.image}></img></SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}
export default SliderAnime;