import React, { useState, useEffect } from "react";
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
          window.location.href = "/mainpage";
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
    <div name='main' className="w-full h-screen">
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <div className="text-4xl">
          New Order
        </div>
        <div>
          <input
            className="shadow-lg bg-white w-full p-4"
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
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
            {selectedProducts.map((selectedProduct, index) => (
              <tr key={index}>
                <td className="py-2 px-4 text-center">
                  <select
                    value={selectedProduct.product_id || ""}
                    onChange={(e) => handleProductSelect(index, e.target.value)}
                  >
                    <option value="" disabled>Select a product</option>
                    {products.map((product) => (
                      <option key={product.product_id} value={product.product_id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-2 px-4 text-center">
                  {selectedProduct.price_per_unit || 0}
                </td>
                <td className="py-2 px-4 text-center">
                  <input
                    type="number"
                    min={0}
                    value={selectedProduct.quantity || ""}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    onBlur={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 text-center">
                  {orderTotals[selectedProduct.product_id] || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <button onClick={handleAddRow} className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover:scale-115">
          Add Row
        </button>
        <button onClick={handleOrderSubmit} className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover:scale-115">
          Submit Order
        </button>
      </div>
    </div>
  )
}

export default NewOrder
