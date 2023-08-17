import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/pokemon-sprites/Logo/pokemartlogo.png'
const NavBar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="sticky top-0 z-50 w-full h-20 flex justify-between items-center px-4 bg-blue-800 text-white">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="PokéMart Logo"
            className="w-15 h-12"
          />
          <p className="text-xl font-bold">
            PSMS
          </p>
        </Link>
      </div>
      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <a href="/mainpage" className="hover:text-yellow-400">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-yellow-400">
            About
          </a>
        </li>
        {/* Add more menu items here */}
      </ul>

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden">
        {!nav ? <FaBars className="text-3xl" /> : <FaTimes className="text-3xl" />}
      </div>

      {/* Mobile Menu */}
      <ul className={!nav ? "hidden" : "fixed top-0 left-0 w-full h-screen bg-blue-800 flex flex-col items-center text-xl space-y-6"}>
        <li>
          <a href="/mainpage" className="text-white hover:text-yellow-400">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="text-white hover:text-yellow-400">
            About
          </a>
        </li>
        {/* Add more mobile menu items here */}
      </ul>
    </div>
  )
}

export default NavBar
