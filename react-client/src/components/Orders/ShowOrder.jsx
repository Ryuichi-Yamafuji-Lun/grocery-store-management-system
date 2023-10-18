import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const ShowOrder = () => {
  const [orders, setOrders] = useState([]);
  const [orderTotals, setOrderTotals] = useState({});
  const [ordersToShow, setOrdersToShow] = useState(10);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${backendURL}/getAllOrders`).then(
      response => {
        setOrders(response.data);
        // Getting order total
        const totals = {};
        response.data.forEach(order => {
          totals[order.order_id] = order.total;
        });
        setOrderTotals(totals);
      }
    ).catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);

  const handleDeleteOrder = (order_id) => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios
      .delete(`${backendURL}/deleteOrder/${order_id}`)
      .then(response => {
        console.log("Order deleted successfully", response);
        // Refresh the order list after successful deletion
        axios
          .get(`${backendURL}/getAllOrders`)
          .then(response => {
            setOrders(response.data);
            const totals = {};
            response.data.forEach((order) => {
              totals[order.order_id] = order.total;
            });
            setOrderTotals(totals);
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      })
      .catch(error => {
        console.error("Error deleting order:", error);
      });
  };

  const loadMoreOrders = () => {
    setOrdersToShow(prevOrdersToShow => prevOrdersToShow + 10);
  };

  return (
    <div name='main' className="w-full min-h-screen flex flex-col items-center xl:pl-6">
      <div className="w-full p-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-2">
          <div className="text-4xl font-bold">
            Orders
          </div>
          <div className="flex space-x-2">
            <Link to="/neworder" className="bg-dark-green text-white py-2 px-3 rounded-md transition hover:scale-105">New Orders</Link>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        {orders.length > 0 ? (
          <div className="max-w-screen-xl mx-auto">
            <div className="overflow-x-auto">
              <table className="shadow-lg bg-background-second min-w-full">
                {/* Table header */}
                <thead>
                  <tr className="bg-dark-green text-white">
                    <th className="text-center px-4 py-2"></th>
                    <th className="text-center px-8 py-4">Date</th>
                    <th className="text-center px-8 py-4">Order #</th>
                    <th className="text-center px-8 py-4">Customer</th>
                    <th className="text-center px-8 py-4">Total Cost</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {orders.slice(0, ordersToShow).map(order => (
                    <tr key={order.order_id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => handleDeleteOrder(order.order_id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
                        >
                          <FaTimes />
                        </button>
                      </td>
                      <td className="py-2 px-4 text-center">{order.date}</td>
                      <td className="py-2 px-4 text-center">{order.order_id}</td>
                      <td className="py-2 px-4 text-center text-dark-green underline hover:text-light-green">
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
          </div>
        ) : (
          <div className="mx-auto p-4 items-center">No orders available.</div>
        )}

        {ordersToShow < orders.length && (
          <div className="w-full text-center p-4">
            <button onClick={loadMoreOrders} className="bg-dark-green text-white py-2 px-3 rounded-md transition hover:scale-105">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowOrder