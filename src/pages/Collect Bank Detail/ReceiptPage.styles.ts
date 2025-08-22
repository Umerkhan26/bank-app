import styled from "styled-components";

export const ReceiptContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ReceiptTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export const ReceiptInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  text-align: left;
  margin-bottom: 20px;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

export const Value = styled.span`
  color: #333;
`;

export const DownloadButton = styled.button`
  background: black;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  &:hover {
    background: rgb(62, 70, 77);
  }
`;

export const BackButton = styled.button`
  background: #6c757d;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  &:hover {
    background: #5a6268;
  }
`;
