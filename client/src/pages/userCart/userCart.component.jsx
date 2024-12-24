import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import useMutation from "../../hooks/useMutation";
import { removeFromCartSuccess } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const { cart } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    url: "/order/removeFromCart",
    showSnack: true,
    onSuccess: (data) => {
      dispatch(removeFromCartSuccess({ cart: data.cart }));
    },
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-3xl font-semibold px-3">My Cart</div>
      <div className="flex w-full flex-">
        <div className="mt-5 w-3/5 p-3 flex flex-col gap-4">
          {cart?.items?.map((book) => (
            <div className="w-3/4 shadow-shadow1 p-2 rounded-lg flex gap-3">
              <img
                src={
                  book?.image ||
                  "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1922&q=80"
                }
                alt=""
                className="h-32 w-32 rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-medium">
                    {book?.name || "TEST BOOK"}
                  </div>
                  <div className="text-md text-surface2">
                    - by {book?.author || "Anononymous"}
                  </div>
                </div>
                <div className="tet-xl font-semibold text-primary">
                  Rs {book?.rentPrice || 100} /-
                </div>
                <div className="flex gap-3">
                  <CustomButton size="small">VIEW BOOK</CustomButton>
                  <CustomButton
                    size="small"
                    style={{ backgroundColor: "#d11a2a" }}
                    onClick={() => {
                      mutate({ bookID: book?._id });
                    }}
                  >
                    REMOVE BOOK
                  </CustomButton>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex-1 w-2/5">
          <div className="w-3/5 h-fit p-3 shadow-shadow1 rounded-lg flex flex-col gap-3">
            <div className="text-2xl font-semibold">Cart summary:</div>
            <div>
              <div className="flex gap-2 items-center">
                <span className="text-lg font-medium">Items:</span>
                <span>{cart?.items?.length || 0}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-lg font-medium">Cart total:</span>
                <span>Rs {cart.total || 0}/-</span>
              </div>
            </div>
            <CustomButton onClick={()=>{
              navigate("/user/checkout")
            }} >PROCEES TO CHECKOUT</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
