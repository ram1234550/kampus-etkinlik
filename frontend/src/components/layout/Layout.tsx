import { Outlet } from "react-router-dom";
import Footer from "./Footer";

// Her sayfa kendi Header'ını çizer; ortak kısım burada
function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
