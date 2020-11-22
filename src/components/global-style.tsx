// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 120%;
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
  color: #333;
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
a.active {
  text-decoration: underline;
}
img {
  max-width: 100%; /*this should be max-width, adjust jpgs accordingly*/
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.spacer {
  margin-left: 6px;
}
p {
  margin: 0;
}
`;

export default GlobalStyle;
