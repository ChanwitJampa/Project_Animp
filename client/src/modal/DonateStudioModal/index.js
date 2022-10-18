import { useState, useEffect } from "react";
import "./index.scss";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const itemDonate=[
    {  id: 1, name: "คุ้กกี้", image: "./image/Cokie.png", price: 5},
    {  id: 2, name: "", image: "", price: 5},
    {  id: 3, name: "", image: "", price: 10},
    {  id: 4, name: "เปาะเปี๊ยะทอด", image: "", price: 15},
    {  id: 5, name: "", image: "", price: 20},
    {  id: 6, name: "", image: "", price: 25},
    {  id: 7, name: "", image: "", price: 25},
    {  id: 8, name: "", image: "", price: 30},
    {  id: 9, name: "", image: "", price: 40},
    {  id: 10, name: "", image: "", price: 50},
    {  id: 11, name: "", image: "", price: 100},
    {  id: 12, name: "ต้มยำกุ้ง", image: "./image/Tom Yum Goong.png", price: 200},
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
  const {user} =useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const mainWallpaper= "./image/New_map.png"
  const onDonation=(item)=>{

    onClose()
    if(user){
        console.log(item.price)
        console.log(modalStudio.studioes_name)
        console.log(user)
        MySwal.fire({
            title: <p>Loading</p>,
            didOpen: () => {
              // `MySwal` is a subclass of `Swal` with all the same instance & static methods
              MySwal.showLoading()
              
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
                    <div style={{backgroundImage:`url(${mainWallpaper})`}} className="modalstudio-child-img" ></div>
                    <p>Name</p>
                    <p>{item.price}</p>
                </div>
           </div> 
            ))}
        </div>
      </div>
    </Modal>
  );
};
export default DonateStudioModal;