import NavBar from "./componenets/NavBar";
import ManageProducts from "./componenets/ManageProducts";
import WelcomePage from "./componenets/WelcomePage";
import Register from "./componenets/Register";
import MainPage from "./componenets/MainPage";
import CustomerOrder from "./componenets/CustomerOrder";
import NewOrder from "./componenets/NewOrder";
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";


function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/getProducts").then(
      response => response.json()
    ).then(
      responseJson => {
        setData(responseJson)
        console.log(responseJson);
      } 
    )
  }, [])
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/manageproducts' element={<ManageProducts />} />
        <Route path='/neworder' element={<NewOrder />} />
        <Route path='/customerorder' element={<CustomerOrder />} />
      </Routes>     
    </div>
  );
}

export default App;
