import { Routes, Route } from 'react-router-dom';

import NavBar from "./componenets/NavBar";
import ManageProducts from "./componenets/Product/ManageProducts";
import AddProduct from "./componenets/Product/ManageProducts";
import WelcomePage from "./componenets/WelcomePage";
import MainPage from "./componenets/MainPage";
import CustomerOrder from "./componenets/Orders/CustomerOrder";
import NewOrder from "./componenets/Orders/NewOrder";
import About from "./componenets/About";
import ShowProducts from "./componenets/Product/ShowProducts";
import AudioPlayer from './componenets/AudioPlayer';

function App() {

  return (
    <div>
      <AudioPlayer /> 
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
