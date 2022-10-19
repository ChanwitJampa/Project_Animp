import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SliderMyAnime from "../../component/SliderMyAnime";
import { fetchAnimeByAccountAsync } from "../../actions/animeDetailListAction";
import { getRole, getUser } from "../../servies/authorize";
import "./index.scss";
import PaymentForm from "../../payment/PaymentForm";
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { Elements, } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { publishableKeyGet } from '../../payment/constants/functions'
import PaymaentModal from "../../modal/PaymentModal";
const AccountPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
      setOpen(true);
  }
  const handleClose = () =>setOpen(false);
  const user=getUser()
  return (
    <div>
      <div className="accountpage-header">
        <h1>My Account</h1>
      </div>
      <div className="accountpage-container">
        <div className="accountpage-detail"><h1>{user.Name}</h1><h2>Usename</h2></div>
        <div className="accountpage-coin"><h2>My coin: 0</h2><button onClick={handleOpen}>Add coin</button></div>
      </div>
      <PaymaentModal open={open} onClose={handleClose}/>
    </div>
  );
};
export default AccountPage;
