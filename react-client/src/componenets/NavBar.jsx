import AuthenticationButton from "./Login/AuthnticationButton";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)

  return (
    <div className='sticky top-0 z-50 w-full h-[80px] flex justify-between items-center px-4 bg-[#204e93] text-gray-100'>
      <div>
        <a href="/mainpage">GSMS</a>
      </div>
      {/* menu */}
      <ul className="hidden md:flex">
        <li>
          <a href="/mainpage">Home</a>
        </li>
        <li>
          <AuthenticationButton />
        </li>
      </ul>

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>


      {/* Mobile Menu */}
      <ul className={!nav ? 'hidden' : "absolute top-0 left-0 w-full h-screen bg-[#204e93] flex flex-col justify-center items-center"}>
        <li className="py-6 test-4xl">
          <a href="/mainpage">Home</a>
        </li>
        <li className="py-6 test-4xl">
          <AuthenticationButton />
        </li>
        <li className="py-6 test-4xl">
          <a href="/about">About</a>
        </li>
      </ul>
    </div>

    
  )
}

export default NavBar