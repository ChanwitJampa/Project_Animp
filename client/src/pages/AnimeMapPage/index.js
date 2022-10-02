import './index.scss'
import MyMapFrist from '../../component/MyMapFrist';
import SliderMyAnime from '../../component/SliderMyAnime';
import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

const AnimeMapPage=()=>{
    const dispatch = useDispatch()
    const myAnimeList = useSelector(state => state.myAnimeList)
    const watchanimeYear=[
        {year:"2022"},
    ]
    console.log(myAnimeList.length)
    return(
    <div>
        <MyMapFrist totalAnime={myAnimeList.length}/>
        <div>
            <h2 className="myanime-list">My Anime</h2>
            {watchanimeYear.map((item)=>(
                <SliderMyAnime year={item.year} myAnime={myAnimeList}/>
            ))}
            
        </div>
    </div>);
}
export default AnimeMapPage