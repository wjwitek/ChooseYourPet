import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-size: 10px;
    font-family: ${(props) => props.theme.mainFont}, sans-serif;
    background-image: url(${(props) => props.theme.backgroundImage});
    background-color: ${(props) => props.theme.colors.bgDark};
  }
`;

export default GlobalStyle;
