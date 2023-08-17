import { Routes, Route } from 'react-router-dom';

import NavBar from "./components/NavBar";
import ManageProducts from "./components/Product/ManageProducts";
import AddProduct from "./components/Product/ManageProducts";
import WelcomePage from "./components/WelcomePage";
import MainPage from "./components/MainPage";
import CustomerOrder from "./components/Orders/CustomerOrder";
import NewOrder from "./components/Orders/NewOrder";
import About from "./components/About";
import ShowProducts from "./components/Product/ShowProducts";

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/showproducts' element={<ShowProducts />} />
        <Route path='/manageproducts' element={<ManageProducts />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/neworder' element={<NewOrder />} />
        <Route path='/customerorder/:orderId' element={<CustomerOrder />} />
        <Route path='/about' element={<About />} />
      </Routes>      
    </div>
  )
}

export default App
