import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [orderTotals, setOrderTotals] = useState({});
  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState(5);
  const [ordersToShow, setOrdersToShow] = useState(5);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    axios.get(`${backendURL}/getAllOrders`).then((response) => {
      setOrders(response.data.slice(0, ordersToShow));
      // Getting order total
      const totals = {};
      response.data.slice(0, ordersToShow).forEach((order) => {
        totals[order.order_id] = order.total;
      });
      setOrderTotals(totals);
    }).catch((error) => {
      console.error("Error fetching recent orders:", error);
    });

    axios.get(`${backendURL}/getProducts`).then((response) => {
      setProducts(response.data.slice(0, productsToShow));
    }).catch((error) => {
      console.error("Error fetching recent products:", error);
    });
  }, [productsToShow, ordersToShow]);

  return (
    <div name="main" className="w-full min-h-screen flex flex-col items-center xl:pl-6">
        <div className="w-full pt-4">
            <div className="max-w-screen-xl mx-auto flex flex-col text-center">
                <div className="text-4xl">Dashboard</div>
            </div>
        </div>

        <div className="w-full p-4">
        <div className="max-w-screen-xl mx-auto overflow-x-auto">
            <div className="text-4xl pb-2"> Orders </div>
            <table className="shadow-lg bg-background-second min-w-full">
            <thead>
                <tr className="bg-dark-green text-white">
                <th className="text-center px-8 py-4">Customer</th>
                <th className="text-center px-8 py-4">Date</th>
                <th className="text-center px-8 py-4">Total Cost</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                <tr key={order.order_id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 text-center">{order.customer_name}</td>
                    <td className="py-2 px-4 text-center">{order.date}</td>
                    <td className="py-2 px-4 text-center">{orderTotals[order.order_id]}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
        <div className="w-full p-4">
            <div className="max-w-screen-xl mx-auto overflow-x-auto">
                <div className="text-4xl pb-2"> Products </div>
                <table className="shadow-lg bg-background-second min-w-full">
                    <thead>
                        <tr className="bg-dark-green text-white">
                            <th className="text-center px-4 py-2">Name</th>
                            <th className="text-center px-4 py-2">Price per Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                        <tr key={product.product_id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 text-center">{product.name}</td>
                            <td className="py-2 px-4 text-center">{product.price_per_unit}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default Dashboard
