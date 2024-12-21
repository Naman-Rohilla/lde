import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
