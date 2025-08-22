import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.4rem;
`;

export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 370px;
  background-color: white;
  padding: 1.2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 100vh; /* 👈 modal won’t exceed 80% of viewport */
  overflow-y: auto;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #6b7280;

  svg {
    width: 24px;
    height: 24px;
  }
`;
