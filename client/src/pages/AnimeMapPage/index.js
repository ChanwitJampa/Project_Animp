import './index.scss'
import MyMapFrist from '../../component/MyMapFrist';
import MyMapAnime from '../../component/MyMapAnime';
const AnimeMapPage=()=>{
    return(<div>
        <MyMapFrist totalAnime='6'/>
        <MyMapAnime/>
    </div>);
}
export default AnimeMapPage