import React, { useState,useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './index.scss'
import AddAnimeModal from "../AddAnimeModal";

const SliderAnime=(props)=>{
    const {tagAnime,animeList} =props
    const [modalAnime,setModalAnime]=useState()

    const [open, setOpen] = useState(false);
    const handleOpen = (item) => {
        setModalAnime(item)
        setOpen(true);
    }
    const handleClose = () =>setOpen(false);

    return(
        <>
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
                    <SwiperSlide key={index} className='swiper-slide-anime' onClick={()=>handleOpen(item)}><img src={item.image} ></img>
                    
                    </SwiperSlide>
                    
                    )}
                </Swiper>
                
            </div>
            <AddAnimeModal open={open} onClose={handleClose} anime={modalAnime}/>
        </>
        
    )
}
export default SliderAnime;