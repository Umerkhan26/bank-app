import { Outlet } from "react-router-dom";
import Header from "./components/Header/header";
import Footer, { FooterProps } from "./components/Footer/footer";

const Layout: React.FC = () => {
  const footerData: FooterProps = {
    copyrightText: "© 2025 Bank App. All rights reserved.",
  };

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer {...footerData} />,
    </>
  );
};

export default Layout;
