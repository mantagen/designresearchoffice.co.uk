import React, { Fragment, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link, GatsbyLinkProps } from "gatsby";
import "fontsource-roboto";
import { FocusOn } from "react-focus-on";

import GlobalStyle from "./global-style";
import works from "../works.json";
import Seo, { SeoProps } from "./seo";
import getIsMobile from "../helpers/getIsMobile";

const leftPanelWidth = "320px";

const mainPaddingHorizontal = "2rem";

const sitePaddingVertical = css`
  padding-top: 2rem;
  padding-bottom: 2rem;

  @media (max-width: 600px) {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`;

type NavLinkProps = Omit<GatsbyLinkProps<undefined>, "ref">;
const primaryNavLinks: NavLinkProps[] = [
  {
    to: "/",
    children: "Design Research Office",
    style: { opacity: 1 },
  },
  {
    to: "/work",
    children: "Work",
    partiallyActive: true,
  },
  {
    to: "/office",
    children: "Office",
  },
  {
    to: "/valis-loizides",
    children: (
      <Fragment>
        {" "}
        Valis Loizides <span className="spacer">Architect</span>
      </Fragment>
    ),
  },
];

const Main = styled.main`
  padding-right: 2rem;
  padding-left: ${leftPanelWidth};
  max-width: 1000px;

  @media (max-width: 600px) {
    padding-right: 1rem;
    padding-left: 1rem;
  }
  ${sitePaddingVertical}
`;

const NavLink = styled(Link)`
  opacity: 0;
  transition: opacity 1.5s ease;
  text-transform: capitalize;

  &:hover {
    color: #cecece;
  }
`;

const LeftPanel = styled.nav<{ isOpen?: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: ${leftPanelWidth};

  @media (max-width: 600px) {
    display: none;

    ${(props) =>
      props.isOpen &&
      `
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      left: 0;
      z-index: 9;
      background-color: white;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      `}
    }
  }

  ${sitePaddingVertical}
`;

const NavToggle = styled.button`
  display: none;

  @media (max-width: 600px) {
    display: block;
    cursor: pointer;
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    height: 2rem;
    width: 2rem;
    padding: 0.5rem;
    z-index: 10;
    color: transparent;
    background: transparent;
    border: none;

    &::after {
      color: black;
      content: "☰";
      display: block;
      position: absolute;
      width: 1rem;
      height: 1rem;
      margin: 0.5rem;
      top: 0;
      right: 0;
      color: #333;
      font-size: 1rem;
      font-family: inherit;
    }
  }
`;

const PrimaryNavUl = styled.ul<{ forceOpen: boolean }>`
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover a {
    opacity: 1;
  }

  @media (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
    a {
      opacity: 1;
    }
  }
`;

interface SecondaryNavProps {
  alwaysVisible: boolean;
}
const SecondaryNavUl = styled.ul<SecondaryNavProps>`
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;

  flex: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
    a {
      opacity: 1;
    }
  }

  ${(props) =>
    props.alwaysVisible &&
    `
    a {
      opacity: 1;
    }
  `}
  &:hover a {
    opacity: 1;
  }
`;

interface LayoutProps {
  seoProps?: SeoProps;
  secondaryNavProps?: SecondaryNavProps;
  forceNavOpen?: boolean;
}
const Layout: React.FC<LayoutProps> = (props) => {
  const { children, secondaryNavProps, seoProps, forceNavOpen = false } = props;
  const [navOpen, setNavOpen] = useState(forceNavOpen);

  const isMobile = getIsMobile();

  useEffect(() => {
    setNavOpen(forceNavOpen);
  }, [forceNavOpen]);

  useEffect(() => {
    if (!isMobile) {
      setNavOpen(false);
    }
  }, [isMobile]);

  const onNavToggle = useCallback(() => {
    setNavOpen(!navOpen);
  }, [navOpen]);

  return (
    <Fragment>
      <GlobalStyle />
      <Seo {...seoProps} />
      <FocusOn enabled={isMobile && navOpen}>
        <LeftPanel isOpen={navOpen}>
          <PrimaryNavUl forceOpen={navOpen}>
            {primaryNavLinks.map((props, i) => (
              <li key={`nav-${i}`}>
                <NavLink {...props} activeStyle={{ opacity: 1 }} />
              </li>
            ))}
          </PrimaryNavUl>
          {secondaryNavProps && (
            <SecondaryNavUl {...secondaryNavProps}>
              {works.map(({ title, slug }) => (
                <li key={`nav-${slug}`}>
                  <NavLink to={`/work/${slug}`} activeStyle={{ opacity: 1 }}>
                    {title[0]}
                  </NavLink>
                </li>
              ))}
            </SecondaryNavUl>
          )}
        </LeftPanel>
        <NavToggle aria-label="Toggle menu" onClick={onNavToggle} />
      </FocusOn>
      <Main>{children}</Main>
    </Fragment>
  );
};

export default Layout;
