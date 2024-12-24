import CustomTextfield from "../../components/CustomTextfield/CustomTextfield.component";
import CustomButton from "../../components/CustomButton/CustomButton.component";
// import { Fade } from "react-reveal";

const IntroPage = ({ setCurrentState }) => {
  return (
    // <Fade right>
      <div className="w-full flex-1">
        <div className="mt-12 text-2xl text-surface2 w-4/5">
          Best place on web to rent the best books in the world
        </div>
        <CustomButton
          size="large"
          style={{ marginTop: "50px" }}
          onClick={() => {
            setCurrentState("signup");
          }}
        >
          BECOME A MEMBER
        </CustomButton>
        <div className="mt-3">
          Already a member?{" "}
          <span className="text-primary font-semibold cursor-pointer">
            Login
          </span>
        </div>
      </div>
    // </Fade>
  );
};

export default IntroPage;
