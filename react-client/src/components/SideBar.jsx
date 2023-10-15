import {Link} from 'react-router-dom';

import { FaShoppingCart } from "react-icons/fa"
import { IoMdHome,IoIosListBox } from "react-icons/io";
import { BsFillQuestionSquareFill, BsArrowLeftShort } from "react-icons/bs";

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 z-40 w-auto h-screen transition-transform -translate-x-full md:translate-x-0 bg-gray-50 dark:bg-gray-800">
      <div className="h-full px-4 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/mainpage" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <IoMdHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/showproducts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <IoIosListBox className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/mainpage" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaShoppingCart className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <BsFillQuestionSquareFill className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">About</span>
            </Link>
          </li>
        </ul>
        <div className="mt-auto">
          <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <BsArrowLeftShort className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="ml-3">Exit</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar