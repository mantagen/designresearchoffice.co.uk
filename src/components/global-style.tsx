// globalStyles.js
import { createGlobalStyle } from "styled-components";
import { colors } from "../theme";

const GlobalStyle = createGlobalStyle`
html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 140%;
  -webkit-tap-highlight-color: transparent;
}
*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}
body {
  margin: 0;
  color: ${colors.darkGrey};
}
html {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 1em;
  font-weight: normal;
  margin: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
button {
  &:hover {
    cursor: pointer;
  }
}
img {
  max-width: 100%;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
p {
  margin: 0;
  word-break: break-word;
}
`;

export default GlobalStyle;
