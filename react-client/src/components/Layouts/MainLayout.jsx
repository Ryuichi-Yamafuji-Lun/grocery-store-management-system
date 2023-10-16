import SideBar from "../SideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-12 p-4">
      <div className="col-span-1">
        <SideBar />
      </div>
      <div className="col-span-11">{children}</div>
    </div>
  );
}

export default MainLayout