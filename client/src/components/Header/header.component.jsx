import React from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import * as S from "./header.styles";
import {
 
  Typography,
  Popover,
  Button,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSession } from "../../utils/jwt";
import { logoutSuccess } from "../../redux/slices/auth";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    setSession(null);
    dispatch(logoutSuccess());
    navigate("/");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-full h-14 bg-primary flex items-center px-8 justify-between">
      <Link to={user.isAdmin ? "/admin/dashboard" : "/user/home"}>
        <div className="logo text-xl font-semibold">BookMyBook</div>
      </Link>
      <div className="flex gap-8">
        <Icon
          icon="ant-design:heart-filled"
          width="30px"
          height="30px"
          color="white"
        />
        <Link to="/user/cart">
          <Icon
            icon="eva:shopping-cart-fill"
            width="30px"
            height="30px"
            color="white"
          />
        </Link>

        <Icon
          icon="bxs:user-circle"
          width="30px"
          height="30px"
          color="white"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <S.HeaderMenu>
            <S.HeaderItem
              onClick={() => {
                if (user?.isAdmin) {
                  navigate("/admin/profile");
                } else {
                  navigate("/user/dashboard");
                }
              }}
            >
              <Icon icon="bx:user-circle" />
              <Typography>PROFILE</Typography>
            </S.HeaderItem>

            <S.HeaderItem onClick={handleLogout}>
              <Icon icon="ant-design:logout-outlined" />
              <Typography>LOGOUT</Typography>
            </S.HeaderItem>
          </S.HeaderMenu>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
