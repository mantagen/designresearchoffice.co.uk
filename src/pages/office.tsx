import React from "react";
import { HeadProps, PageProps, graphql } from "gatsby";

import Layout from "../components/layout";
import TextPage from "../components/text-page";
import Seo from "../components/seo";

export const Head = (props: HeadProps) => (
  <Seo
    pathname={props.location.pathname}
    title="Office"
    description={`The practice was established in 2006 to provide services and solutions
    in architecture, design, urbanism and landscape. It operates within
    the traditional boundaries of architecture and urbanism. Each
    project draws equally from research and design, initiating conceptual
    studies to complex technical implementations. The Design Research
    Office is dedicated to realizing architecture, and focuses its ongoing
    research around creating a singular architectural language that
    springs from multiple collaborative processes.`
      .split("\n")
      .map((a) => a.trim())
      .join(" ")}
  />
);

const Office: React.FC<PageProps<Queries.OfficePageQuery>> = (props) => {
  return (
    <Layout {...props}>
      <TextPage
        dangerouslySetInnerHTML={{
          __html:
            props?.data?.wp?.officePage?.officeFieldGroup?.officeText || "",
        }}
      />
    </Layout>
  );
};

export const query = graphql`
  query OfficePage {
    wp {
      officePage {
        officeFieldGroup {
          officeText
        }
      }
    }
  }
`;

export default Office;
