import styled from "styled-components";

export const Container = styled.div`
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    background-color: var(--silver-2);
    padding: 20px;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.5);
    width: 50%;
    max-width: 70%;
    overflow-y: auto;
    max-height: 80%;
    border-radius: 15px;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--silver-2);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: #f1f1f1;
      border-radius: 4px;
    }

    scrollbar-width: thin;
    scrollbar-color: var(--silver-2) #f1f1f1;
  }
`;

export const CloseButton = styled.button`
  border: none;
  display: flex;
  font-size: 2.5rem;
  background-color: transparent;
  color: white;
`;

export const CloseDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
