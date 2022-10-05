import './index.scss'
import {Link,withRouter} from "react-router-dom";
const ProfileBar=()=>{
    return(
        <div class="dropdown">
            <button class="user-profile"></button>
            <div class="dropdown-content">
                <Link to="/profile">Profile</Link>
                <Link to="/login">Logout</Link>
        </div>
</div>
    )
}
export default ProfileBar;