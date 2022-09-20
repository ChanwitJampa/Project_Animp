import './index.scss'
import {Link,withRouter} from "react-router-dom";
const Profile=()=>{
    return(
        <div class="dropdown">
            <button class="user-profile"></button>
            <div class="dropdown-content">
                <Link to="#">Profile</Link>
                <Link to="#">Admin</Link>
                <Link to="#">Logout</Link>
        </div>
</div>
    )
}
export default Profile;