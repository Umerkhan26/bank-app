import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faBell } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <NavContainer>
      {/* Mobile Toggle Button */}
      <MobileToggleButton>
        <FontAwesomeIcon icon={faBars} />
      </MobileToggleButton>

      {/* Brand/Logo */}
      <BrandLogo>BankApp</BrandLogo>

      {/* Right Side Actions */}
      <RightActions>
        {/* Points Display */}
        <PointsDisplay>36 points</PointsDisplay>

        {/* Search Icon */}
        <SearchButton>
          <FontAwesomeIcon icon={faSearch} />
        </SearchButton>

        {/* Notifications Dropdown */}
        <NotificationDropdown>
          <NotificationButton>
            <FontAwesomeIcon icon={faBell} />
            <NotificationBadge>1</NotificationBadge>
          </NotificationButton>

          <DropdownMenu>
            <DropdownItem>
              Support Team posted a message in Box set (existing design) $40
              <DropdownItemTime>2 weeks ago</DropdownItemTime>
            </DropdownItem>

            <DropdownFooter>
              <DropdownButton>Show all</DropdownButton>
              <DropdownButton>Mark all as read</DropdownButton>
            </DropdownFooter>
          </DropdownMenu>
        </NotificationDropdown>

        {/* User Profile Dropdown */}
        <ProfileDropdown>
          <ProfileButton>
            <ProfileImage
              src="https://www.gravatar.com/avatar/9095632f1181c0f40a37d853f66cfc40?s=100&d=404&r=g"
              alt="Umar Faiz"
              onError={(e) => {
                e.currentTarget.hidden = true;
                e.currentTarget.nextElementSibling?.removeAttribute("hidden");
              }}
            />
            <ProfileFallback>
              <span>UF</span>
            </ProfileFallback>
          </ProfileButton>

          <DropdownMenu>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Team</DropdownItem>
            <DropdownItem as="button" type="submit">
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </ProfileDropdown>
      </RightActions>
    </NavContainer>
  );
};

export default Header;

// Styled Components
const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const MobileToggleButton = styled.button`
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

const BrandLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e40af;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const PointsDisplay = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 1.2rem;
  transition: color 0.2s;

  &:hover {
    color: #1e40af;
  }
`;

const NotificationDropdown = styled.div`
  position: relative;
`;

const NotificationButton = styled.button`
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

const NotificationBadge = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
`;

const ProfileDropdown = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileFallback = styled.div`
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

const DropdownMenu = styled.div`
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

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const DropdownItemTime = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const DropdownFooter = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb;
`;

const DropdownButton = styled.button`
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
