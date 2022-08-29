import './index.scss'
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Dataanime from "../../assets/anime.json"
const SingleAnimePage=(props)=>{
    let params = useParams();
    const singleAnime=Dataanime.filter((item)=>{if(item.id==params.id) return item})
    let dropzoneStyle = {
        width: `100%`,
        height: `520px`,
        backgroundImage: `url(${singleAnime[0].wallpaper})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`
      };
    return(
        <div style={dropzoneStyle}>
            <div className='wallpaper-text'>
                <h1>{singleAnime[0].name}</h1>
            </div>
        </div>)
}
export default SingleAnimePage;