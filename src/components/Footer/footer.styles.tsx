import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #fff;
  padding: 90px 0 0;
  border-top: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    padding: 60px 0 0;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const FooterPartnerLogo = styled.div`
  margin-bottom: 2rem;

  img {
    width: 140px;
    height: 120px;
    object-fit: cover;
  }
`;

export const FooterNav = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 160px;

  @media (max-width: 1024px) {
    gap: 40px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const FooterCategoryWrapper = styled.div`
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const FooterName = styled.div`
  font-family: "Proxima Nova Rg";
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  color: #8c8c8c;
  margin-bottom: 24px;
`;

export const FooterList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 0;
`;

export const FooterItem = styled.li`
  list-style-type: none;
`;

export const FooterAnchor = styled.a`
  color: #212529;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: #1e40af;
    text-decoration: underline;
  }
`;

export const SocialNetwork = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const IconSocNet = styled.a`
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    height: 20px;
    width: 20px;
    fill: ${(props) => props.color || "#5476be"};
    transition: fill 0.3s ease;
  }
`;

export const FooterNote = styled.p`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 14px;
  color: #455a64;
`;

export const BrandLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #212529;
  text-decoration: none;
  cursor: pointer;
`;
