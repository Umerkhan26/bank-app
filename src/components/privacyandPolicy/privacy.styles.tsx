import styled from "styled-components";
interface SidebarItemProps {
  active?: boolean;
}
export const PageContainer = styled.div`
  font-family: "Manrope", sans-serif;
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
`;

export const Layout = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* Sidebar */
export const Sidebar = styled.aside`
  width: 30%;
  min-width: 220px;
  border-right: 1px solid #f0f0f0;
  background: #fafafa;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eee;
  }
`;

export const SidebarList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1.5rem;
`;

export const SidebarItem = styled.li<SidebarItemProps>`
  font-size: 0.95rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? "#e53935" : "#444")};
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #fbe9e7;
  }
`;

/* Main Content */
export const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  background: #fff;

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

export const Header = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #e53935;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #e53935;
`;

export const SectionText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 1rem;
`;
