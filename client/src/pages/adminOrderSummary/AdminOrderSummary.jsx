import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMutation from '../../hooks/useMutation';
import QRCode from 'react-qr-code';
const AdminOrderSummary = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [total, setTotal] = useState();
  const { mutate, isLoading } = useMutation({
    url: '/order/orderSummary',
    showSnack: false,
    onSuccess: (res) => {
      setData(res.orderDetails);
      let calulate = 0;
      const calculatedTotal = res?.orderDetails.books.map((book) => {
        calulate += Number(book.rentPrice);
      });
      console.log(res.orderDetails);
      setTotal(calulate);
    },
  });

  useEffect(() => {
    mutate({ orderID: id });
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="text-3xl font-semibold px-3">Your Order Summary</div>
        <div className="p-3 w-4/5 shadow-shadow1 mt-5 rounded-lg flex gap-4">
          <div className="flex-1 border-r-2 border-primary px-4">
            <div className="text-lg font-semibold">BOOKS:</div>
            <div className="w-full flex flex-col gap-2">
              {data?.books.map((item) => (
                <div className="w-full border-b-2 border-primary p-2 flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1633477189729-9290b3261d0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1922&q=80"
                    alt=""
                    className="h-20 w-20 rounded-lg"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="text-lg font-medium">{item?.name}</div>
                      <div className="text-sm text-surface2">
                        - By {item?.author}
                      </div>
                    </div>
                    <div className="tet-xl font-semibold text-primary">
                      Rs {item?.rentPrice}/-
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold">ADDRESS:</div>
            <div className="my-3">
              <div>{data?.Address.address}</div>
              <div>
                {data?.Address.city},{data?.Address.state}
              </div>
              <div>
                <span>Pincode:</span> <span>{data?.Address.pincode}</span>
              </div>
            </div>
            <div className="text-lg font-semibold">SUMMARY:</div>
            <div className="my-3">
              <div className="flex gap-3 items-center">
                <span className="text-lg font-semibold">Order total:</span>
                <span>Rs {total}/-</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <QRCode size={200} value={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderSummary;
