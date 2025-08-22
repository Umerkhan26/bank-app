// import React, { useRef } from "react";
// import img1 from "../../assets/pngegg.png";
// import { Outlet } from "react-router-dom";
// import { MdCameraAlt } from "react-icons/md";
// import { IoLocationSharp } from "react-icons/io5";
// import styled from "styled-components";
// import { NavLink } from "react-router-dom";

// export const MenuContainer = styled.div`
//   display: flex;
//   background-color: #f9f9f9;
//   min-height: 100vh;
// `;

// export const NavContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: #ffffff;
//   padding: 2rem 0;
//   width: 300px;
//   box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
//   border-radius: 0 20px 20px 0;
//   transition: all 0.3s ease;

//   @media (max-width: 768px) {
//     width: 100%;
//     border-radius: 0;
//   }
// `;

// export const NavImg = styled.img`
//   border-radius: 50%;
//   border: 3px solid #000000;
//   width: 105px;
//   height: 105px;
//   cursor: pointer;
//   transition: transform 0.3s ease, border-color 0.3s ease;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// export const CameraIcon = styled.div`
//   position: absolute;
//   top: 80px;
//   right: 60px;
//   background: white;
//   border-radius: 50%;
//   padding: 3px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     background: #1a8797;
//     color: white;
//     transform: scale(1.1);
//   }
// `;

// export const StyledNavLink = styled(NavLink)`
//   padding: 12px 60px;
//   border-radius: 8px;
//   text-align: center;
//   color: #555;
//   font-size: 17px;
//   text-decoration: none;
//   transition: all 0.3s ease;
//   position: relative;
//   overflow: hidden;

//   &:hover {
//     color: red;
//   }

//   &.active {
//     color: black;
//     // font-weight: bold;
//   }

//   &::after {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 50%;
//     width: 0;
//     height: 2px;
//     background: red;
//     transition: all 0.3s ease;
//   }

//   &:hover::after {
//     width: 100%;
//     left: 0;
//   }

//   @media (max-width: 768px) {
//     padding: 10px 40px;
//   }

//   @media (max-width: 480px) {
//     padding: 8px 20px;
//     font-size: 14px;
//   }
// `;

// export const NavUL = styled.ul`
//   padding: 1rem;
//   list-style-type: none;
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   width: 100%;

//   @media (max-width: 768px) {
//     gap: 1.2rem;
//   }

//   @media (max-width: 480px) {
//     gap: 1rem;
//   }
// `;

// const ProfileMenu = () => {
//   const fileInputRef = useRef(null);

//   const profile = {
//     firstName: "John",
//     lastName: "Doe",
//     profilePhoto: null,
//     city: "New York",
//     country: "USA",
//     phonenumber: "+1-541-754-3010",
//   };

//   const handleIconClick = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <MenuContainer>
//       <NavContainer>
//         <div style={{ position: "relative" }}>
//           <NavImg
//             src={profile.profilePhoto || img1}
//             alt="Profile"
//             onClick={handleIconClick}
//           />
//           <CameraIcon>
//             <MdCameraAlt size={20} onClick={handleIconClick} />
//           </CameraIcon>
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           style={{ display: "none" }}
//         />
//         <h2 style={{ marginTop: "1.5rem", color: "#333", fontSize: "20px" }}>
//           {`${profile.firstName} ${profile.lastName}`}
//         </h2>
//         <p
//           style={{
//             display: "flex",
//             alignItems: "center",
//             color: "#555",
//             marginTop: "0.5rem",
//           }}
//         >
//           <IoLocationSharp
//             size={17}
//             style={{ color: "#000000", marginRight: "8px" }}
//           />
//           {profile.city}, {profile.country}
//         </p>

//         <hr style={{ width: "80%", margin: "1.5rem 0", opacity: 0.3 }} />
//         <NavUL>
//           <li>
//             <StyledNavLink to="/profile/">Profile Detail</StyledNavLink>
//           </li>
//           <li>
//             <StyledNavLink to="/profile/user-history">
//               User History
//             </StyledNavLink>
//           </li>
//         </NavUL>
//       </NavContainer>
//       <div style={{ flexGrow: 1, padding: "2rem" }}>
//         <Outlet />
//       </div>
//     </MenuContainer>
//   );
// };

// export default ProfileMenu;

import React, { useRef } from "react";
import img1 from "../../assets/pngegg.png";
import { Outlet } from "react-router-dom";
import { MdCameraAlt, MdDashboard } from "react-icons/md";
import { IoLocationSharp, IoStatsChart } from "react-icons/io5";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Styled Components for Enhanced Sidebar
export const MenuContainer = styled.div`
  display: flex;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 2rem 0;
  width: 320px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;

  @media (max-width: 968px) {
    width: 280px;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    padding: 1.5rem 0;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
`;

export const NavImg = styled.img`
  border-radius: 50%;
  border: 3px solid black;
  width: 110px;
  height: 110px;
  cursor: pointer;
  transition: all 0.3s ease;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 15px rgba(79, 70, 229, 0.3);
  }
`;

export const CameraIcon = styled.div`
  position: absolute;
  bottom: 8px;
  right: 90px;
  background: white;
  border-radius: 50%;
  padding: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #4f46e5;
    color: white;
    transform: scale(1.1);
  }
`;

export const ProfileInfo = styled.div`
  text-align: center;
  margin-top: 1.2rem;
`;

export const ProfileName = styled.h2`
  margin: 0;
  color: #1e293b;
  font-size: 1.35rem;
  font-weight: 600;
`;

export const LocationText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem 0;
  margin: 1rem 0;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatValue = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
`;

export const StatLabel = styled.span`
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 4px;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  margin: 0 1rem;
  border-radius: 8px;
  color: #64748b;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-weight: 500;

  &:hover {
    color: #000;
    background-color: #f1f5f9;
  }

  &.active {
    color: black;
    background-color: #f1f5f9;
    font-weight: 600;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: black;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.active::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

export const NavIcon = styled.span`
  margin-right: 12px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

export const NavUL = styled.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const ProfileMenu = () => {
  const fileInputRef = useRef(null);

  const profile = {
    firstName: "Debby",
    lastName: "Williams",
    profilePhoto: null,
    city: "New York",
    country: "USA",
    phonenumber: "+1-541-754-3010",
  };

  const stats = {
    posts: 892,
    followers: "22.5k",
    following: 150,
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <MenuContainer>
      <NavContainer>
        <ProfileSection>
          <div style={{ position: "relative" }}>
            <NavImg
              src={profile.profilePhoto || img1}
              alt="Profile"
              onClick={handleIconClick}
            />
            <CameraIcon>
              <MdCameraAlt size={18} onClick={handleIconClick} />
            </CameraIcon>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          <ProfileInfo>
            <ProfileName>{`${profile.firstName} ${profile.lastName}`}</ProfileName>
            <LocationText>
              <IoLocationSharp size={14} style={{ marginRight: "6px" }} />
              {profile.city}, {profile.country}
            </LocationText>
          </ProfileInfo>
        </ProfileSection>

        <NavUL>
          <li>
            <StyledNavLink to="/profile/">
              <NavIcon>
                <MdDashboard size={18} />
              </NavIcon>
              Profile Detail
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/profile/user-history">
              <NavIcon>
                <IoStatsChart size={18} />
              </NavIcon>
              User History
            </StyledNavLink>
          </li>
        </NavUL>
      </NavContainer>
      <div style={{ flexGrow: 1, padding: "2rem", background: "#f8fafc" }}>
        <Outlet />
      </div>
    </MenuContainer>
  );
};

export default ProfileMenu;
