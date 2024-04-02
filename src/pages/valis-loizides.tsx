import React from "react";
import { PageProps, graphql, HeadProps } from "gatsby";

import Layout from "../components/layout";
import TextPage from "../components/text-page";
import SafeImage from "../components/safe-image";
import Seo from "../components/seo";

export const query = graphql`
  query BiographyQuery {
    wp {
      biographyPage {
        biographyFieldGroup {
          biographyText {
            paragraph
          }
          biographyImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 70
                    layout: FULL_WIDTH
                    formats: [AUTO, WEBP]
                  )
                  fixedImage: gatsbyImageData(
                    width: 960
                    quality: 70
                    layout: FIXED
                    formats: [AUTO, WEBP]
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`;

function getAcfData(props) {
  return props.data.wp.biographyPage.biographyFieldGroup;
}
export const Head = (props: HeadProps<{}, PageProps>) => {
  const { biographyImage, biographyText } = getAcfData(props);
  const imageData = biographyImage.node.localFile;

  return (
    <Seo
      pathname={props.location.pathname}
      title="Valis Loizides"
      description={biographyText[0].paragraph}
      image={imageData?.childImageSharp?.fixedImage?.images?.fallback?.src}
    />
  );
};

const ValisLoizides: React.FC<PageProps> = (props) => {
  const { biographyImage, biographyText } = getAcfData(props);
  const imageData = biographyImage.node.localFile;
  return (
    <Layout {...props}>
      <TextPage>
        <SafeImage node={imageData} alt="Valis Loizides" />
        {biographyText.map(({ paragraph }) => {
          return <p>{paragraph}</p>;
        })}
      </TextPage>
    </Layout>
  );
};

export default ValisLoizides;
