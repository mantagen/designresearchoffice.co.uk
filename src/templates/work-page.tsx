import React, { Fragment } from "react";
import { PageProps } from "gatsby";

import Layout from "../components/layout";
import WorkText from "../components/work-text";
import SafeImage from "../components/safe-image";
import { ImageData } from "../types/image-data";
import styled from "styled-components";

const Container = styled.div`
  max-width: 632px;
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
    <Layout secondaryNavProps={{ alwaysVisible: false }}>
      <Container>
        {firstImage && <SafeImage alt="Mansion House" node={firstImage.node} />}
        <WorkText>
          <h2>
            {title.map((part, i) => (
              <Fragment>
                {part}
                <br />
              </Fragment>
            ))}
          </h2>
          <br />
          {text.map((part) => (
            <p>{part}</p>
          ))}
        </WorkText>
        {otherImages.map((image, i) => (
          <SafeImage
            key={`work-image-${image.node.id}`}
            alt="Mansion House"
            node={image.node}
          />
        ))}
      </Container>
    </Layout>
  );
};

export default WorkPage;
