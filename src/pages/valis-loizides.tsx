import React from "react";
import { PageProps, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import TextPage from "../components/text-page";
import ImageWrapper from "../components/image-wrapper";

const ValisLoizides: React.FC<PageProps> = (props) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/valis.jpg" }) {
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
  `);

  return (
    <Layout>
      <TextPage>
        <ImageWrapper>
          <Img fluid={data.file.childImageSharp.fluid} alt="Valis Loizides" />
        </ImageWrapper>
        <p>
          Valis Loizides was born in Cyprus. He graduated from the Architectural
          Association School of Architecture in London with Honours in 1997. He
          continued at the AA for Postgraduate studies until 1999, on a full
          scholarship offered by the Architectural Association, and received a
          Master of Arts. He established the Design Research Office in 2006, and
          practices architecture internationally in the private sector, with
          offices in the UK and Cyprus.
        </p>
        <p>
          Valis has a deep interest in Contemporary Art. Since 2000, he has been
          following art in London, New York, Berlin and Milan. He soon
          discovered he had a strong affinity with abstract art, and this
          passion inspired him to create his own private collection of
          contemporary, international art, with an emphasis on paintings and
          drawings.
        </p>
      </TextPage>
    </Layout>
  );
};

export default ValisLoizides;
