import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 30px;
  max-width: 100%;
  max-height: 100%;
  margin: 10px auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.8em;
  font-weight: bold;
`;

export const TextInfo = styled.p`
  margin: 10px 0;
  color: #555;
  font-size: 1.2em;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

export const DownloadButton = styled(Button)`
  background-color: #28a745;
  &:hover {
    background-color: #218838;
  }
`;
