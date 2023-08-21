import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CustomerOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(`${backendURL}/getOrderDetails/${orderId}`)
      .then((response) => {
        setOrder(response.data.order);
        setOrderDetails(response.data.order_details);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  }, [orderId]);

  return (
    <div name="main" className="w-full min-h-screen flex flex-col items-center">
      <div className="mx-auto p-4 text-white">
        <h1 className="text-2xl md:text-4xl">Order Details</h1>
        <p>Order ID: {order.order_id}</p>
        <p>Customer: {order.customer_name}</p>
        <p>Date: {order.date}</p>
      </div>
      <div className="mx-auto overflow-x-auto p-4 max-w-full">
        <div className="table-container">
          <table className="shadow-lg bg-white min-w-full">
            <thead>
              <tr className="bg-blue-100">
                <th className="border text-center px-8 py-4">Product</th>
                <th className="border text-center px-8 py-4">Price per unit</th>
                <th className="border text-center px-8 py-4">Quantity</th>
                <th className="border text-center px-8 py-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((detail, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-center">{detail.product_name}</td>
                  <td className="py-2 px-4 text-center">{detail.price_per_unit}</td>
                  <td className="py-2 px-4 text-center">{detail.quantity}</td>
                  <td className="py-2 px-4 text-center">
                    {detail.price_per_unit * detail.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <Link
          to="/mainpage"
          className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover:scale-115"
        >
          Return
        </Link>
      </div>
    </div>
  )
}

export default CustomerOrder
