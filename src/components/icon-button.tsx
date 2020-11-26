import React, { HTMLProps } from "react";
import styled from "styled-components";

const IconWrapper = styled.div`
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

const IconButtonRoot = styled.button`
  background: transparent;
  border: none;
  padding: 0;

  &:focus ${IconWrapper} {
    outline: 5px auto -webkit-focus-ring-color;
  }
`;

const IconButton: React.FC<Omit<
  HTMLProps<HTMLButtonElement>,
  "ref" | "type" | "as"
>> = ({ children, ...buttonProps }) => {
  return (
    <IconButtonRoot {...buttonProps}>
      <IconWrapper tabIndex={-1}>{children}</IconWrapper>
    </IconButtonRoot>
  );
};

export default IconButton;
