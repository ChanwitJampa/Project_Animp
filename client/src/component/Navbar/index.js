import './index.scss'
import SearchBarAnime from '../SearchBarAnime';
import Profile from '../Profile';
import {Link,withRouter,Navigate} from "react-router-dom";
import {useSelector} from "react-redux"

const Navbar=()=>{
    const {user} =useSelector((state)=>state.auth)
    return(
        <div className='navbar'>
            <div className='navbar-left'>
                <div className='navbar-logo'>
                    <h1 className='navbar-logo-text'><a href='/' className="navbar-item-link">AniMap</a></h1>
                </div>
                <div>
                    <ul className='navbar-item' >
                        <li className="navbar-item-li"><a href='/' className="navbar-item-link">Home</a></li>
                        <li className="navbar-item-li"><Link to="/allanime" className="navbar-item-link">Anime</Link></li>
                        <li className="navbar-item-li"><Link to="/topanime" className="navbar-item-link">Top Anime</Link></li>
                        <li className="navbar-item-li"><Link to="/mymap" className="navbar-item-link">My Anime</Link></li>
                    </ul>
                </div>
            </div>
            <div className='navbar-right'>
                <SearchBarAnime/>
                {user?<Profile/>:<Link to="/login" className='navbar-login-button' >Login</Link>}
            </div>
        </div>
    )
}
export default Navbar;