import './index.scss'
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import SliderAnime from '../../component/SliderAnime';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import {fetchAnimeAsync} from '../../actions/animeListAction'
import {fetchAnimeByAccountAsync} from '../../actions/animeDetailListAction'

const SingleAnimePage=(props)=>{
    let params = useParams();
    const navigate =useNavigate()
    const dispatch=useDispatch()
    const Dataanime =useSelector(state=>state.animeList)
    const myAnimeList = useSelector(state => state.accountAnimeList)
    const scoreMyAnime=myAnimeList.map((item)=>item.Score)
    const nameOfMyAnimeList=myAnimeList.map((item)=>item.animes_name)
    const [studioAnime,setStudioAnime]=useState()
    const {user} =useSelector((state)=>state.auth)
    const fetchAnime = async () => {
        await axios.get(`http://localhost:5000/getAnimeById/${params.id}`).
        then((response) => response.data)
        .then((anime) => {
            console.log(anime);     
            setSingleAnime(anime)
            if(anime.Studio.includes(",")){
                console.log(anime.Studio)
            }else{

            }
        }).catch(error=>{
            console.log(error); 
        })
        
    }
    const fetchTagByAnime = async () => {
        await axios.get(`http://localhost:5000/getTagsByAnime/${params.id}`).
        then((response) => response.data)
        .then((anime) => {   
            setTagAnime([...new Set(anime)])
        }).catch(error=>{
            console.log(error); 
        })
    }
    const [singleAnime,setSingleAnime] =useState("")
    const [tagAnime,setTagAnime]=useState([])
    //console.log(singleAnime)
    let dropzoneStyle = {
        width: `100%`,
        height: `660px`,
        backgroundImage: `url(${singleAnime.animes_wallpaper})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`
      };
    useEffect(()=>{
        window.scrollTo(0, 0);
        fetchAnime()
        fetchTagByAnime()
        dispatch(fetchAnimeAsync())
    },[])
    useEffect(()=>{
        if(user){
            dispatch(fetchAnimeByAccountAsync(user.accounts_id))
        }
        
    },[user])
    const animeList = Dataanime.filter((item)=>{if(item.Studio==singleAnime.Studio) return item})
    return(
        <div>
            <div style={dropzoneStyle}>
                <div className='singleAnime-wallpaper'>
                    <div className='singleAnime-wallpaper-text'>
                        <h1>{singleAnime.animes_name}</h1>
                    </div>
                    <div className='singleAnime-wallpaper-detailbox'>
                        <div className='singleAnime-wallpaper-detailbox-imagebox'>
                            <img src={singleAnime.animes_image}></img>
                            <button>{nameOfMyAnimeList.includes(singleAnime.animes_name)?<h5>Watched</h5>:<h5>Add to list</h5>}</button>
                        </div>
                        <div className='singleAnime-wallpaper-detailbox-tagAnime'>
                            <div className='detailbox-tagAnime-score'>
                                <h2>Score {singleAnime.animes_score}/10</h2>
                               
                            </div>
                            <div className='detailbox-tagAnime-score'>
                                {tagAnime.map((tag)=>(
                                    <button>{tag.tags_name}</button>
                                ))}
                            </div>
                        </div>
                        <div className='videoWrapper-container'>
                            <div className='videoWrapper'>
                                <iframe width="560" height="315" id="player" src={`${singleAnime.animes_trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='anime-detail-container'>
                <div className='anime-detail'>
                    <h2>Detail</h2><br/>
                    <tr className='anime-detail-text'><td>Anime:</td><td>{singleAnime.animes_name}</td></tr>
                    {singleAnime.animes_episodes!==1?<>
                    <tr className='anime-detail-text'><td>Episodes:</td><td>{singleAnime.animes_episodes}</td></tr>
                    <tr className='anime-detail-text'><td>Seasonal:</td><td>{singleAnime.animes_seasonal}</td></tr>
                    </>:<tr className='anime-detail-text'><td>Type:</td><td>Movie</td></tr>}
                    <tr className='anime-detail-text'><td>Year:</td><td>{singleAnime.animes_year}</td></tr>
                    <tr className='anime-detail-text'><td>Studio:</td><td><button className='anime-detail-link'onClick={()=>navigate(`/studio/${singleAnime.Studio}`)}>{singleAnime.Studio}</button></td></tr>
                    <tr className='anime-detail-text'><td>Duration:</td><td>{singleAnime.animes_duration}</td></tr>
                </div>
                <div className='anime-detail-content'>
                    <h2>เนื้อเรื่องย่อ</h2>
                    <p>{singleAnime.animes_content}</p>
                </div>
            </div>
            <SliderAnime tagAnime="From same studio" animeList={animeList} myAnimeList={myAnimeList}/>
        </div>
        )
}
export default SingleAnimePage;