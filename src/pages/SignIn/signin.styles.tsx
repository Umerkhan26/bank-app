import styled from "styled-components";

export const Title = styled.h2`
  color: black;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Underline = styled.hr`
  width: 70%;
  border: 1px solid red;
  margin: 0 auto 1rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  padding: 0 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const SubmitButton = styled.button`
  background: black;
  width: 100%;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #000;
  }

  &:disabled {
    background: #b3b3b3;
    cursor: not-allowed;
  }
`;

export const ButtonDiv = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

export const FooterText = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 0.9rem;
`;

export const SwitchText = styled.span`
  color: #007bff;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
