import React, { Fragment } from "react";
import { PageProps } from "gatsby";
import Layout from "../components/layout";
import Carousel from "../components/carousel";
import styled from "styled-components";

import GlobalStyle from "../components/global-style";

const Title = styled.h1`
  padding-top: 32px;
  padding-left: 38px;
  padding-right: 38px;
  padding-bottom: 34px;
`;

const DevelopmentSpan = styled.span`
  color: #cecece;
`;

const Home: React.FC<PageProps> = (props) => {
  return (
    <Fragment>
      <GlobalStyle />
      <Title>
        Design Research Office
        <br />
        <DevelopmentSpan>Website in development</DevelopmentSpan>
      </Title>
    </Fragment>
  );
};

export default Home;
