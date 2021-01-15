import styled from "styled-components";
import { TEXT_MAX_WIDTH } from "../theme";

const TextPage = styled.div`
  max-width: ${TEXT_MAX_WIDTH};

  p {
    margin-bottom: 1em;
    margin-top: 0;
  }
`;

export default TextPage;
