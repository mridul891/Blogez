import { Outlet } from "react-router-dom";
import Header from "./Component/Header";

const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
