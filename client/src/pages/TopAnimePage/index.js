import './index.scss'
import FilterTopAnime from '../../component/FilterTopAnime';
import TableTopAnime from '../../component/TableTopAnime';
const TopAnimePage=()=>{
    return(
        <div className='container'>
            <h1 className='header'>Top Anime</h1>
            <FilterTopAnime/>
            <TableTopAnime/>
        </div>
    )
}
export default TopAnimePage;