import './index.scss'
import React, { useRef, useState,useEffect } from "react";
const AnimeMapPage=()=>{
    const mainWallpaper= "https://wallpaperaccess.com/full/3097725.jpg"
    let mapStyle = {
        width: `100%`,
        height: `660px`,
        backgroundImage: `url(${mainWallpaper})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`
      };
    return(
        <div style={mapStyle}>
            <div className='animeMap-text-header'>
                <h1>My Map</h1> 
            </div>
        </div>
    );
}
export default AnimeMapPage