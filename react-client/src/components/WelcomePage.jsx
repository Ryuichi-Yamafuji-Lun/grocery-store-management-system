import { Link } from 'react-router-dom';

// Created With Logos
import { BiLogoReact, BiLogoFlask, BiLogoTailwindCss } from 'react-icons/bi';
import { SiMysql } from 'react-icons/si'
import { AiOutlineArrowRight } from 'react-icons/ai'

// Image imports
import GSMSLogo from '../assets/logo/GSMSLogoTransparent.png'
import GSMain from '../assets/misc/GroceryStoreMisc.jpg';
import AddOrderPic from '../assets/webpics/AddingOrders.png';
import DashboardPic from '../assets/webpics/DashboardPic.png';
import ManagingProductPic from '../assets/webpics/ManagingProduct.png';

const WelcomePage = () => {

  return (
    <div className='w-full min-h-screen'>
      {/* Header */}
      <div className='p-4'>
        <div>
          <img
            src={GSMSLogo}
            alt='GSMS Logo'
            width={100}
          />
        </div>
        <div className='grid grid-cols-5 pt-10'>
          <div className='text-5xl col-start-2 col-span-2 place-self-center pr-2 lg:text-7xl'>
            <p>Bringing <span className='font-bold text-light-green italic'>Freshness</span></p>
            <p>to your <span className='font-bold text-light-green italic'>Management</span></p>
            <div className="flex space-x-2 pt-3 text-xl lg:text-2xl text-center">
              <div className="flex space-x-2 pt-3 text-xl lg:text-2xl text-center">
                <Link to="/mainpage" className="bg-light-green text-white py-2 px-2 rounded-md flex items-center transition hover:bg-dark-green hover:scale-105">
                  <span className="group-hover:underline font-bold pr-1">
                    Start
                  </span>{" "}
                  <AiOutlineArrowRight />
                </Link>
              </div>
            </div>
          </div>
          <div className='col-start-4 col-span-2 place-self-center'>
            <img
              src={GSMain}
              alt='GSMain'
              className='border-4 border-light-green rounded sm:w-11/12 md:w-11/12 xl:w-1/2'
            />
          </div>
        </div>
      </div>

      {/* System */}
      <div className='w-full bg-light-green p-4'>
        <div className='text-center text-bold text-white text-4xl p-2'>
          System
        </div>
        <div className='grid grid-cols-3 place-items-center pt-4'>
          <img
              src={DashboardPic}
              alt='Dashboard'
              width={700}
            />
            <img
            src={ManagingProductPic}
            alt='Product'
            width={700}
          />
          <img
            src={AddOrderPic}
            alt='Order'
            width={700}
          />
        </div>
      </div>

      {/* Footer */}
      <div className='p-4 flex items-center justify-end'>
        <p className='text-xl mr-4'>Built with: </p>
        <BiLogoReact className="w-8 h-8" />
        <BiLogoFlask className="w-8 h-8" />
        <BiLogoTailwindCss className="w-8 h-8" />
        <SiMysql className="w-8 h-8" />
      </div>


    </div>
  );
}

export default WelcomePage