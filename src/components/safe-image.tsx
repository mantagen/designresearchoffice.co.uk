import React from "react";
import Img, { FluidObject } from "gatsby-image";
import ImageWrapper from "./image-wrapper";
import { colors } from "../theme";

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

const SafeImage: React.FC<SafeImageProps> = (props) => {
  const { alt, node } = props;
  const { name, childImageSharp } = node;

  if (!childImageSharp) {
    console.warn(`SafeImage called without image, file name: ${name}`);
    return null;
  }

  return (
    <ImageWrapper>
      <Img
        fluid={childImageSharp.fluid}
        backgroundColor={colors.backgoundGrey}
        alt={alt}
      />
    </ImageWrapper>
  );
};

export default SafeImage;
