import styled from "styled-components";

export const FormContainer = styled.form`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 30px;
  max-width: 100%;
  max-height: 100%;
  margin: 10px auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 1em;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  margin-top: -10px;
  margin-bottom: 10px;
  color: #dc3545;
  font-size: 0.9em;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
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
