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

export const Input = styled.input`
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 13px;
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
  color: white;
  width: 100%;
  padding: 6px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;

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
  // margin-top: 3px;
  font-size: 0.9rem;
`;

export const FooterReset = styled.p`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

export const SwitchText = styled.span`
  color: #007bff;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
