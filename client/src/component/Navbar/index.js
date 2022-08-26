import './index.scss'
const Navbar=()=>{
    return(
        <div className='navbar'>
            <div className='navbar-left'>
                <div className='navbar-logo'>
                    <h1 className='navbar-logo-text'>AniMap</h1>
                </div>
                <div>
                    <ul className='navbar-item'>
                        <li className="navbar-item-li"><a href="/" className="navbar-item-link">Home</a></li>
                        <li className="navbar-item-li"><a href="/" className="navbar-item-link">Anime</a></li>
                        <li className="navbar-item-li"><a href="/" className="navbar-item-link">Top Anime</a></li>
                        <li className="navbar-item-li"><a href="/" className="navbar-item-link">My Anime</a></li>
                    </ul>
                </div>
            </div>
            <div>
                <h1>Login</h1>
            </div>
        </div>
    )
}
export default Navbar;