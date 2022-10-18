import {useDispatch,useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import SliderMyAnime from "../../component/SliderMyAnime"
import {fetchAnimeByAccountAsync} from '../../actions/animeDetailListAction'
import { getRole, getUser} from "../../servies/authorize";
import './index.scss'


const AccountPage=()=>{
    const [stripeToken, setStripeToken] = useState(null);
    const onToken = (token) => {
        setStripeToken(token)
      }
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
      };
    return(<div>
        <div className='accountpage-header'><h1>My Account</h1></div>
        <div className='accountpage-container'>
        
        </div>
    </div>)
}
export default AccountPage