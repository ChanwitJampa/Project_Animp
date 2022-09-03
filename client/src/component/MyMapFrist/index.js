import './index.scss'
import React, { useRef, useState,useEffect } from "react";
import ProgressBar from '../../component/ProgressBar';
const MyMapFrist=(props)=>{
    const {totalAnime} = props
    const mainWallpaper= "./image/New_map.png"
    let mapStyle = {
        width: `100%`,
        height: `660px`,
        backgroundImage: `url(${mainWallpaper})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center -300px`,
        backgroundSize: `cover`
      };
    const TagPosition=()=>{
        return(
            <div className='tag-point'>
                <h3>You are here</h3> 
                <div className='arrow-side'></div>
            </div>
        )
    }
    return(
        <div style={mapStyle}>
            <div className='animeMap-text-header'>
                <h1>My Map</h1> 
            </div>
            <div className='linenumber1'>
                <div class="dot-tooltip" id="dotnumber1">
                    <div class="info">
                        <h3>Kingdom of commerce</h3>
                        <p>อาณาจักรแห่งการค้าขาย ผู้คนจำนวนมากเข้ามารวมตัวกันอยู่ที่นี่และทำการค้าขายกัน</p>
                        <div class="arrow"></div>
                    </div>
                </div>
            </div>
            <div className='linenumber2'>
                <div class="dot-tooltip" id="dotnumber2">
                    <div class="info">
                        <h3>Port Royal</h3>
                        <p>ท่าเรือแห่งเดียวของเกาะแห่งนี้ สถานที่ๆ เดียวที่จะพอนักเดินทางทั้งหลายไปยังเมืองอื่นๆ ได้</p>
                        <div class="arrow"></div>
                    </div>
                </div>
            </div>
            <div className='linenumber3'>
                <div class="dot-tooltip" id="dotnumber3">
                    <div class="info">
                        <h3>Kudsan liver</h3>
                        <p>แม่น้ำที่เป็นเส้นทางเดินเรือหลักของเรือขนส่งสินค้า จากต่างเมืองเข้าสู่อาณาจักร</p>
                        <div class="arrow"></div>
                    </div>
                </div>
            </div>
            <div className='linenumber4'>
                <div class="dot-tooltip" id="dotnumber4">
                    <div class="info">
                        <h3>Camp Lazlo</h3>
                        <p>ค่ายที่เหล่านักเดินทางมักจะพักก่อนที่จะเดินทางต่อ มีคนจำนวนมาละทิ้งปลายทางและอาศัยที่นี่ </p>
                        <div class="arrow"></div>
                    </div>
                </div>
            </div>
            <div className='linenumber5'>
                <div class="dot-tooltip" id="dotnumber5">
                    <div class="info">
                        <h3>Start Point</h3>
                        <p>ผู้กล้าทุกๆ คนจะเริ่มต้นเดินทางที่นี่ เตรียมใจไว้ให้พร้อมละ</p>
                        <div class="arrow"></div>
                    </div>
                    <TagPosition/>
                </div>
            </div>
            <div className='progress-box'>
                <div className='progress-box-hearder'>
                    <h2>Beginer</h2>
                </div>
                <ProgressBar completed= {totalAnime} />
                <div className='progress-box-detail'><h2>Viewed {totalAnime} item</h2></div>
            </div>
        </div>
    );
}
export default MyMapFrist