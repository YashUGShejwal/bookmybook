import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import CustomTextfield from "../../components/CustomTextfield/CustomTextfield.component";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import useMutation from "../../hooks/useMutation";
import axiosInstance from '../../utils/axiosInstance';
import axios from "axios";
const UserOrderSummary = () => {
  const [orderSummary, setOrderSummary] = useState(null);
  const [totalSum, setTotalSum] = useState(0);

  const { id } = useParams();

  const { fetchData } = useQuery({
    url: `/order/orderSummary/${id}`,
    showSnack: false,
    onSuccess: (data) => {
      console.log(data, "lolol");
      setOrderSummary(data.orderDetails);
      data.orderDetails.books.forEach((a) =>
        setTotalSum((t) => Number(t) + Number(a.rentPrice))
      );
    },
  });

  const handlePayment = async(amount)=>{
    amount*=100;
    const response = await axiosInstance.post('/order/create',{
      amount
    })

    console.log(response)

    const finalAmt = response.data.amount*100

    var options = {
      "key": "rzp_live_5T33DJq30KphZb", // Enter the Key ID generated from the Dashboard
      "amount": finalAmt, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Book my Book",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "http://localhost:5001/order/pay",
      "prefill": {
          "name": "Rew W",
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

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-3xl font-semibold px-3">Your Order Summary</div>
      <div className="p-3 w-4/5 shadow-shadow1 mt-5 rounded-lg flex gap-4">
        <div className="flex-1 border-r-2 border-primary px-4">
          <div className="text-lg font-semibold">BOOKS:</div>
          <div className="w-full flex flex-col gap-2">
            {orderSummary?.books.map((book) => (
              <div className="w-full border-b-2 border-primary p-2 flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1633477189729-9290b3261d0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1922&q=80"
                  alt=""
                  className="h-20 w-20 rounded-lg"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="text-lg font-medium">
                      {book?.name || "TEST BOOK"}
                    </div>
                    <div className="text-sm text-surface2">
                      - by {book?.author || "Anonymous"}
                    </div>
                  </div>
                  <div className="tet-xl font-semibold text-primary">
                    Rs {book?.rentPrice || 0}/-
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold">ADDRESS:</div>
          <div className="my-3">
            <div>{orderSummary?.Address?.address}</div>
            <div>
              {orderSummary?.Address?.city},{orderSummary?.Address?.state}
            </div>
            <div>
              <span>Pincode:</span>{" "}
              <span>{orderSummary?.Address?.pincode}</span>
            </div>
          </div>
          <div className="text-lg font-semibold">SUMMARY:</div>
          <div className="my-3">
            <div className="flex gap-3 items-center">
              <span className="text-lg font-semibold">Order total:</span>
              <span>Rs {totalSum}/-</span>
            </div>
          </div>
          <CustomButton onClick={()=>handlePayment(totalSum)} >PAY FOR ORDER</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default UserOrderSummary;
