import './index.scss'
import MyMapFrist from '../../component/MyMapFrist';
import SliderMyAnime from '../../component/SliderMyAnime';
import { useState,useEffect } from 'react';
const AnimeMapPage=()=>{
    const watchanimeYear=[
        {year:"2022"},
        {year:"2021"},
        {year:"2020"},
        {year:"2019"},
        {year:"2018"},
        {year:"2017"},
        {year:"2016"},
    ]
    return(
    <div>
        <MyMapFrist totalAnime='6'/>
        <div>
            <h2 className="myanime-list">My Anime</h2>
            {watchanimeYear.map((item)=>(
                <SliderMyAnime year={item.year}/>
            ))}
            
        </div>
    </div>);
}
export default AnimeMapPage