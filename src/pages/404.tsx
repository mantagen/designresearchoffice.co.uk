import React from "react";
import { PageProps } from "gatsby";
import Layout from "../components/layout";

const Home: React.FC<PageProps> = (props) => {
  return (
    <Layout seoProps={{ title: "Not Found" }}>404, page not found.</Layout>
  );
};

export default Home;
