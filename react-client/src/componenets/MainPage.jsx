

const MainPage = () => {


  return (
    <div name='main' className="w-full h-screen">
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <div className="text-4xl">
          Orders
        </div>
        <div>
          <a href="/manageproducts" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115 ">Manage</a>
          <a href="/neworder" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115 ">New Orders</a>
        </div>        
      </div>
      <div className="mx-auto flex flex-row justify-center items-center p-4">
        <table className="shadow-lg bg-white">
          <thead>
            <tr>
              <th className="bg-blue-100 border text-center px-8 py-4">Date</th>
              <th className="bg-blue-100 border text-center px-8 py-4">Order #</th>
              <th className="bg-blue-100 border text-center px-8 py-4">Customer</th>
              <th className="bg-blue-100 border text-center px-8 py-4">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MainPage