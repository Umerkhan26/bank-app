import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import partnerLogo from "../../assets/bank_al_falah2.webp";
import {
  FooterContainer,
  Container,
  Row,
  FooterPartnerLogo,
  FooterNav,
  FooterCategoryWrapper,
  FooterName,
  FooterList,
  FooterItem,
  FooterAnchor,
  SocialNetwork,
  IconSocNet,
  FooterNote,
  BrandLogo,
} from "./footer.styles";

// Interfaces
interface IFooterLink {
  href: string;
  text: string;
}

interface IFooterCategory {
  name: string;
  links: IFooterLink[];
}

export interface FooterProps {
  categories: IFooterCategory[];
  copyrightText: string;
  socialLinks: { href: string; text: string }[];
  brandLogos: { src: string; alt: string; href: string }[];
}

// Footer Component
const Footer: React.FC<FooterProps> = ({ categories, copyrightText }) => {
  return (
    <FooterContainer>
      <Container>
        <Row>
          {/* Partner Logo */}
          <FooterPartnerLogo>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={partnerLogo} alt="Partner Logo" />{" "}
            </a>
          </FooterPartnerLogo>

          {/* Footer Navigation */}
          <FooterNav>
            {categories.map((category, index) => (
              <FooterCategoryWrapper key={index}>
                <FooterName>{category.name}</FooterName>
                <FooterList>
                  {category.links.map((link, idx) => (
                    <FooterItem key={idx}>
                      <FooterAnchor href={link.href}>{link.text}</FooterAnchor>
                    </FooterItem>
                  ))}
                </FooterList>
              </FooterCategoryWrapper>
            ))}

            {/* Social Links */}
            <SocialNetwork>
              <BrandLogo>BankApp</BrandLogo>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <IconSocNet
                  href="https://www.facebook.com"
                  target="_blank"
                  color="#3b5998"
                >
                  <FaFacebook size={20} />
                </IconSocNet>
                <IconSocNet
                  href="https://www.linkedin.com"
                  target="_blank"
                  color="#0077b5"
                >
                  <FaLinkedin size={20} />
                </IconSocNet>
                <IconSocNet
                  href="https://twitter.com"
                  target="_blank"
                  color="#1da1f3"
                >
                  <FaTwitter size={20} />
                </IconSocNet>
                <IconSocNet
                  href="https://www.instagram.com"
                  target="_blank"
                  color="#E4405F"
                >
                  <FaInstagram size={20} />
                </IconSocNet>
              </div>
            </SocialNetwork>
          </FooterNav>
        </Row>

        <FooterNote>{copyrightText}</FooterNote>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
