import React from "react";
import { PageProps } from "gatsby";
import Layout from "../components/layout";

const Work: React.FC<PageProps> = () => {
  return (
    <Layout forceNavOpen secondaryNavProps={{ alwaysVisible: true }}></Layout>
  );
};

export default Work;
