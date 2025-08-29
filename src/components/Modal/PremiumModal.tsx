// import styled from "styled-components";

// export const ModalOverlay = styled.div`
//   position: fixed;
//   inset: 0;
//   z-index: 50;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: rgba(0, 0, 0, 0.5);
//   padding: 0.4rem;
// `;

// export const ModalContent = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 370px;
//   background-color: white;
//   padding: 1.2rem;
//   border-radius: 0.5rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   max-height: 100vh; /* 👈 modal won’t exceed 80% of viewport */
//   overflow-y: auto;
// `;

// export const ModalCloseButton = styled.button`
//   position: absolute;
//   top: 1rem;
//   right: 1rem;
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 1.5rem;
//   color: #6b7280;

//   svg {
//     width: 24px;
//     height: 24px;
//   }
// `;import React from "react";
import styled, { keyframes } from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </ModalCloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

// Styled Components with compact design
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-8px) scale(0.98);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  animation: ${fadeIn} 0.2s ease-out;

  @media (max-width: 480px) {
    padding: 0.25rem;
    align-items: flex-end;
  }
`;

export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.2s ease-out;
  overflow-y: auto;

  @media (max-width: 480px) {
    max-width: 100%;
    border-radius: 8px 8px 0 0;
    padding: 0.875rem;
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #f1f5f9;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.15s ease;

  &:hover {
    background: #e2e8f0;
    color: #334155;
  }

  svg {
    width: 14px;
    height: 14px;
  }

  @media (max-width: 480px) {
    top: 0.4rem;
    right: 0.4rem;
    width: 22px;
    height: 22px;

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;
