import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { InfraDataProvider } from "./context/infraDataProvider";
import { PackDataProvider } from "./context/packDataProvider";
import { useEffect } from "react";

function Root() {
  const location = useLocation();

  const isAdminPath = location.pathname === "/admin";

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = process.env.REACT_APP_CHATBOT_URL;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    script.onload = () => {
      console.log("Tawk.to script loaded.");
      if (window.Tawk_API && window.Tawk_LoadStart) {
        console.log("Tawk.to is initialized.");
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <InfraDataProvider>
        <PackDataProvider>
          <Navbar isAdminPath={isAdminPath} />
          <Outlet />
          {!isAdminPath && <Footer />}
        </PackDataProvider>
      </InfraDataProvider>
    </>
  );
}

export default Root;
