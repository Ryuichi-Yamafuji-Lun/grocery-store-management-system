import { Link } from 'react-router-dom';


const WelcomePage = () => {

  return (
    <div className="welcome-page flex flex-col justify-center items-center h-screen bg-blue-800">
      <div className="max-w-[1000px] mx-auto px-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-4xl sm:text-7xl font-bold">
            Welcome
          </h1>
        </div>
        <p className="text-2xl py-2 max-w-[700px">Grocery Store Management System</p>
        <p className="text-white">Made with React, mySQL, and Flask</p>
      </div>
      <div className="py-8">
        <Link to="/mainpage" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115">Start</Link>
      </div>
    </div>
  )
}

export default WelcomePage
