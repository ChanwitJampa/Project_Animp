import './index.scss'
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Dataanime from "../../assets/anime.json"
import SliderAnime from '../../component/SliderAnime';
const SingleAnimePage=(props)=>{
    let params = useParams();
    const singleAnime=Dataanime.filter((item)=>{if(item.id==params.id) return item})
    let dropzoneStyle = {
        width: `100%`,
        height: `660px`,
        backgroundImage: `url(${singleAnime[0].wallpaper})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`
      };
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isAutoPlay, setIsAutoPlay]=useState(false)
    const [isPauseVideo,setIsPauseVideo]=useState(false)
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
      };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    },[]);
    useEffect(()=>{
        if(scrollPosition>200){
            setIsAutoPlay(true)
        }
    },[scrollPosition])
    
    return(
        <div>
            <div style={dropzoneStyle}>
                <div className='wallpaper-text'>
                    <h1>{singleAnime[0].name}</h1>
                </div>
                <div className='wallpaper-detailbox'>
                    <div className='wallpaper-detailbox-imagebox'>
                        <img src={singleAnime[0].image}></img>
                    </div>
                    <div className='wallpaper-detailbox-textbox'>
                        <button>Add to list</button>
                    </div>
                </div>
            </div>
            <div className='anime-detail-container'>
                <div className='anime-detail'>
                    <h2>Detail</h2><br/>
                    <p>Anime: {singleAnime[0].name}</p><br/>
                    {singleAnime[0].seasonal?<p>Episodes: {singleAnime[0].episodes} <br/>Seasonal: {singleAnime[0].seasonal}</p>:
                    <p>Type: Movie</p>}
                    <br/>
                    <p>Year: {singleAnime[0].year}</p><br/>
                    <p>Studio: {singleAnime[0].studios}</p><br/>
                    <p>Duration: {singleAnime[0].duration}</p>
                </div>
                <div className='videoWrapper-container'>
                    <div className='videoWrapper'>
                        <iframe width="560" height="315" id="player" src={`${singleAnime[0].trailer}?autoplay=${isAutoPlay}&mute=1&pauseVideo=${isPauseVideo}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            <SliderAnime tagAnime="From same studio" mode="studio" valueOfMode={singleAnime[0].studios}/>
        </div>
        )
}
export default SingleAnimePage;