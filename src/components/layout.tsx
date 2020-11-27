import React, { Fragment, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link, GatsbyLinkProps } from "gatsby";
import "fontsource-roboto";
import { FocusOn } from "react-focus-on";

import GlobalStyle from "./global-style";
import works from "../works.json";
import Seo, { SeoProps } from "./seo";
import getIsMobile from "../helpers/getIsMobile";
import {
  colors,
  PADDING_HORIZONTAL_DESKTOP,
  PADDING_HORIZONTAL_MOBILE,
  PADDING_VERTICAL_DESKTOP,
  PADDING_VERTICAL_MOBILE,
} from "../theme";
import MenuButton from "./menu-button";
import IconButton from "./icon-button";

const leftPanelWidth = "490px";

const mainPaddingHorizontalMobile = css`
  padding-right: ${PADDING_HORIZONTAL_MOBILE};
  padding-left: ${PADDING_HORIZONTAL_MOBILE};
`;

const sitePaddingVertical = css`
  padding-top: ${PADDING_VERTICAL_DESKTOP};
  padding-bottom: ${PADDING_VERTICAL_DESKTOP};

  @media (max-width: 600px) {
    padding-top: ${PADDING_VERTICAL_MOBILE};
    padding-bottom: ${PADDING_VERTICAL_MOBILE};
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
        Valis Loizides <span className="spacer">Architect</span>
      </Fragment>
    ),
  },
];

const Main = styled.main`
  padding-right: ${PADDING_HORIZONTAL_DESKTOP};
  padding-left: ${leftPanelWidth};
  max-width: calc(1110px + ${leftPanelWidth});

  @media (max-width: 600px) {
    ${mainPaddingHorizontalMobile}
  }
  ${sitePaddingVertical}
`;

const NavLink = styled(Link)`
  opacity: 0;
  transition: opacity 1.5s ease;
  text-transform: capitalize;

  &:hover {
    color: ${colors.lightGrey};
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

  &:focus-within {
    a {
      opacity: 1;
    }
  }

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

const NavToggle = styled(IconButton)`
  display: none;

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
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
  seoProps?: SeoProps;
  secondaryNavProps?: SecondaryNavProps;
  forceNavOpen?: boolean;
}
const Layout: React.FC<LayoutProps> = (props) => {
  const { children, secondaryNavProps, seoProps, forceNavOpen = false } = props;
  const [navOpen, setNavOpen] = useState(forceNavOpen);
  const [menuHasFocus,setMenuHasFocus]= useState(false)

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

  const navLinkOnFocus = useCallback(() => {
    setMenuHasFocus(true);
  }, []);
  const navLinkOnBlur = useCallback(() => {
    setMenuHasFocus(false);
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Seo {...seoProps} />
      <FocusOn enabled={isMobile && navOpen}>
        <LeftPanel isOpen={navOpen}>
          <PrimaryNavUl alwaysVisible={menuHasFocus}>
            {primaryNavLinks.map((props, i) => (
              <li key={`nav-${i}`}>
                <NavLink
                  {...props}
                  
                  activeStyle={{ opacity: 1 }}
                  onFocus={navLinkOnFocus}
                  onBlur={navLinkOnBlur}
                />
              </li>
            ))}
          </PrimaryNavUl>
          {secondaryNavProps && (
            <SecondaryNavUl {...secondaryNavProps} alwaysVisible={menuHasFocus}>
              {works.map(({ title, slug }) => (
                <li key={`nav-${slug}`}>
                  <NavLink
                    to={`/work/${slug}`}
                    activeStyle={{ opacity: 1 }}
                    onFocus={navLinkOnFocus}
                    onBlur={navLinkOnBlur}
                  >
                    {title[0]}
                  </NavLink>
                </li>
              ))}
            </SecondaryNavUl>
          )}
        </LeftPanel>
        <NavToggle aria-label="Toggle menu" onClick={onNavToggle}>
          <MenuButton />
        </NavToggle>
      </FocusOn>
      <Main>{children}</Main>
    </Fragment>
  );
};

export default Layout;
