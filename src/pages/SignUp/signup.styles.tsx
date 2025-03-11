import styled from "styled-components";

export const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
`;
export const Underline = styled.hr`
  width: 70%;
  border: 1px solid red;
  margin: 0 auto 1rem;
`;
export const Message = styled.p`
  margin-top: 20px;
  font-size: 1rem;
  color: #333;
`;
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;
export const FormGroup = styled.div`
  padding: 0 20px;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.85rem;
  margin-top: 2px;
`;
export const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: black;
  font-weight: bold;
  margin-bottom: 2px;
`;
export const ButtonDiv = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;
export const SubmitButton = styled.button`
  background: black;
  color: white;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
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
