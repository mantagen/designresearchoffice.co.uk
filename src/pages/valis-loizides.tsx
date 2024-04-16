import React from "react";
import { PageProps, graphql, HeadProps } from "gatsby";

import Layout from "../components/layout";
import TextPage from "../components/text-page";
import SafeImage from "../components/safe-image";
import Seo from "../components/seo";

function getAcfData(data: Queries.BiographyPageQuery) {
  const acfData = data?.wp?.biographyPage?.biographyFieldGroup;
  if (!acfData) throw new Error("No acfData");
  return acfData;
}
export const Head = (
  props: HeadProps<Queries.BiographyPageQuery, PageProps>
) => {
  const { biographyImage, biographyText } = getAcfData(props.data);
  const imageData = biographyImage?.node.localFile;
  if (!imageData) throw new Error("No imageData");
  if (!biographyText) throw new Error("No biographyText");

  return (
    <Seo
      pathname={props.location.pathname}
      title="Valis Loizides"
      description={biographyText[0]?.paragraph}
      image={imageData?.childImageSharp?.fixedImage?.images?.fallback?.src}
    />
  );
};

const ValisLoizides: React.FC<PageProps<Queries.BiographyPageQuery>> = (
  props
) => {
  const { biographyImage, biographyText } = getAcfData(props.data);
  const imageData = biographyImage?.node.localFile;
  return (
    <Layout {...props}>
      <TextPage>
        <SafeImage node={imageData} alt="Valis Loizides" />
        {biographyText.map((t) => {
          return <p>{t?.paragraph}</p>;
        })}
      </TextPage>
    </Layout>
  );
};

export const query = graphql`
  query BiographyPage {
    wp {
      biographyPage {
        biographyFieldGroup {
          biographyText {
            paragraph
          }
          biographyImage {
            node {
              localFile {
                id
                altText: name
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

export default ValisLoizides;
