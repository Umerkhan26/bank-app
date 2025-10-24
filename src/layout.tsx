import { Outlet } from "react-router-dom";
import Header from "./components/Header/header";
import Footer, { FooterProps } from "./components/Footer/footer";
import { useEffect } from "react";

const Layout: React.FC = () => {
  const footerData: FooterProps = {
    copyrightText: "© 2025 Bank App. All rights reserved.",
  };
  useEffect(() => {
    document.body.style.overflow = "unset";
    document.body.style.position = "static";
    document.body.style.width = "auto";
  }, []);

  return (
    <>
      <Header />

      <main
        style={{
          // marginTop: "80px",
          minHeight: "calc(100vh - 160px)",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </main>
      <Footer {...footerData} />
    </>
  );
};

export default Layout;
