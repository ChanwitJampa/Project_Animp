import './index.scss'
import SearchBar from '../SearchBar';
import Profile from '../Profile';
import {Link,withRouter} from "react-router-dom";

const Navbar=()=>{
    
    return(
        <div className='navbar'>
            <div className='navbar-left'>
                <div className='navbar-logo'>
                    <h1 className='navbar-logo-text'>AniMap</h1>
                </div>
                <div>
                    <ul className='navbar-item' >
                        <li className="navbar-item-li"><Link to="/" className="navbar-item-link">Home</Link></li>
                        <li className="navbar-item-li"><Link to="/allanime" className="navbar-item-link">Anime</Link></li>
                        <li className="navbar-item-li"><Link to="/topanime" className="navbar-item-link">Top Anime</Link></li>
                        <li className="navbar-item-li"><Link to="/" className="navbar-item-link">My Anime</Link></li>
                    </ul>
                </div>
            </div>
            <div className='navbar-right'>
                <SearchBar/>
                <Profile/>
            </div>
        </div>
    )
}
export default Navbar;