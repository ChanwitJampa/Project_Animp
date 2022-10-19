import { useState, useEffect } from "react";
import "./index.scss";
import Modal from "@mui/material/Modal";
import "./index.scss";
import PaymentForm from "../../payment/PaymentForm";
import Grid from '@mui/material/Grid'
import { Elements, } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';    

const PaymaentModal = (props)=>{
    const stripePromise = loadStripe("pk_test_51LuGomLNgThWAHdrmtmYnzkwfL4oVwrHt7zfX06XYiQ1qHehbqx9DaOXhMBMRgXwam0hCORTDHpqqVlRTYziOkT1004g7gMtlH");
    const { open, onClose } = props;
    return(    
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalpayment-modalStyles">
          <div className="modalpayment-header">
              <button onClick={onClose}>X</button>
          </div>
          <h1>เติมเงิน</h1>
            <div>
            {stripePromise
          ? <Elements stripe={stripePromise}>
              <Grid container spacing={3}>
                <PaymentForm />
                </Grid>
              </Elements>
                : null
          }
        </div>
        </div>
      </Modal>)
}
export default PaymaentModal