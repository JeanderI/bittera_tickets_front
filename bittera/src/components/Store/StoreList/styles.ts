import styled, { css } from "styled-components";

interface StatusTextProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ativo":
      return "green";
    case "Inativo":
      return "red";
    case "Em manutencao":
      return "orange";
    default:
      return "black";
  }
};

export const StatusText = styled.p<StatusTextProps>`
  ${({ status }) => css`
    color: ${getStatusColor(status)};
    width: 100px;
    max-width: 15%;
  `}
`;
