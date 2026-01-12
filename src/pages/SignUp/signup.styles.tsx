import styled from "styled-components";

export const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 0.8rem;
`;
export const Underline = styled.hr`
  width: 70%;
  border: 1px solid red;
  margin: 0 auto 0.8rem;
`;
export const Message = styled.p`
  margin-top: 16px;
  font-size: 1rem;
  color: #333;
`;

export const FormGroup = styled.div`
  padding: 0 8px;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.65rem;
  margin-top: 1px;
`;
export const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: black;
  font-weight: bold;
  margin-bottom: 1px;
`;
export const ButtonDiv = styled.div`
  margin-top: 12px;
  padding: 0 12px;
`;
export const Input = styled.input`
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 13px;
`;

export const SubmitButton = styled.button`
  background: black;
  color: white;
  width: 100%;
  padding: 7px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
`;

export const FooterText = styled.p`
  text-align: center;
  margin-top: 8px;
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
