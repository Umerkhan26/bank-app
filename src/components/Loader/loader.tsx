import React from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  size?: number;
  color?: string;
}

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;

const Loader: React.FC<LoaderProps> = ({ size = 50, color = "black" }) => {
  return (
    <LoaderWrapper>
      <ClipLoader size={size} color={color} />
    </LoaderWrapper>
  );
};

export default Loader;
