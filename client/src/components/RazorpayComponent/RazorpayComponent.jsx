import React from 'react'

const RazorpayComponent = () => {

    const Pay = ()=>{

        var options = {
            "key": "rzp_live_5T33DJq30KphZb", // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": "order_KTkko8LMdSBFcS", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:5000/order/pay",
            "prefill": {
                "name": "rew w",
                "email": "rew@example.com",
                "contact": "8080851282"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        
    }

    

  return (
    <>
    
    <button className='p-2 rounded border-2' onClick={()=>Pay()}>Pay Now</button>
    </>
  )
}

export default RazorpayComponent