import styled from "styled-components";
import { textWidth } from "../theme";

const TextPage = styled.div`
  max-width: ${textWidth};

  p {
    margin-bottom: 1em;
    margin-top: 0;
  }
`;

export default TextPage;
