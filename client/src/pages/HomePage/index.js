import Wallpaper from "../../component/Wallpaper";
import SliderAnime from "../../component/SliderAnime";
import Dataanime from "../../assets/anime.json"
const HomePage=()=>{
    return(
        <div>
            <Wallpaper type="main"/>
            <SliderAnime animeList={Dataanime} tagAnime="New Anime"/>
        </div>
    )
}
export default HomePage;