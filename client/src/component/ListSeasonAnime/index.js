import './index.scss'
import Dataanime from "../../assets/anime.json"
const ListSeasonAnime=(props)=>{
    const {year,season}=props;
    const animeInSeasonYear=Dataanime.filter((item)=>{if(item.seasonal==season&&item.year==year) return item})
    return(
        <div className="season-year-list">
            <h2>{season} {year}</h2>
            <div className="season-year-container">
                {animeInSeasonYear.map((anime,index)=>
                    <div key={index} className="season-year-card">
                        <img src={anime.image}/>
                        <button>Add to List</button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ListSeasonAnime;