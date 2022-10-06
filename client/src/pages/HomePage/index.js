import Wallpaper from "../../component/Wallpaper";
import SliderAnime from "../../component/SliderAnime";
import {fetchAnimeAsync} from '../../actions/animeListAction'
import {fetchAnimeByAccountAsync} from '../../actions/animeDetailListAction'
import {useDispatch,useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import axios from 'axios';


const HomePage=()=>{
    const dispatch=useDispatch()
    const Dataanime =useSelector(state=>state.animeList)
    const myAnimeList = useSelector(state => state.accountAnimeList)
    const {user} =useSelector((state)=>state.auth)
    const [animeByTagSchool,setAnimeByTagSchool]=useState([])
    const [animeByTagDrama,setAnimeByTagDrama]=useState([])
    const fetchAnimeByTagSchool = async (id) => {
        await axios.get(`http://localhost:5000/tagDetails/anime/${id}`).
        then((response) => response.data)
        .then((anime) => {   
            setAnimeByTagSchool(anime)
        }).catch(error=>{
            console.log(error); 
        })
    }
    const fetchAnimeByTagDrama = async (id) => {
        await axios.get(`http://localhost:5000/tagDetails/anime/${id}`).
        then((response) => response.data)
        .then((anime) => {
            setAnimeByTagDrama(anime)
        }).catch(error=>{
            console.log(error); 
        })
    }
    useEffect(()=>{
        dispatch(fetchAnimeAsync())
        fetchAnimeByTagSchool(2)
        fetchAnimeByTagDrama(8)
    },[])
    useEffect(()=>{
        if(user){
            dispatch(fetchAnimeByAccountAsync(user.accounts_id))
        }
    },[user])
    const SliderContainer=(props)=>{
        const {tagAnime,mode,valueOfMode} = props
        var animeList=[]
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
        if(mode=="topanime"){
            animeList = (Dataanime.slice(1,valueOfMode).sort((firstItem, secondItem) => secondItem.animes_score - firstItem.animes_score));
        }else{
            animeList= (Dataanime.filter(filterAnime).sort((firstItem, secondItem) => secondItem.animes_score - firstItem.animes_score))
        }
        return(
            <SliderAnime tagAnime={tagAnime} animeList={animeList} myAnimeList={myAnimeList}/>
        )
        }
    return(
        <div>
            <Wallpaper type="main"/>
            <SliderContainer tagAnime="New Anime"/>
            <SliderContainer tagAnime="Top Anime" mode="topanime" valueOfMode="14"/>
            <SliderContainer tagAnime="Anime in 2021" mode="year" valueOfMode="2021"/>
            <SliderAnime tagAnime="School" animeList={animeByTagSchool} myAnimeList={myAnimeList}/>
            <SliderAnime tagAnime="Drama" animeList={animeByTagDrama} myAnimeList={myAnimeList}/>
        </div>
    )
}
export default HomePage;