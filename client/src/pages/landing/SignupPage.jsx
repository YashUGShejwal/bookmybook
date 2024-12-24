import CustomTextfield from "../../components/CustomTextfield/CustomTextfield.component";
import CustomButton from "../../components/CustomButton/CustomButton.component";
// import { Fade } from "react-reveal";
import { useState, useRef } from "react";
import useMutation from "../../hooks/useMutation";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance";
import { useSnackbar } from "notistack";
const SignupPage = ({ setCurrentState }) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    url: "/signup",
    showSnack: true,
    onSuccess: (res) => setCurrentState("login"),
    onError: (err) => console.log(err),
  });
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (String(data.phone).length != 10) {
      enqueueSnackbar("Phone no not valid!", { variant: "error" });
      return;
    }
    // const token = recaptchaRef.current.getValue();
    // console.log(token);
    // const res = await verifyCapFun(token);
    // console.log(res);
    // if (res.data.data.success) {
      mutate(data);
    // } else {
      // enqueueSnackbar("Something went wrong", {
        // variant: "error",
      // });
    // }
  };

  return (
  
      <div className="w-full flex-1">
        <form
          onSubmit={handleSubmit}
          className="w-3/5 mt-16 flex flex-col gap-4 items-start"
        >
          <CustomTextfield
            label="Username"
            fullWidth
            onChange={handleChange}
            name="name"
            value={data.username}
            required
          />
          <CustomTextfield
            label="Email"
            fullWidth
            onChange={handleChange}
            name="email"
            value={data.email}
            type="email"
            required
          />
          <CustomTextfield
            label="Phone"
            fullWidth
            onChange={handleChange}
            name="phone"
            value={data.phone}
            type="tel"
            required
          />
          <CustomTextfield
            label="Password"
            fullWidth
            type="password"
            onChange={handleChange}
            name="password"
            value={data.password}
            required
          />
          <CustomTextfield
            label="Confirm Password"
            fullWidth
            type="password"
            onChange={handleChange}
            name="cpassword"
            value={data.cpassword}
            required
          />
         
          <CustomButton type="submit" style={{ marginTop: "30px" }}>
            SIGNUP
          </CustomButton>
        </form>
        <div className="mt-3">
          Already a member?{" "}
          <button
            className="text-primary font-semibold cursor-pointer"
            onClick={() => {
              setCurrentState("login");
            }}
          >
            Log in
          </button>
        </div>
      </div>
    
  );
};

export default SignupPage;
