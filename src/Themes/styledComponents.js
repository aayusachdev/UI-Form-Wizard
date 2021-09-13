import styled, { createGlobalStyle } from "styled-components";

// Styled Header component
export const WizardHeader = styled.div`
  background-color: salmon;
  border: 1px solid red;
  height: 4rem;
  text-align: center;
  padding: 14px;
  font-size: 1.5rem;
  color: #f8f8f8;
  box-shadow: 4px 4px 10px 1px rgb(168 56 56 / 50%);
`;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #ffd9c7;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;