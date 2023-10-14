import SideBar from "../SideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-7 p-4">
      <div className="col-span-3">
        <SideBar />
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
}

export default MainLayout
