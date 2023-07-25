import { useState, useEffect } from "react";
import axios from "axios";

const MainPage = () => {
  const [data, setData] = useState([{}])
  
  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${backendURL}/getAllOrders`).then(
      response => {
        setData(response.data)
      }
    ).catch(error => {
      console.error("Error fetching data:", error);
    });
  }, [])
  

  return (
    <div name='main' className="w-full h-screen">
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <div className="text-4xl">
          Orders
        </div>
        <div>
          <a href="/manageproducts" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115 ">Manage Products</a>
          <a href="/neworder" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115 ">New Orders</a>
        </div>        
      </div>
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
            {data.map(data => (
              <tr key = { data.order_id }>
                <td className="py-2 px-4 text-center">{data.datetime}</td>
                <td className="py-2 px-4 text-center">{data.order_id}</td>
                <td className="py-2 px-4 text-center">{data.customer_name}</td>
                <td className="py-2 px-4 text-center">{data.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MainPage