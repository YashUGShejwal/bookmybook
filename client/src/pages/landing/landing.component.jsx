import React, { useState, useEffect } from "react";
// import Lottie from "react-lottie";
// import LandingPageLottie from "../../assets/landing.json";
import IntroPage from "./IntroPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

const Landing = () => {
  const [currentState, setCurrentState] = useState("signup");
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: LandingPageLottie,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  let page;

  if (currentState == "login") {
    page = <LoginPage setCurrentState={setCurrentState} />;
  } else if (currentState == "signup") {
    page = <SignupPage setCurrentState={setCurrentState} />;
  } else {
    page = <IntroPage setCurrentState={setCurrentState} />;
  }

  useEffect(()=>{
    if(isLoggedIn){
      if(user.isAdmin){
        navigate("/admin/dashboard");
      }else if(user.isDeliveryBoy){
        navigate("/delivery/dashboard");
      }else{
        navigate("/user/home")
      }
    }
  },[isLoggedIn])

  return (
    <div className="w-screen h-screen bg-background flex box-border">
      <div className="h-full flex-1 bg-primary p-8 flex flex-col">
        <h1 className="text-3xl font-bold ">BookMyBook</h1>
        <div className="w-full flex-1">
          <div className="w-4/5 h-full">
            {/* <Lottie options={defaultOptions} width="100%" height="100%" /> */}
          </div>
        </div>
      </div>
      <div className="h-full flex-1 p-8 px-14 flex flex-col">
        <h1 className="text-7xl font-medium w-4/5">
          Welcome to{" "}
          <span className="text-primary font-semibold">BookMyBook</span>{" "}
        </h1>
        {page}
      </div>
    </div>
  );
};

export default Landing;
