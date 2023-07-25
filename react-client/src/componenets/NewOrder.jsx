import { useState, useEffect } from "react";
import axios from "axios";

const NewOrder = () => {
  const [data, setData] = useState([{}])
  
  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${backendURL}/getProducts`).then(
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
            {data.map(data => (
              <tr key = { data.product_id }>
                <td className="py-2 px-4 text-center">{data.name}</td>
                <td className="py-2 px-4 text-center">{data.uom_name}</td>
                <td className="py-2 px-4 text-center">{data.price_per_unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NewOrder
