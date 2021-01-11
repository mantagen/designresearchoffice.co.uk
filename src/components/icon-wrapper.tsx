import React from "react";
import styled, { css } from "styled-components";

export const iconWrapperStyles = css`
  height: 2.1rem;
  width: 2.1rem;
  display: flex;
  padding: 0.5rem;
  margin-right: -0.5rem;
  margin-top: -0.5rem;
  align-items: center;
  justify-content: center;
  outline: none;
`;
const IconWrapperRoot = styled.div`
  ${iconWrapperStyles}
`;

const IconWrapper: React.FC = (props) => {
  return <IconWrapperRoot tabIndex={-1} {...props} />;
};

export default IconWrapper;
