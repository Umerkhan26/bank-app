// import React from "react";
// import { ModalCloseButton, ModalContent, ModalOverlay } from "./PremiumModal";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <ModalOverlay onClick={onClose}>
//       <ModalContent onClick={(e) => e.stopPropagation()}>
//         <ModalCloseButton onClick={onClose}>
//           <svg
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M6 18L18 6M6 6l12 12"
//             ></path>
//           </svg>
//         </ModalCloseButton>
//         {children}
//       </ModalContent>
//     </ModalOverlay>
//   );
// };

// export default Modal;
