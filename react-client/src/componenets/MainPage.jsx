import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const MainPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderTotals, setOrderTotals] = useState({});
  
  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${backendURL}/getAllOrders`).then(
      response => {
        setOrders(response.data);
        //Getting order total
        const totals = {};
        response.data.forEach((order) => {
          totals[order.order_id] = order.total;
        });
        setOrderTotals(totals);
      }
    ).catch( error => {
      console.error("Error fetching data:", error);
    });
  }, []);
  

  return (
    <div name='main' className="w-full h-screen">
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <div className="text-4xl">
          Orders
        </div>
        <div>
          <a href="/showproducts" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115 ">Products</a>
          <a href="/neworder" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115 ">New Orders</a>
        </div>        
      </div>
      {orders.length > 0 ? (
        <div className="mx-auto flex flex-row justify-center items-center p-4">
          <table className="shadow-lg bg-white w-full">
            <thead>
              <tr className="bg-blue-100">
                <th className="border text-center px-8 py-4">Date</th>
                <th className="border text-center px-8 py-4">Order #</th>
                <th className="border text-center px-8 py-4">Customer</th>
                <th className="border text-center px-8 py-4">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {orders.map( order => (
                <tr key={ order.order_id }>
                  <td className="py-2 px-4 text-center">{order.date}</td>
                  <td className="py-2 px-4 text-center">{order.order_id}</td>
                  <td className="py-2 px-4 text-center">
                    <Link to={`/customerOrder/${order.order_id}`}>
                      {order.customer_name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 text-center">{orderTotals[order.order_id]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mx-auto p-4 text-center">No orders available.</div>
      )}
    </div>
  )
}

export default MainPage