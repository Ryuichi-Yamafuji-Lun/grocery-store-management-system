import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa"
import { IoMdHome, IoIosListBox } from "react-icons/io";
import { BsFillQuestionSquareFill, BsArrowLeftShort } from "react-icons/bs";

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 z-40 w-auto h-screen transition-transform -translate-x-full md:translate-x-0 bg-dark-green">
      <div className="h-full px-4 py-4 overflow-y-auto shadow-lg">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/mainpage" className="flex items-center p-2 text-white rounded-lg hover:backdrop-blur-3xl hover:bg-slate-800/50 hover:shadow-[inset_0px_1px_0px_0px_rgba(148,163,184,0.1)] group">
              <IoMdHome className="w-5 h-5 text-white transition duration-75" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/showproducts" className="flex items-center p-2 text-white rounded-lg hover:backdrop-blur-3xl hover:bg-slate-800/50 hover:shadow-[inset_0px_1px_0px_0px_rgba(148,163,184,0.1)] group">
              <IoIosListBox className="w-5 h-5 text-white transition duration-75 " />
              <span className="ml-3">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/mainpage" className="flex items-center p-2 text-white rounded-lg hover:backdrop-blur-3xl hover:bg-slate-800/50 hover:shadow-[inset_0px_1px_0px_0px_rgba(148,163,184,0.1)] group">
              <FaShoppingCart className="w-5 h-5 text-white transition duration-75" />
              <span className="ml-3">Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="flex items-center p-2 text-white rounded-lg hover:backdrop-blur-3xl hover:bg-slate-800/50 hover:shadow-[inset_0px_1px_0px_0px_rgba(148,163,184,0.1)] group">
              <BsFillQuestionSquareFill className="w-5 h-5 text-white transition duration-75" />
              <span className="ml-3">About</span>
            </Link>
          </li>
        </ul>
        <div className="mt-auto">
          <Link to="/" className="flex items-center p-2 text-white rounded-lg hover:backdrop-blur-3xl hover:bg-slate-800/50 hover:shadow-[inset_0px_1px_0px_0px_rgba(148,163,184,0.1)] group">
            <BsArrowLeftShort className="w-5 h-5 text-white transition duration-75" />
            <span className="ml-3">Exit</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
