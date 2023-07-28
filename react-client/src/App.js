import NavBar from "./componenets/NavBar";
import ManageProducts from "./componenets/Product/ShowProducts";
import AddProduct from "./componenets/Product/AddProduct";
import WelcomePage from "./componenets/WelcomePage";
import Register from "./componenets/Login/Register";
import MainPage from "./componenets/MainPage";
import CustomerOrder from "./componenets/Orders/CustomerOrder";
import NewOrder from "./componenets/Orders/NewOrder";
import About from "./componenets/About";
import { Routes, Route } from 'react-router-dom';



function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/manageproducts' element={<ManageProducts />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/neworder' element={<NewOrder />} />
        <Route path='/customerorder' element={<CustomerOrder />} />
        <Route path='/about' element={<About />} />
      </Routes>     
    </div>
  );
}

export default App;
