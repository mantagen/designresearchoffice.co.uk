import React, { HTMLProps } from "react";
import styled from "styled-components";

import { iconWrapperStyles } from "./icon-wrapper";

const IconWrapper = styled.div`
  ${iconWrapperStyles}
`;

const IconButtonRoot = styled.button`
  background: transparent;
  border: none;
  padding: 0;

  &:focus ${IconWrapper} {
    outline: 5px auto -webkit-focus-ring-color;
  }
`;

const IconButton: React.FC<
  Omit<HTMLProps<HTMLButtonElement>, "ref" | "type" | "as"> & {
    "aria-label": string;
  }
> = ({ children, ...buttonProps }) => {
  return (
    <IconButtonRoot {...buttonProps}>
      <IconWrapper tabIndex={-1}>
        <span aria-hidden>{children}</span>
      </IconWrapper>
    </IconButtonRoot>
  );
};

export default IconButton;
