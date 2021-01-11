import React from "react";
import styled from "styled-components";

interface MenuIconProps {
  navOpen: boolean;
}

const LinePath = styled.path`
  will-change: transform, opacity;
  transition: transform 300ms ease-out, opacity 300ms ease-out;
`;

const MiddleLinePath = styled(LinePath)<MenuIconProps>`
  opacity: ${(props) => (props.navOpen ? "0" : "1")};
`;

const TopLinePath = styled(LinePath)<MenuIconProps>`
  transform: rotate(${(props) => (props.navOpen ? "45deg" : "0")});
  transform-origin: 10% 35%;
`;

const BottomLinePath = styled(LinePath)<MenuIconProps>`
  transform: rotate(${(props) => (props.navOpen ? "-45deg" : "0")});
  transform-origin: 15% 65%;
`;

const MenuIcon: React.FC<MenuIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      height="100%"
      width="100%"
    >
      <MiddleLinePath
        fill="currentColor"
        d="M492,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h472c11.046,0,20-8.954,20-20S503.046,236,492,236z"
        {...props}
      />
      <TopLinePath
        fill="currentColor"
        d="M492,76H20C8.954,76,0,84.954,0,96s8.954,20,20,20h472c11.046,0,20-8.954,20-20S503.046,76,492,76z"
        {...props}
      />
      <BottomLinePath
        fill="currentColor"
        d="M492,396H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h472c11.046,0,20-8.954,20-20    C512,404.954,503.046,396,492,396z"
        {...props}
      />
    </svg>
  );
};

export default MenuIcon;
