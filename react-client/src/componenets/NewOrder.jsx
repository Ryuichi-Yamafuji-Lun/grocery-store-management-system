import React, { useState, useEffect } from "react";
import axios from "axios";

const NewOrder = () => {
  const [orders, setOrders] = useState([{}])
  
  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${backendURL}/getAllOrders`).then(
      response => {
        setOrders(response.data)
      }
    ).catch( error => {
      console.error("Error fetching data:", error);
    });
  }, []);

  return (
    <div name='main' className="w-full h-screen">
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <div className="text-4xl">
          New Order
        </div>      
      </div>
      <div className="mx-auto flex flex-row justify-center items-center p-4">
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
            {orders.map( order => (
                // Necessary React Fragment to access array in order_detail
                <React.Fragment key={order.order_id}>
                {order.order_details &&
                  order.order_details.map( orderDetail => (
                    <tr key={orderDetail.order_id}>
                      <td className="py-2 px-4 text-center">{orderDetail.product_name}</td>
                      <td className="py-2 px-4 text-center">{orderDetail.price_per_unit}</td>
                      <td className="py-2 px-4 text-center">{orderDetail.quantity}</td>
                      <td className="py-2 px-4 text-center">{orderDetail.total_price}</td>
                    </tr>
                  ))}
                {!order.order_details && (
                  <tr>
                    <td colSpan="4" className="text-center">No order details available.</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NewOrder
