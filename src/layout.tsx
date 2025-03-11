import { Outlet } from "react-router-dom";
import Header from "./components/Header/header";
import Footer, { FooterProps } from "./components/Footer/footer";

const Layout: React.FC = () => {
  const footerData: FooterProps = {
    categories: [
      {
        name: "Products",
        links: [
          { href: "#", text: "Savings Accounts" },
          { href: "#", text: "Loans" },
          { href: "#", text: "Credit Cards" },
        ],
      },
      {
        name: "Support",
        links: [
          { href: "#", text: "Contact Us" },
          { href: "#", text: "FAQs" },
          { href: "#", text: "Privacy Policy" },
        ],
      },
      {
        name: "About Us",
        links: [
          { href: "#", text: "Our Story" },
          { href: "#", text: "Careers" },
          { href: "#", text: "Newsroom" },
        ],
      },
    ],
    socialLinks: [
      { href: "#", text: "Facebook" },
      { href: "#", text: "Twitter" },
      { href: "#", text: "Instagram" },
    ],
    copyrightText: "© 2024 Bank App. All rights reserved.",
    brandLogos: [
      {
        src: "https://example.com/brand1.png",
        alt: "Brand 1",
        href: "https://example.com",
      },
      {
        src: "https://example.com/brand2.png",
        alt: "Brand 2",
        href: "https://example.com",
      },
    ],
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
