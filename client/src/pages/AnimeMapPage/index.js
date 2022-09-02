import './index.scss'
import React, { useRef, useState,useEffect } from "react";
const AnimeMapPage=()=>{
    const mainWallpaper= "./image/New_map.png"
    let mapStyle = {
        width: `100%`,
        height: `660px`,
        backgroundImage: `url(${mainWallpaper})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center -300px`,
        backgroundSize: `cover`
      };
    return(
        <div style={mapStyle}>
            <div className='animeMap-text-header'>
                <h1>My Map</h1> 
            </div>
            <div className='linenumber1'>
                <span class="dot" id="dotnumber1"></span>
            </div>
            <div className='linenumber2'>
                <span class="dot" id="dotnumber2"></span>
            </div>
            <div className='linenumber3'>
                <span class="dot" id="dotnumber3"></span>
            </div>
            <div className='linenumber4'>
                <span class="dot" id="dotnumber4"></span>
            </div>
            <div className='linenumber5'>
                <span class="dot" id="dotnumber5"></span>
            </div>
            <div className='progress-box'>
                <h2>Beginer</h2>
            </div>
        </div>
    );
}
export default AnimeMapPage