import React from "react";
import { PageProps } from "gatsby";

import Layout from "../components/layout";
import Carousel from "../components/carousel";

const Home: React.FC<PageProps> = (props) => {
  return (
    <Layout>
      <Carousel />
    </Layout>
  );
};

export default Home;
