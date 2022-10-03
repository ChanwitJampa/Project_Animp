import './index.scss'
import React, { useRef, useState,useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link, withRouter } from "react-router-dom";
import { Routes, Route, useParams } from "react-router-dom";
import ListSeasonAnime from '../../component/ListSeasonAnime';
const seasonYearOption=[]
const seasonOptions = [
    { value: 'Fall', label: 'Fall' },
    { value: 'Summer', label: 'Summer' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Winter', label: 'Winter' }
  ]
const yearOptions =[
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' },
    { value: '2013', label: '2013' },
    { value: '2012', label: '2012' },
    { value: '2011', label: '2011' },
    { value: '2010', label: '2010' },
    { value: '2009', label: '2009' },
    { value: '2008', label: '2008' },
    { value: '2007', label: '2007' },
    { value: '2006', label: '2006' },
    { value: '2005', label: '2005' },
]
  const SeasonnalAnimePage=()=>{
    const [season,setSeason]=useState("Summer")
    const [year,setYear]=useState(yearOptions[0].label)
    if(seasonYearOption==""){
        for(let x in yearOptions){
          for(let y in seasonOptions){
            seasonYearOption.push({year:yearOptions[x].value,season:seasonOptions[y].value})
          }
        }
    }
    const onChangeValue=(season,year)=>{
      setSeason(season)
      setYear(year)
    }
    console.log(seasonYearOption)
    let linkSeason = {
      color:`#FFFFFF`
    };
    let linkSeasonNow={
      color:`#FF1493`
    }
    return(
        <div>
            <div className='season-text-header'>
                <h1>Anime</h1> 
            </div>
            <div className='select-season-bar'>
              <Swiper
              slidesPerView={8}
              spaceBetween={20}
              slidesPerGroup={8}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              >
                {seasonYearOption.map((item,index)=>
                  <SwiperSlide key={index} className='swiper-slide-season'>
                    {item.season==season&&item.year==year?
                      <button style={linkSeasonNow} className='link-season' 
                            onClick={()=>onChangeValue(item.season,item.year)}>
                            {item.season} {item.year}</button>:
                      <button style={linkSeason} className='link-season' 
                            onClick={()=>onChangeValue(item.season,item.year)}>
                            {item.season} {item.year}</button>}
                    
                  </SwiperSlide>
                )}
            </Swiper>
            </div>
            <ListSeasonAnime year={year} season={season}/>
        </div>
    )
}
export default SeasonnalAnimePage