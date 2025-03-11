import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: #eef1f6;
  min-height: 100vh;
`;

const HomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 25px;
  color: #222;
`;

const HomeDescription = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 50px;
  color: #555;
  line-height: 1.6;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 50px 30px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StepNumber = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #222;
  color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const StepCard = styled.div`
  background: #ffffff;
  padding: 50px 30px;
  border-radius: 20px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  min-height: 270px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 14px 28px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    min-width: 100%;
    margin-bottom: 20px;
  }
`;

const StepTitle = styled.h2`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 20px;
  color: rgb(35, 31, 32);
`;

const StepDescription = styled.p`
  color: rgb(35, 31, 32);
  max-width: 350px;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`;

const GetStartedButton = styled.button`
  background: #222;
  color: #fff;
  border: none;
  padding: 12px 36px;
  font-size: 1.2rem;
  margin-top: 50px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
    transform: scale(1.07);
  }
`;

const CampaignSteps: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/campaigns");
  };

  const steps = [
    {
      number: 1,
      title: "Explore Campaigns",
      description:
        "Browse through our available campaigns and find the one that suits you best.",
    },
    {
      number: 2,
      title: "Check Requirements",
      description:
        "Each campaign has specific requirements. Make sure you meet them before applying.",
    },
    {
      number: 3,
      title: "Apply & Participate",
      description:
        "Click the apply button and start your journey towards rewards and benefits.",
    },
    {
      number: 4,
      title: "Track Progress",
      description:
        "Stay updated on your campaign performance and maximize your engagement for better results.",
    },
  ];

  return (
    <HomeContainer>
      <HomeTitle>How to Enter a Campaign</HomeTitle>
      <HomeDescription>
        Follow these simple steps to participate in our exciting campaigns and
        start earning rewards!
      </HomeDescription>

      <StepsContainer>
        {steps.map((step) => (
          <StepCard key={step.number}>
            <StepNumber>{step.number}</StepNumber>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </StepCard>
        ))}
      </StepsContainer>

      <GetStartedButton onClick={handleGetStarted}>
        Get Started
      </GetStartedButton>
    </HomeContainer>
  );
};

export default CampaignSteps;
