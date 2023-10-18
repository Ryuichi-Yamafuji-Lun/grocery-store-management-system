import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const NewOrder = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([{ quantity:0 }]);
  const [customerName, setCustomerName] = useState("");
  const [orderTotals, setOrderTotals] = useState({});

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${backendURL}/getProducts`).then(
      (response) => {
        setProducts(response.data);
      }
    ).catch( error => {
      console.error("Error fetching products:", error);
    });
  }, []);

  const handleProductSelect = (index, productId) => {
    const selectedProduct = products.find( product => product.product_id === parseInt(productId));
    if (selectedProduct) {
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts[index] = {
        product_id: selectedProduct.product_id,
        product_name: selectedProduct.name,
        price_per_unit: selectedProduct.price_per_unit,
        quantity: updatedSelectedProducts[index]?.quantity || 0,
      };
      setSelectedProducts(updatedSelectedProducts);
    }
  };

  const handleQuantityChange = (index, quantity) => {
    const parsedQuantity = Number(quantity);

    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts[index].quantity = isNaN(parsedQuantity) ? 0 : parsedQuantity;
    setSelectedProducts(updatedSelectedProducts);
  };

  const handleAddRow = () => {
    setSelectedProducts([...selectedProducts, {}]);
  };

  const handleOrderSubmit = () => {
      if (customerName && selectedProducts.length > 0) {
        const hasValidQuantity = selectedProducts.some((product) => product.quantity > 0);
      if (!hasValidQuantity) {
        alert("Please select at least one product with a quantity greater than zero.");
        return;
      }
      const order = {
        customer_name: customerName,
        order_details: selectedProducts.map( product => ({
          product_id: product.product_id,
          product_name: product.product_name,
          quantity: product.quantity,
        })),
      };
  
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      axios
        .post(`${backendURL}/insertOrder`, order)
        .then( response => {
          console.log("Response from backend:", response.data);
          window.location.href = "/showorders";
        })
        .catch( error => {
          if (error.response && error.response.data) {
            console.log("Error response data:", error.response.data);
          }
          console.error("Error submitting order:", error);
        });
    }
  };

  useEffect(() => {
    // Calculate the total cost for each product whenever the selected products or their quantities change
    const newOrderTotals = {};
    selectedProducts.forEach( product => {
      newOrderTotals[product.product_id] = product.price_per_unit * product.quantity;
    });
    setOrderTotals(newOrderTotals);
  }, [selectedProducts]);

  return (
    <div name='main' className="w-full min-h-screen flex flex-col items-center xl:pl-6">
      <div className="w-full p-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-2">
          <div className="text-4xl font-bold">
            New Order
          </div>
          <div>
            <input
              className="shadow-lg bg-white w-full p-2 md:p-4"
              type="text"
              placeholder="Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl">
        <div className="table-container w-full p-4">
          <table className="shadow-lg bg-background-second w-full table-fixed">
            <thead>
              <tr className="bg-dark-green text-white">
                <th className="text-center py-1 md:py-2 w-1/4 md:w-auto">Product</th>
                <th className="text-center py-1 md:py-2 w-1/4 md:w-auto">Price per unit</th>
                <th className="text-center py-1 md:py-2 w-1/4 md:w-auto">Quantity</th>
                <th className="text-center py-1 md:py-2 w-1/4 md:w-auto">Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((selectedProduct, index) => (
                <tr key={index}>
                  <td className="border text-center py-1 md:py-2 w-1/4 md:w-auto">
                    <div className="w-full">
                      <select
                        value={selectedProduct.product_id || ""}
                        onChange={(e) => handleProductSelect(index, e.target.value)}
                        className="w-full bg-background-second"
                      >
                        <option value="" disabled>Select</option>
                        {products.map((product) => (
                          <option key={product.product_id} value={product.product_id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="border text-center py-1 md:py-2 w-1/4 md:w-auto">
                    {selectedProduct.price_per_unit || 0}
                  </td>
                  <td className="border text-center py-1 md:py-2 w-1/4 md:w-auto">
                    <div className="w-full">
                      <input
                        type="number"
                        min={0}
                        value={selectedProduct.quantity || ""}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        onBlur={(e) => handleQuantityChange(index, e.target.value)}
                        className="w-full bg-background-second"
                      />
                    </div>
                  </td>
                  <td className="border text-center py-1 md:py-2 w-1/4 md:w-auto">
                    {orderTotals[selectedProduct.product_id] || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center p-4">
          <Link to="/showorders" className="bg-return-color py-2 px-4 rounded-md transition hover:bg-gray-400 hover:scale-105 focus:outline-none">
            Return
          </Link>
          <div>
            <button
              onClick={handleAddRow}
              className="bg-dark-green text-white py-2 px-3 mb-2 md:mb-0 mx-2 rounded-md transition hover:scale-105"
            >
              Add Row
            </button>
            <button
              onClick={handleOrderSubmit}
              className="bg-dark-green text-white py-2 px-3 mx-2 rounded-md transition hover:scale-105"
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )  
}

export default NewOrder
