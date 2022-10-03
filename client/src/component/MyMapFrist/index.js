import './index.scss'
import React, { useRef, useState,useEffect } from "react";
import ProgressBar from '../../component/ProgressBar';
const levelOfGame=[
        {level:1 , label: "Iron" ,numberOfAnime: 6},
        {level:2 , label: "Bronze" ,numberOfAnime: 12},
        {level:3 , label: "Master" ,numberOfAnime: 18},
        {level:4 , label: "Silver" ,numberOfAnime: 24},
        {level:5 , label: "Gold" ,numberOfAnime: 30},
        {level:6 , label: "Platinum" ,numberOfAnime: 36},
        {level:7 , label: "Diamond" ,numberOfAnime: 42},
        {level:8 , label: "Master" ,numberOfAnime: 48},
        {level:9 , label: "Grandmaster" ,numberOfAnime: 54},
        {level:10 , label: "Challenger" ,numberOfAnime: 60}
    ]
const MyMapFrist=(props)=>{
    const {totalAnime} = props
    const mainWallpaper= "./image/New_map.png"
    const TagPosition=()=>{
        return(
            <div className='tag-point'>
                <h3>You are here</h3> 
                <p>Viewed {totalAnime} item</p>
                <div className='arrow-side'></div>
            </div>
        )
    }
    const filterLevel=(item)=>{
        if(item.numberOfAnime>=totalAnime){
            return item
        }
    }
    const levelOfUser=levelOfGame.filter(filterLevel).map((item)=>item.label)
    console.log(levelOfUser[0])
    return(
        <div style={{backgroundImage:`url(${mainWallpaper})`}} className="animeMap-map">
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
                    {totalAnime<=10&&totalAnime>5?<TagPosition/>:<></>}
                </div>
            </div>
            <div className='linenumber2'>
                <div class="dot-tooltip" id="dotnumber2">
                    <div class="info">
                        <h3>Port Royal</h3>
                        <p>ท่าเรือแห่งเดียวของเกาะแห่งนี้ สถานที่ๆ เดียวที่จะพอนักเดินทางทั้งหลายไปยังเมืองอื่นๆ ได้</p>
                        <div class="arrow"></div>
                    </div>
                    {totalAnime<=25&&totalAnime>20?<TagPosition/>:<></>}
                </div>
            </div>
            <div className='linenumber3'>
                <div class="dot-tooltip" id="dotnumber3">
                    <div class="info">
                        <h3>Kudsan liver</h3>
                        <p>แม่น้ำที่เป็นเส้นทางเดินเรือหลักของเรือขนส่งสินค้า จากต่างเมืองเข้าสู่อาณาจักร</p>
                        <div class="arrow"></div>
                    </div>
                    {totalAnime<=15&&totalAnime>10?<TagPosition/>:<></>}
                </div>
            </div>
            <div className='linenumber4'>
                <div class="dot-tooltip" id="dotnumber4">
                    <div class="info">
                        <h3>Camp Lazlo</h3>
                        <p>ค่ายที่เหล่านักเดินทางมักจะพักก่อนที่จะเดินทางต่อ มีคนจำนวนมาละทิ้งปลายทางและอาศัยที่นี่ </p>
                        <div class="arrow"></div>
                    </div>
                    {totalAnime<=20&&totalAnime>15?<TagPosition/>:<></>}
                </div>
            </div>
            <div className='linenumber5'>
                <div class="dot-tooltip" id="dotnumber5">
                    <div class="info">
                        <h3>Start Point</h3>
                        <p>ผู้กล้าทุกๆ คนจะเริ่มต้นเดินทางที่นี่ เตรียมใจไว้ให้พร้อมละ</p>
                        <div class="arrow"></div>
                    </div>
                    {totalAnime<=5&&totalAnime>=0?<TagPosition/>:<></>}
                </div>
            </div>
            <div className='progress-box'>
                <div className='progress-box-hearder'>
                    <h2>{totalAnime==0?"Beginer":levelOfUser[0]}</h2>
                        
                </div>
                <ProgressBar completed= {totalAnime} />
                <div className='progress-box-detail'><h2>Viewed {totalAnime} item</h2></div>
            </div>
        </div>
    );
}
export default MyMapFrist