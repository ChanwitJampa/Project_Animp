import './index.scss'
import MyMapFrist from '../../component/MyMapFrist';
import SliderMyAnime from '../../component/SliderMyAnime';
import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ProgressBar from '../../component/ProgressBar';
import {fetchAnimeByAccountAsync} from '../../actions/animeDetailListAction'
import {getUser} from "../../servies/authorize";
const AnimeMapPage=()=>{
    const dispatch = useDispatch()
    const myAnimeList = useSelector(state => state.accountAnimeList)
    //const {user} =useSelector((state)=>state.auth)
    const user =getUser()
     
    useEffect(()=>{
        if(user){
            dispatch(fetchAnimeByAccountAsync(user.ID))
        } 
    },[])
    return(
    <div>
        <div>
            <MyMapFrist totalAnime={myAnimeList.length}/>
            <ProgressBar totalAnime={myAnimeList.length}/>
        </div>
    </div>);
}
export default AnimeMapPage