import React from "react";
import styled from "styled-components";
import { Link, LinkProps } from "react-router-dom";

interface ButtonProps extends LinkProps {
  label: string;
  color?: string;
  onClick?: () => void;
  additionalClasses?: string;
  logo?: string | React.ReactNode;
  trailing?: boolean;
  disabled?: boolean;
  // to: string;
}

const BaseButton = styled.button<Omit<ButtonProps, "label" | "to">>`
  font-family: "Arial, sans-serif"; // Define font directly
  color: ${({ color }) =>
    color === "transparent" ? "#000000" : "#FFFFFF"}; // Define text color
  background: ${({ color }) =>
    color === "transparent"
      ? "transparent"
      : "#2c99e2"}; // Define background color
  padding: 0.7rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;
  border: ${({ color }) =>
    color === "transparent" ? "1px solid #2c99e2" : "none"}; // Define border
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  .logo-class {
    padding-left: 10px;
    padding-right: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background-color: ${({ color }) =>
      color === "transparent"
        ? "#2c99e2"
        : "#1e7bb8"}; // Define hover background
    color: #ffffff; // Define hover text color
    border: ${({ color }) =>
      color === "transparent"
        ? "1px solid #2c99e2"
        : "none"}; // Define hover border
  }

  // Media query for screens below 768px
  @media (max-width: 768px) {
    padding: 0.6rem 0.9rem;
    font-size: 0.9rem;
    height: auto;

    .logo-class {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  // Media query for screens from 760px to 870px
  @media (min-width: 760px) and (max-width: 870px) {
    padding: 0.12rem 0.23rem;
    font-size: 0.8rem;
    height: 40px;

    .logo-class {
      padding-left: 19px;
      padding-right: 7px;
    }
  }

  // Media query for screens below 480px
  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
    height: auto;

    .logo-class {
      padding-left: 6px;
      padding-right: 6px;
    }
  }

  // Media query for screens above 768px
  @media (min-width: 768px) {
    height: 34px;
  }

  // Media query for screens above 1024px and below 1060px
  @media (min-width: 1024px) and (max-width: 1060px) {
    padding: 0.65rem 0.95rem;
    font-size: 0.95rem;
    height: 44px;

    .logo-class {
      padding-left: 9px;
      padding-right: 9px;
    }
  }
`;

// Button Component
const Button: React.FC<ButtonProps> = ({
  label,
  to,
  onClick,
  additionalClasses,
  logo,
  trailing = false,

  ...props
}) => {
  const content = trailing ? (
    <>
      {label}
      {logo &&
        (typeof logo === "string" ? (
          <img src={logo} alt="Logo" className="logo-class" />
        ) : (
          <span className="logo-class">{logo}</span>
        ))}
    </>
  ) : (
    <>
      {logo &&
        (typeof logo === "string" ? (
          <img src={logo} alt="Logo" className="logo-class" />
        ) : (
          <span className="logo-class">{logo}</span>
        ))}
      {label}
    </>
  );

  return to ? (
    <BaseButton as={Link} to={to} className={additionalClasses} {...props}>
      {content}
    </BaseButton>
  ) : (
    <BaseButton onClick={onClick} className={additionalClasses} {...props}>
      {content}
    </BaseButton>
  );
};

export default Button;
