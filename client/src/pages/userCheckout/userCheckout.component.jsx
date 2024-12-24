import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import CustomTextfield from "../../components/CustomTextfield/CustomTextfield.component";
import useMutation from "../../hooks/useMutation";
import { useNavigate } from "react-router-dom";

const UserCheckout = () => {
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [formAddress, setFormAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const { mutate } = useMutation({
    url: "/order/checkout",
    showSnack: true,
    onSuccess: (data) => {
      console.log(data, "lolol");
      navigate(`/user/orderSummary/${data.orderID}`);
    },
  });

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleInputChange = (e) => {
    setFormAddress({
      ...formAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = () => {
    if (address != null) {
      const addr = user.Addresses.find((a) => a._id == address);
      mutate(addr);
      console.log(addr);
    } else {
      mutate(formAddress);
    }
    // mutate(formAddress);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-3xl font-semibold px-3">Checkout your cart</div>
      <div className="p-3 w-4/5 shadow-shadow1 mt-5 rounded-lg">
        <div className="text-xl font-semibold mb-5">Set delivery address:</div>
        <FormControl fullWidth variant="standard">
          <InputLabel
            onChange={handleChange}
            name="address"
            id="demo-simple-select-label"
          >
            Address
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={address}
            name="address"
            label="Address"
            onChange={handleChange}
          >
            {user?.Addresses.map((a) => (
              <MenuItem value={a._id}>
                {a.address} - {a.city} - {a.state} - {a.pincode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="text-md font-bold my-3">OR</div>
        <div className="w-3/5 flex flex-col gap-2 mb-6">
          <CustomTextfield
            label="Address"
            fullWidth
            name="address"
            value={formAddress.address}
            onChange={handleInputChange}
          />
          <CustomTextfield
            label="City"
            fullWidth
            name="city"
            value={formAddress.city}
            onChange={handleInputChange}
          />
          <CustomTextfield
            label="State"
            fullWidth
            name="state"
            value={formAddress.state}
            onChange={handleInputChange}
          />
          <CustomTextfield
            label="Pincode"
            fullWidth
            name="pincode"
            value={formAddress.pincode}
            onChange={handleInputChange}
          />
        </div>
        <CustomButton onClick={handleAddAddress}>CHECKOUT</CustomButton>
      </div>
    </div>
  );
};

export default UserCheckout;
