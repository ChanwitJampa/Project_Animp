import Wallpaper from "../../component/Wallpaper";
import SliderAnime from "../../component/SliderAnime";

const HomePage=()=>{
    return(
        <div>
            <Wallpaper type="main"/>
            <SliderAnime tagAnime="New Anime"/>
            <SliderAnime tagAnime="Top Anime" mode="topanime" valueOfMode="14"/>
            <SliderAnime tagAnime="Anime in 2021" mode="year" valueOfMode="2021"/>
        </div>
    )
}
export default HomePage;