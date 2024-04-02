import React from "react";
import { PageProps, graphql } from "gatsby";

import Layout from "../components/layout";
import Carousel from "../components/carousel";

const Home: React.FC<PageProps<Queries.HomeCarouselQuery>> = (props) => {
  const nodes = props?.data?.wp?.homePage?.homeFieldGroup?.homeCarousel?.nodes;

  return (
    <Layout {...props}>
      <Carousel nodes={nodes} />
    </Layout>
  );
};

export const query = graphql`
  query HomeCarousel {
    wp {
      homePage {
        homeFieldGroup {
          homeCarousel {
            nodes {
              localFile {
                id
                altText: name
                childImageSharp {
                  gatsbyImageData(
                    width: 1200
                    quality: 70
                    layout: CONSTRAINED
                    aspectRatio: 1.5
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

export default Home;
