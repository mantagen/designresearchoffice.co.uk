import React, { Fragment } from "react";
import { PageProps } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import WorkText from "../components/work-text";
import SafeImage from "../components/safe-image";
import { ImageData } from "../types/image-data";
import { textWidth } from "../theme";

const Container = styled.div`
  max-width: ${textWidth};
  margin-top: 155px;
`;
interface WorkPageProps {
  slug: string;
  title: string[];
  text: string[];
  images: ImageData[];
}
const WorkPage: React.FC<PageProps<null, WorkPageProps>> = (props) => {
  const { images, title, text } = props.pageContext;

  const [firstImage, ...otherImages] = images;

  return (
    <Layout
      seoProps={{
        title: title.join(", "),
        description: text[0],
        image: firstImage?.node.childImageSharp?.fixed?.src,
      }}
      secondaryNavProps={{ alwaysVisible: false }}
    >
      <Container>
        {firstImage && <SafeImage alt="Mansion House" node={firstImage.node} />}
        <WorkText>
          <h2>
            {title.map((part, i) => (
              <Fragment key={`work-page__title-fragment__${i}`}>
                {part}
                <br />
              </Fragment>
            ))}
          </h2>
          <br />
          {text.map((part, i) => (
            <p key={`work-page__text-paragraph__${i}`}>{part}</p>
          ))}
        </WorkText>
        {otherImages.map((image, i) => (
          <SafeImage
            key={`work-page__image__${i}`}
            alt="Mansion House"
            node={image.node}
          />
        ))}
      </Container>
    </Layout>
  );
};

export default WorkPage;
