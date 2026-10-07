import Header from "../header/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <div>Footer</div>
    </div>
  );
};

export default Layout;
