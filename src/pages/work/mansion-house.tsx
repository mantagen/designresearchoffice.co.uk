import React from "react";
import { graphql, PageProps, useStaticQuery } from "gatsby";

import Layout from "../../components/layout";
import WorkText from "../../components/work-text";
import SafeImage from "../../components/safe-image";
import { ImageData } from "../../types/image-data";

const MansionHouse: React.FC<PageProps> = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        sort: { fields: name, order: DESC }
        filter: { relativeDirectory: { eq: "images/mansion-house" } }
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

  return (
    <Layout secondaryNavProps={{ alwaysVisible: false }}>
      <SafeImage alt="Mansion House" node={firstImage.node} />
      <WorkText>
        <h2>
          Mansion House
          <br />
          Nicosia, Cyprus
          <br />
          2020 - ongoing
        </h2>
        <br />
        <p>
          This listed building in the heart of Nicosia was built by a local
          prominent textile merchant in the 1930s. The architectural reimaging
          of the house and its existing envelope was approached not as a
          preservation project nor as a new architecture. Contrasting dualities
          that are usually kept separate confront each other in a state of
          permanent interaction: New and old, horizontal and vertical, wide and
          narrow, open and closed – each of these contrasts establish the range
          of oppositions that define this new domestic environment. This design
          approach follows the idea of refining through removing, meticulously
          paring away until what is left cannot be improved by further
          reduction: sensual space, where the primary experience has been
          reduced to the quality of light, materials and proportions. This
          project’s aim was to rethink the architecture while simultaneously
          dealing with past and future.
        </p>
      </WorkText>
      {otherImages.map((image, i) => (
        <SafeImage
          key={`work-image-${image.node.id}`}
          alt="Mansion House"
          node={image.node}
        />
      ))}
    </Layout>
  );
};

export default MansionHouse;
