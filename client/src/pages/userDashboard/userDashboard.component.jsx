import React from "react";
import useQuery from "../../hooks/useQuery";
import { useEffect, useState } from "react";


const UserDashboard = () => {
  const { fetchData, isLoading, response } = useQuery({
    url: "/order/getRentals",
    showSnack: false,
    onSuccess: (data) => {
      console.log(data, "hehe");
    },
  });

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full h-full">
      <div className="text-2xl font-semibold px-3">My rentals</div>
      <div className="w-3/5 flex flex-col gap-2 p-3">
        {isLoading ? (
          <div>loading...</div>
        ) : (
          response?.data.rentals.map((rental) => (
            <div className="w-full shadow-shadow1  rounded-lg p-4 flex gap-3">
              <div className="w-2/6">
                <div className="text-lg font-semibold">Books:</div>
                <div className="w-full flex flex-col gap-2">
                  {rental?.order?.books.map((book) => (
                    <div className="w-4/5 flex gap-5">
                      <img
                        src={
                          book.image ||
                          "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1922&q=80"
                        }
                        alt=""
                        className="w-16 h-16 rounded-lg "
                      />
                      <div>
                        <div className="text-md font-medium">
                          {book.name || "test book"}
                        </div>
                        <div className="text-sm text-surface2">
                          -by {book.author || "Anonymous"}
                        </div>
                        <div className="text-primary text-md font-medium">
                          Rs {book.rentPrice || 0}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-2/6">
                <div className="text-lg font-semibold">Address:</div>
                <div className="w-full flex flex-col gap-2">
                  <div className="my-3">
                    <div>{rental.order?.Address?.address}</div>
                    <div>
                      {rental.order?.Address?.city},
                      {rental.order?.Address?.state}
                    </div>
                    <div>
                      <span>Pincode:</span>{" "}
                      <span>{rental.order?.Address?.pincode}</span>
                    </div>
                  </div>
                </div>
                {rental.isActive ? (
                  <div className="w-fit h-fit px-3 py-0 text-sm text-green-500 font-bold border-green-500 border-2 rounded-full">
                    ACTIVE
                  </div>
                ) : null}
              </div>
              <div className="w-2/6">
                
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
