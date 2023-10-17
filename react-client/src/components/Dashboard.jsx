import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [orderTotals, setOrderTotals] = useState({});
    const [products, setProducts] = useState([]);
    const [productsToShow, setProductsToShow] = useState(10);
    const [ordersToShow, setOrdersToShow] = useState(10);


    useEffect(() => {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        axios.get(`${backendURL}/getAllOrders`).then(
          response => {
            setOrders(response.data);
            //Getting order total
            const totals = {};
            response.data.forEach( order => {
              totals[order.order_id] = order.total;
            });
            setOrderTotals(totals);
          }
        ).catch( error => {
          console.error("Error fetching data:", error);
        });
      }, []);

    useEffect(() => {
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      axios.get(`${backendURL}/getProducts`)
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }, []);

  return (
    <div name='main' className="w-full min-h-screen xl:pl-10">
        <div className="w-full">
            <div className="text-2xl md:text-4xl text-gray-800">
                Dashboard
            </div>
        </div>

        {/* Most recent orders */}
        <div>
            Table
        </div>

        {/* Most recent products */}
        <div>
            Table
        </div>
    </div>
  )
}

export default Dashboard