

const MainPage = () => {
  return (
    <div name='main' className="w-full h-screen">
      <div className=" mx-auto flex flex-row justify-between items-center p-4">
        <div className="text-4xl">
          Orders
        </div>
        <div>
          <a href="/manageproducts" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115 ">Manage</a>
          <a href="/neworder" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115 ">New Orders</a>
        </div>        
      </div>
    </div>
  )
}

export default MainPage