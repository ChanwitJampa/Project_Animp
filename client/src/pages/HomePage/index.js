import Wallpaper from "../../component/Wallpaper";
import SliderAnime from "../../component/SliderAnime";
import {fetchAnimeAsync} from '../../actions/animeListAction'
import {useDispatch,useSelector} from 'react-redux'
import { useState, useEffect } from "react";

const SliderContainer=(props)=>{
    const {tagAnime,mode,valueOfMode} = props
    const dispatch=useDispatch()
    var animeList=[]
    const Dataanime =useSelector(state=>state.animeList)
    console.log(Dataanime)
    const filterAnime=(item)=>{
        if(tagAnime=="New Anime"){
            if(item.animes_year=="2022"&&item.animes_seasonal=="Summer"){
                return item
            }
        }
        if(mode=="year"){
            if(valueOfMode==item.animes_year){
                return item
            }
        }
        if(mode=="studio"){
            if(valueOfMode==item.Studio){
                return item
            }
        }
    }
    useEffect(()=>{
        dispatch(fetchAnimeAsync())
    })
    if(mode=="topanime"){
        animeList = (Dataanime.slice(1,valueOfMode).sort((firstItem, secondItem) => secondItem.animes_score - firstItem.animes_score));
    }else{
        animeList= (Dataanime.filter(filterAnime).sort((firstItem, secondItem) => secondItem.animes_score - firstItem.animes_score))
    }
    return(
        <SliderAnime tagAnime={tagAnime} animeList={animeList} />
    )
    }

const HomePage=()=>{

    return(
        <div>
            <Wallpaper type="main"/>
            <SliderContainer tagAnime="New Anime"/>
            <SliderContainer tagAnime="Top Anime" mode="topanime" valueOfMode="14"/>
            <SliderContainer tagAnime="Anime in 2021" mode="year" valueOfMode="2021"/>
            
        </div>
    )
}
export default HomePage;