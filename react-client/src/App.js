import NavBar from "./componenets/NavBar";
import LoginForm from "./componenets/LoginForm";
import ManageProducts from "./componenets/ManageProducts";
import WelcomePage from "./componenets/WelcomePage";
import Register from "./componenets/Register";
import MainPage from "./componenets/MainPage";
import CustomerOrder from "./componenets/CustomerOrder";
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="page">
      <NavBar />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<Register />} />
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/manageproducts' element={<ManageProducts />} />
        <Route path='/customerorder' element={<CustomerOrder />} />
      </Routes>     
    </div>
  );
}

export default App;
