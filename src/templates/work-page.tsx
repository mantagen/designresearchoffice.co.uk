import React from "react";
import { HeadProps, PageProps } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import WorkText from "../components/work-text";
import SafeImage, { ImageNode } from "../components/safe-image";
import { TEXT_MAX_WIDTH } from "../theme";
import Seo from "../components/seo";

export const Head = (props: HeadProps<{}, WorkPageProps>) => {
  const { images, titleHtml, paragraphs } = props.pageContext;
  const [firstImage] = images;

  return (
    <Seo
      title={titleHtml}
      description={paragraphs[0]}
      pathname={props.location.pathname}
      image={
        firstImage?.localFile.childImageSharp?.fixedImage?.images?.fallback?.src
      }
    />
  );
};

const Container = styled.div`
  max-width: ${TEXT_MAX_WIDTH};
  margin-top: 155px;
`;
export type WorkPageProps = {
  slug: string;
  titleHtml: string;
  paragraphs: string[];
  images: {
    localFile: ImageNode & {
      childImageSharp: Queries.ImageSharp & {
        fixedImage: Queries.ImageSharp["gatsbyImageData"];
      };
    };
  }[];
};
const WorkPage: React.FC<PageProps<null, WorkPageProps>> = (props) => {
  const { images, titleHtml, paragraphs } = props.pageContext;

  const [firstImage, ...otherImages] = images;

  return (
    <Layout secondaryNavProps={{ alwaysVisible: false }}>
      <Container>
        {firstImage && <SafeImage node={firstImage.localFile} />}
        <WorkText>
          <h2
            dangerouslySetInnerHTML={{
              __html: titleHtml.replace("\n", "<br />"),
            }}
          />
          <br />
          {paragraphs?.map((para, i) => (
            <p key={`work-page__text-paragraph__${i}`}>
              {para.replace("\n", "<br />")}
            </p>
          ))}
        </WorkText>
        {otherImages.map((image, i) => (
          <SafeImage key={`work-page__image__${i}`} node={image.localFile} />
        ))}
      </Container>
    </Layout>
  );
};

export default WorkPage;
