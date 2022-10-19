import { useState, useEffect } from "react";
import "./index.scss";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getRole, getUser } from "../../servies/authorize";
import axios from "axios";
const itemDonate=[
    {  id: 1, name: "คุ้กกี้", image: "../image/Cokie.png", price: 5},
    {  id: 2, name: "ดังโงะ", image: "../image/Dango.png", price: 5},
    {  id: 3, name: "โมจิ", image: "../image/Mochi.png", price: 10},
    {  id: 4, name: "เปาะเปี๊ยะทอด", image: "../image/Egg-rolls.png", price: 15},
    {  id: 5, name: "ฮะเก๋า", image: "../image/Ha-gow.png", price: 20},
    {  id: 6, name: "ซาลาเปา", image: "../image/Steamed-dumpling.png", price: 25},
    {  id: 7, name: "เกี๋ยวซ่า", image: "../image/Gyoza.png", price: 25},
    {  id: 8, name: "ซูชิ", image: "../image/Sushi.png", price: 30},
    {  id: 9, name: "ไทยากิ", image: "../image/Taiyaki.png", price: 40},
    {  id: 10, name: "ราเมง", image: "../image/Raman.png", price: 50},
    {  id: 11, name: "คุ้กกี้เสี่ยงทาย", image: "../image/Fortune-cookie.png", price: 100},
    {  id: 12, name: "ต้มยำกุ้ง", image: "../image/Tom-Yum-Goong.png", price: 200},
]
const DonateStudioModal = (props) => {
  const { open, onClose, studio } = props;
  const [modalStudio, setModalStudio] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (studio && open) {
      setModalStudio(studio);
    }
  }, [studio, open]);
  const MySwal = withReactContent(Swal)
  const user=getUser()
  const dispatch = useDispatch()
  const onDonation=(item)=>{

    onClose()
    if(user){
        // console.log(item.price)
        // console.log(modalStudio.studioes_name)
        // console.log(user)
        console.log(user.ID)
        console.log(item.price)
        MySwal.fire({
            title: <p>Loading</p>,
            didOpen: () => {
              // `MySwal` is a subclass of `Swal` with all the same instance & static methods
              MySwal.showLoading()
              axios.post(`http://localhost:5000/api/discount`,{
                user_id:Number(user.ID),
                amount:Number(item.price)
            })
              .then((response) => {
                MySwal.fire({
                  title: <strong>Good job!</strong>,
                  html: <i>Successfully added to list</i>,
                  icon: 'success'
                })
                //dispatch(fetchAnimeByAccountAsync(user.accounts_id))
              })
              .catch((error) => {
                MySwal.fire("Alert", error, "error");
              });
            },
          }).then(() => {
            return MySwal.fire(<p>Shorthand works too</p>)
          })
        
    }else{
      MySwal.fire({
        icon: 'info',
        title: 'You need to login',
        showCancelButton: true,
        confirmButtonText: 'Login Now',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/login`)
        } 
      })
    }
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalstudio-modalStyles">
        <div className="modalstudio-header">
            <button onClick={onClose}>X</button>
        </div>
        <h1 >Donate ให้กับสตูดิโอ {modalStudio.studioes_name}</h1>
        <div className="modalstudio-container">
            {itemDonate.map((item)=>(
            <div className="modalstudio-child" onClick={()=>onDonation(item)}>
                <div>
                    <div className="modalstudio-child-img" style={{backgroundImage:`url(${item.image})`}}></div>
                    <p>{item.name}</p>
                    <p>{item.price} $</p>
                </div>
           </div> 
            ))}
        </div>
      </div>
    </Modal>
  );
};
export default DonateStudioModal;