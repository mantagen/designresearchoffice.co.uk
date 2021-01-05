import React from "react";
import Img, { FluidObject } from "gatsby-image";
import ImageWrapper from "./image-wrapper";
import styled from "styled-components";

export type ImageNode = {
  id: string;
  name: string;
  childImageSharp: {
    fluid: FluidObject | FluidObject[];
    fixed?: {
      src: string;
    };
  } | null;
};
type SafeImageProps = {
  node: ImageNode;
  alt: string;
};

const TemporarilyRemoveBorders = styled.div`
  overflow: hideden;

  img {
    transform: scale(1.02);
  }
`;

const SafeImage: React.FC<SafeImageProps> = (props) => {
  const { alt, node } = props;
  const { name, childImageSharp } = node;

  if (!childImageSharp) {
    console.warn(`SafeImage called without image, file name: ${name}`);
    return null;
  }

  return (
    <ImageWrapper>
      <TemporarilyRemoveBorders>
        <Img
          fluid={childImageSharp.fluid}
          backgroundColor={"#f2f2f2"}
          alt={alt}
        />
      </TemporarilyRemoveBorders>
    </ImageWrapper>
  );
};

export default SafeImage;
