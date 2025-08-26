import styled from "styled-components";
// import Slider from "react-slick";

export const PremiumContainer = styled.div`
  padding: 2rem 2rem;
  background-color: #f8f9fa;
  margin-bottom: 30px;
`;

export const PremiumPoints = styled.div`
  font-size: 1.25rem;
  color: #ef4444;
  font-weight: bold;
  margin-bottom: 0.75rem;
  text-align: left;
`;

export const Title = styled.h3`
  font-size: 2.5rem;
  color: black;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
`;

export const PremiumTitle = styled.h3`
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 0.7rem;
  font-weight: 600;
  text-align: left;
`;

export const PremiumDescription = styled.h3`
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: left;
`;

// export const ApplyButton = styled.button`
//   background-color: black;
//   color: #ffffff;
//   border: none;
//   border-radius: 0.5rem;
//   padding: 0.75rem 1.5rem;
//   font-size: 1rem;
//   font-weight: bold;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   width: 100%;

//   &:hover {
//     background-color: #000;
//   }
// `;

export const PremiumListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PremiumCard = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

/* NEW: centers images and gives them a fixed visual area */
export const PremiumImageBox = styled.div`
  height: 200px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

export const PremiumImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain; /* ← show the whole image */
`;

export const PremiumContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const ApplyButton = styled.button`
  background-color: black;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: auto; /* ← pushes button to the bottom */
  &:hover {
    background-color: #000;
  }
`;
