import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  
  *, *::after, *::before {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    overflow-y: hidden;

  }

  ::-webkit-scrollbar {
    display: none;
}
  
  a, button {
    font-family: 'Montserrat', sans-serif;
  }
`;
