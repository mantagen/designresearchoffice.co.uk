import React, { Fragment, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link, GatsbyLinkProps } from "gatsby";
import "fontsource-roboto";
import { FocusOn } from "react-focus-on";

import GlobalStyle from "./global-style";
import works from "../works.json";
import useIsMobile, { MOBILE_BREAK_POINT } from "../helpers/useIsMobile";
import {
  colors,
  PADDING_HORIZONTAL_DESKTOP,
  PADDING_HORIZONTAL_MOBILE,
  PADDING_VERTICAL_DESKTOP,
  PADDING_VERTICAL_MOBILE,
} from "../theme";
import MenuIcon from "./menu-icon";
import IconButton from "./icon-button";

const leftPanelWidthPx = 490;

const mainPaddingHorizontalMobile = css`
  padding-right: ${PADDING_HORIZONTAL_MOBILE};
  padding-left: ${PADDING_HORIZONTAL_MOBILE};
`;

const ArchitectSpan = styled.span`
  margin-left: 6px;
`

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
        Valis Loizides <ArchitectSpan>Architect</ArchitectSpan>
      </Fragment>
    ),
  },
];

const Main = styled.main`
  padding-right: ${PADDING_HORIZONTAL_DESKTOP};
  padding-left: ${leftPanelWidthPx}px;
  padding-top: ${PADDING_VERTICAL_DESKTOP};
  padding-bottom: ${PADDING_VERTICAL_DESKTOP};
  max-width: ${1110 + leftPanelWidthPx}px;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    ${mainPaddingHorizontalMobile}
    padding-top: ${PADDING_VERTICAL_DESKTOP};
    padding-bottom: ${PADDING_VERTICAL_DESKTOP};
  }
`;

const PrimaryNavLi = styled.li`
  // TODO: have doing this because otherwise on ios there is a bug where
  // the first link has a focus outline at certain times.
  // The bug is introduced by FocusOn
  @media (hover: none) and (pointer: coarse) {
    &:first-of-type {
      a:focus {
        outline: none;
      }
    }
  }
`;
const NavLink = styled(Link)`
  opacity: 0;
  transition: opacity 1.5s ease;
  text-transform: capitalize;

  &:hover {
    color: ${colors.lightGrey};
  }
`;

const LeftPanel = styled.header<{ isOpen?: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: ${leftPanelWidthPx}px;
  padding-top: ${PADDING_VERTICAL_DESKTOP};
  padding-bottom: ${PADDING_VERTICAL_DESKTOP};

  &:focus-within {
    a {
      opacity: 1;
    }
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    display: none;

    ${(props) =>
    props.isOpen &&
    `
      padding-top: ${PADDING_VERTICAL_MOBILE};
      padding-bottom: ${PADDING_VERTICAL_MOBILE};
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      left: 0;
      z-index: 9;
      background-color: ${colors.white};
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      `}
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex: auto;
`;

const NavToggle = styled(IconButton)`
  display: none;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    display: block;
    cursor: pointer;
    position: fixed;
    top: 1rem;
    right: ${PADDING_HORIZONTAL_MOBILE};
    z-index: 10;
    color: ${colors.midGrey};

    &:active {
      outline: none;
    }

    &:hover {
      color: ${colors.lightGrey};
    }
  }
`;

const PrimaryNavUl = styled.ul<{ alwaysVisible: boolean }>`
  padding-left: ${PADDING_HORIZONTAL_DESKTOP};
  padding-right: ${PADDING_HORIZONTAL_DESKTOP};
  padding-bottom: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover a {
    opacity: 1;
  }

  ${(props) =>
    props.alwaysVisible &&
    `
    a {
      opacity: 1;
    }
  `}

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    ${mainPaddingHorizontalMobile}
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

  flex: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    ${mainPaddingHorizontalMobile}
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
  secondaryNavProps?: SecondaryNavProps;
  forceNavOpen?: boolean;
  location?: Location
}
const Layout: React.FC<LayoutProps> = (props) => {
  const { children, secondaryNavProps, forceNavOpen = false, location } = props; 
  const [navOpen, setNavOpen] = useState(forceNavOpen);
  const [menuHasFocus, setMenuHasFocus] = useState(forceNavOpen);

  const isMobile = useIsMobile();

  useEffect(() => {
    setNavOpen(forceNavOpen);
  }, [forceNavOpen, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      setNavOpen(false);
    }
  }, [isMobile]);

  const onNavToggle = useCallback(() => {
    setNavOpen(!navOpen);
  }, [navOpen]);

  const navLinkOnFocus = useCallback(() => {
    setMenuHasFocus(true);
  }, []);
  const navLinkOnBlur = useCallback(() => {
    setMenuHasFocus(false);
  }, []);

  const navLinkOnClick = (to: string) => () => {
    if (!forceNavOpen) {
      if (to === location?.pathname) {
        setNavOpen(false);
      }
    }
  };

  const secondaryNavAlwaysVisible = Boolean(menuHasFocus || navOpen);

  return (
    <Fragment>
      <GlobalStyle />
      <FocusOn enabled={isMobile && navOpen} autoFocus={false}>
        <LeftPanel isOpen={navOpen}>
          <Nav id="navigation">
            <PrimaryNavUl alwaysVisible={menuHasFocus}>
              {primaryNavLinks.map((props, i) => (
                <PrimaryNavLi key={`nav-primary-${i}`}>
                  <NavLink
                    {...props}
                    activeStyle={{ opacity: 1 }}
                    onFocus={navLinkOnFocus}
                    onBlur={navLinkOnBlur}
                    onClick={navLinkOnClick(props.to)}
                  />
                </PrimaryNavLi>
              ))}
            </PrimaryNavUl>
            {secondaryNavProps && (
              <SecondaryNavUl
                {...secondaryNavProps}
                alwaysVisible={secondaryNavAlwaysVisible}
              >
                {works.map(({ title, slug }) => {
                  const to = `/work/${slug}`;
                  return (
                    <li key={`nav-secondary-${slug}`}>
                      <NavLink
                        to={to}
                        activeStyle={{ opacity: 1 }}
                        onFocus={navLinkOnFocus}
                        onBlur={navLinkOnBlur}
                        onClick={navLinkOnClick(to)}
                      >
                        {title[0]}
                      </NavLink>
                    </li>
                  );
                })}
              </SecondaryNavUl>
            )}
          </Nav>
        </LeftPanel>
        {isMobile && !forceNavOpen && (
          <NavToggle
            aria-controls="navigation"
            aria-expanded={navOpen}
            aria-label={navOpen ? "Close Menu" : "Open Menu"}
            onClick={onNavToggle}
          >
            <MenuIcon navOpen={navOpen} />
          </NavToggle>
        )}
      </FocusOn>
      <Main>{children}</Main>
    </Fragment>
  );
};

export default Layout;
