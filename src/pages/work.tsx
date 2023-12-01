import React from "react";
import { HeadProps, PageProps } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

export const Head = (props: HeadProps) => (
  <Seo
    pathname={props.location.pathname}
    title="Works" />

);

const Work: React.FC<PageProps> = (props) => {
  return (
    <Layout
      {...props}
      forceNavOpen
      secondaryNavProps={{ alwaysVisible: true }}
    />
  );
};

export default Work;
