import React from "react";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

import Layout from "../../components/layout";
import WorkText from "../../components/work-text";
import ImageWrapper from "../../components/image-wrapper";
import SafeImage from "../../components/safe-image";

const MansionHouse: React.FC<PageProps> = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        sort: { fields: name, order: DESC }
        filter: { relativeDirectory: { eq: "images/furniture-i" } }
      ) {
        edges {
          node {
            id
            name
            childImageSharp {
              fluid {
                base64
                aspectRatio
                src
                srcSet
                sizes
              }
            }
          }
        }
      }
    }
  `);

  const [firstImage, ...otherImages] = data.allFile.edges;

  if (!firstImage) {
    // This will happen if the folder is empty or there is no folder
  }

  return (
    <Layout secondaryNavProps={{ alwaysVisible: false }}>
      {firstImage && <SafeImage alt="Furniture I" node={firstImage.node} />}
      <WorkText>
        <h2>
          Furniture I
          <br />
          Cyprus
          <br />
          2019 - 2020
        </h2>
        <br />
        <p>
          The design of this furniture was developed through a process of
          subtracting all unnecessary elements. The result  is silent,
          deliberately absent, and radically anonymous.{" "}
        </p>
      </WorkText>
      {otherImages.map((image, i) => (
        <ImageWrapper>
          <Img
            key={`mansion-house-image-${i}`}
            fluid={image.node.childImageSharp.fluid}
            alt="Mansion House"
          />
        </ImageWrapper>
      ))}
    </Layout>
  );
};

export default MansionHouse;
