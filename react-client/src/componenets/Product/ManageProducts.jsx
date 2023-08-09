import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateProduct from "./UpdateProduct";
import AddProduct from "./AddProduct";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [uoms, setUOMs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    axios
      .get(`${backendURL}/getProducts`)
      .then( response => {
        setProducts(response.data);
      })
      .catch( error => {
        console.error("Error fetching products:", error);
      });

    axios
      .get(`${backendURL}/getUoM`)
      .then( response => {
        setUOMs(response.data);
      })
      .catch( error => {
        console.error("Error fetching UOMs:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch products whenever the products state is updated (e.g., after adding or updating a product)
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    axios
      .get(`${backendURL}/getProducts`)
      .then( response => {
        setProducts(response.data);
      })
      .catch( error => {
        console.error("Error fetching products:", error);
      });
  }, [products]); // Depend on the products state to trigger the effect

  const handleProductUpdated = (updatedProduct) => {
    setProducts( prevProducts =>
      prevProducts.map( product =>
        product.product_id === updatedProduct.product_id ? updatedProduct : product
      )
    );
    setEditMode(false);
    setSelectedProduct(null);
  };

  const handleProductAdded = (newProduct) => {
    setProducts( prevProducts => [...prevProducts, newProduct]);
    setShowAddForm(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditMode(true);
    setShowAddForm(false);
  };

  const handleDelete = (product) => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios
      .delete(`${backendURL}/deleteProduct/${product.product_id}`)
      .then( response => {
        console.log('Product successfully deleted', response);
        setProducts( prevProducts =>
          prevProducts.filter((item) => item.product_id !== product.product_id)
        );
      })
      .catch( error => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div>
      <div name="main" className="w-full h-screen">
        <div className="mx-auto flex flex-row justify-between items-center p-4">
          <div className="text-4xl">Manage Products</div>
          <a href="/showproducts" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115 ">Return</a>
        </div>
      {!editMode && !selectedProduct && !showAddForm && (
          <div>
            <button
              onClick={() => {
                setSelectedProduct(null);
                setEditMode(false);
                setShowAddForm(true);
              }}
              className="bg-[#204e93] text-gray-100 py-2 px-4 mx-4 transition hover: scale-115"
            >
              Add New Product
            </button>
          </div>
        )}
        {(editMode || selectedProduct) ? (
          <UpdateProduct
            product={selectedProduct}
            onCancel={() => {
              setEditMode(false);
              setSelectedProduct(null);
            }}
            onProductUpdated={handleProductUpdated}
          />
        ) : null}

        {!editMode && !selectedProduct && showAddForm && (
          <AddProduct 
            onProductAdded={handleProductAdded} 
            onCancel={() => {
              setShowAddForm(false)
              setSelectedProduct(null);
            }}
          />
        )}

        <div className="mx-auto flex flex-row justify-center items-center p-4">
          <table className="shadow-lg bg-white w-full">
            <thead>
              <tr className="bg-blue-100">
                <th className="border text-center px-8 py-4">Product ID</th>
                <th className="border text-center px-8 py-4">Product</th>
                <th className="border text-center px-8 py-4">UoM</th>
                <th className="border text-center px-8 py-4">Price per Unit</th>
                <th className="border text-center px-8 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map( product => (
                <tr key={ product.product_id }>
                  <td className="py-2 px-4 text-center">{product.product_id}</td>
                  <td className="py-2 px-4 text-center">{product.name}</td>
                  <td className="py-2 px-4 text-center">
                    {uoms.find( uom => uom.uom_id === product.uom_id)?.uom_name}
                  </td>
                  <td className="py-2 px-4 text-center">{product.price_per_unit}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-[#204e93] text-white px-4 py-2 rounded-md hover:bg-[#005ea3] focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageProducts
