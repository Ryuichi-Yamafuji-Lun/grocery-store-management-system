import { Routes, Route } from 'react-router-dom';
// Layouts
import MainLayout from './components/Layouts/MainLayout';
import WelcomeLayout from './components/Layouts/WelcomeLayout';
// Pages
import WelcomePage from "./components/WelcomePage";
import Dashboard from './components/Dashboard';
import ShowProducts from "./components/Product/ShowProducts";
import ManageProducts from "./components/Product/ManageProducts";
import AddProduct from "./components/Product/ManageProducts";
import ShowOrder from './components/Orders/ShowOrder';
import CustomerOrder from "./components/Orders/CustomerOrder";
import NewOrder from "./components/Orders/NewOrder";
import About from "./components/About";


function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeLayout><WelcomePage /></WelcomeLayout>} />
      <Route path="/mainpage" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/showorders" element={<MainLayout><ShowOrder /></MainLayout>} />
      <Route path="/neworder" element={<MainLayout><NewOrder /></MainLayout>} />
      <Route path="/customerorder/:orderId" element={<MainLayout><CustomerOrder /></MainLayout>} />
      <Route path="/showproducts" element={<MainLayout><ShowProducts /></MainLayout>} />
      <Route path="/manageproducts" element={<MainLayout><ManageProducts /></MainLayout>} />
      <Route path="/addproduct" element={<MainLayout><AddProduct /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
    </Routes>
  );
}

export default App
