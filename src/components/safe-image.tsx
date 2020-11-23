import React from "react";
import Img, { FluidObject } from "gatsby-image";
import ImageWrapper from "./image-wrapper";

export type ImageNode = {
  id: string;
  name: string;
  childImageSharp: {
    fluid: FluidObject | FluidObject[];
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
      <Img fluid={childImageSharp.fluid} backgroundColor={"#f2f2f2"} alt={alt} />
    </ImageWrapper>
  );
};

export default SafeImage;
