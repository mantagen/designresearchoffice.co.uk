import React, { Fragment } from "react";
import styled from "styled-components";
import { graphql, Link, GatsbyLinkProps, useStaticQuery } from "gatsby";
import "fontsource-roboto";

import GlobalStyle from "./global-style";

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
  margin: 32px 50px 0 275px;
  max-width: 632px;

  @media (max-width: 600px) {
    margin: 3rem 1rem;
    max-width: 100vw;
  }
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
      left: 0;
      z-index: 9;
      background-color: white;
      padding: 1rem;
      `}
    }
  }
`;

const NavToggle = styled.button`
  display: none;

  @media (max-width: 600px) {
    display: block;
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 10;
    color: transparent;
    background: transparent;
    border: none;
    outline: none;

    &::after {
      color: black;
      content: "☰";
      display: block;
      position: absolute;
      width: 1rem;
      height: 1rem;
      color: black;
      top: 0;
      right: 0;
      font-size: 1.1rem;
      color: black;
    }
  }
`;

const PrimaryNavUl = styled.ul`
  padding-top: 32px;
  padding-left: 38px;
  padding-right: 38px;
  padding-bottom: 34px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover a {
    opacity: 1;
  }
`;

interface SecondaryNavProps {
  alwaysVisible: boolean;
}
const SecondaryNavUl = styled.ul<SecondaryNavProps>`
  padding-left: 38px;
  padding-right: 38px;
  flex: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

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
}
const Layout: React.FC<LayoutProps> = (props) => {
  const { children, secondaryNavProps } = props;

  const data = useStaticQuery(graphql`
    query {
      allFile(
        sort: { fields: name, order: DESC }
        filter: { relativeDirectory: { eq: "pages/work" } }
      ) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `);

  const works = data.allFile.edges;

  return (
    <Fragment>
      <GlobalStyle />
      <LeftPanel>
        <PrimaryNavUl className="primary-nav hover-target--1">
          {primaryNavLinks.map((props, i) => (
            <li key={`nav-${i}`}>
              <NavLink {...props} activeStyle={{ opacity: 1 }} />
            </li>
          ))}
        </PrimaryNavUl>
        {secondaryNavProps && (
          <SecondaryNavUl {...secondaryNavProps}>
            {works.map(({ node }) => (
              <li key={`nav-${node.id}`}>
                <NavLink
                  to={`/work/${node.name.toLowerCase()}`}
                  activeStyle={{ opacity: 1 }}
                >
                  {node.name.split("-").join(" ")}
                </NavLink>
              </li>
            ))}
          </SecondaryNavUl>
        )}
      </LeftPanel>
      <NavToggle>menu</NavToggle>
      <Main>{children}</Main>
    </Fragment>
  );
};

export default Layout;
