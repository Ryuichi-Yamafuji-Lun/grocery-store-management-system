import React, { useState, useEffect } from "react";
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
      .then( response => {
        setOrder(response.data.order);
        setOrderDetails(response.data.order_details);
      })
      .catch( error => {
        console.error("Error fetching order details:", error);
      });
  }, [orderId]);

  return (
    <div className="w-full h-screen">
      <div className="mx-auto p-4">
        <h1 className="text-4xl">Order Details</h1>
        <p>Order ID: { order.order_id }</p>
        <p>Customer: { order.customer_name }</p>
        <p>Date: { order.date }</p>
      </div>
      <div className="mx-auto flex-row justify-center items-center p-4">
        <table className="shadow-lg bg-white w-full">
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
              <tr key={ index }>
                <td className="py-2 px-4 text-center">{ detail.product_name }</td>
                <td className="py-2 px-4 text-center">
                  { detail.price_per_unit }
                </td>
                <td className="py-2 px-4 text-center">{ detail.quantity }</td>
                <td className="py-2 px-4 text-center">
                  { detail.price_per_unit * detail.quantity }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <Link to="/mainpage" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Return
        </Link>
      </div>
    </div>
  )
}

export default CustomerOrder