import React from "react";
import { Button } from "@mui/material";
import palette from "../../theme/palette";
import { Icon } from "@iconify/react";
import useMutation from "../../hooks/useMutation";
import { addToCartSuccess } from "../../redux/slices/auth.js";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material";

const BookImage = styled("div")(({ url }) => ({
  width: "100%",
  height: "65%",
  backgroundImage: `url('${url}')`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  borderRadius: "10px",
}));

const BookOverview = ({ book }) => {
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    url: "/order/addToCart",
    showSnack: true,
    onSuccess: (data) => {
      // console.log(data)
      dispatch(addToCartSuccess({ cart: data.cart }));
    },
  });

  return (
    <div className="w-full min-h-72 max-h-72 h-72 hover:shadow-shadow1 rounded-lg p-1 flex flex-col hover:scale-105 transition-all duration-100 ease-in">
      {/* <img
        src={
          book?.image ||
          "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1922&q=80"
        }
        className="w-full h-56 max-h-56 bg-cover bg-center rounded-lg"
        alt=""
      /> */}
      <BookImage
        url={
          book?.image ||
          "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1922&q=80"
        }
      />
      <div className="flex-1 flex flex-col p-1 items-start gap-1">
        <div className="text-md font-medium">{book?.name}</div>
        <div className="text-lg font-semibold text-primary">
          Rs {book?.rentPrice || 200}/-
        </div>
        <div className="w-full flex items-center justify-between gap-3">
          <Button
            sx={{
              backgroundColor: palette.primary,
              color: palette.background,
              fontWeight: 600,
              padding: "4px 20px",
              width: "100%",
              "&:hover": {
                backgroundColor: palette.primary,
                color: palette.background,
              },
            }}
            size="small"
            onClick={() => {
              mutate({ bookID: book._id });
            }}
          >
            ADD TO CART
          </Button>
          <Icon
            icon="akar-icons:heart"
            color={palette.primary}
            height="25px"
            width="25px"
          />
        </div>
      </div>
    </div>
  );
};

export default BookOverview;
