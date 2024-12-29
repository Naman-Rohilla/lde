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
    script.src = "https://embed.tawk.to/6771586249e2fd8dfe003128/1ig9c2h08";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

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
