import React from "react";
import { PageProps } from "gatsby";

import Layout from "../components/layout";
import Carousel from "../components/carousel";

const Home: React.FC<PageProps> = (props) => {
  return (
    <Layout {...props}>
      <Carousel />
    </Layout>
  );
};

export default Home;
