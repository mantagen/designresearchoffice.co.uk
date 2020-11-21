import React from "react";
import Img, { FluidObject } from "gatsby-image";
import ImageWrapper from "./image-wrapper";

type SafeImageProps = {
  node: {
    id: string;
    name: string;
    childImageSharp: {
      fluid: FluidObject | FluidObject[];
    } | null;
  };
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
      <Img fluid={childImageSharp.fluid} alt={alt} />
    </ImageWrapper>
  );
};

export default SafeImage;
