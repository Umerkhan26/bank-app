import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Manrope", sans-serif;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 1024px) {
    padding: 1rem;
  }
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: auto;
  border-radius: 10px;
`;

export const QrCodeData = styled.div`
  font-size: 1.2rem;
  text-align: center;
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 10px;
  word-wrap: break-word;
`;

export const PopupMessage = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 999;
`;

export const MobileToggleButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 1.5rem;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;
export const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 80%; // Changed from 100% to 80% for better appearance
  height: 100vh;
  background-color: #ffffff;
  padding: 2rem;
  z-index: 1001;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  overflow-y: auto;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const MobileCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 1.5rem;
`;

export const MobileMenuOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const Button = styled.div`
  padding: 10px 10px;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 5px;
`;

export const StoreButton = styled.div`
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: red;
  }
`;

export const QrCodeButton = styled.div`
  background: black;
  color: white;
  margin-top: 10px;
  width: 100%;
  padding: 12px 10px;
  border: none;
  text-align: center;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

export const PointsDisplay = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
`;

export const NotificationDropdown = styled.div`
  position: relative;
`;

export const NotificationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 1.2rem;
  position: relative;
  transition: color 0.2s;

  &:hover {
    color: #1e40af;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
`;

export const ProfileDropdown = styled.div`
  position: relative;
`;

export const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileFallback = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #a3e635;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 2.5rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 16rem;
  z-index: 10;
  display: none;
  padding: 0.5rem 0;

  ${NotificationDropdown}:hover &,
  ${ProfileDropdown}:hover & {
    display: block;
  }
`;

export const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const DropdownItemTime = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

export const DropdownFooter = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb;
`;

export const DropdownButton = styled.button`
  font-size: 0.875rem;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  transition: text-decoration 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;
