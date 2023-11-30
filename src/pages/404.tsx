import React from "react";
import { HeadProps, PageProps } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

export const Head = (props: HeadProps) => (
  <Seo title="Not Found" pathname={props.location.pathname} />
)

const Home: React.FC<PageProps> = () => {
  return (
    <Layout>404, page not found.</Layout>
  );
};

export default Home;
