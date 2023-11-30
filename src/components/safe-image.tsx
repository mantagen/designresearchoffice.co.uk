import React from "react";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";
import ImageWrapper from "./image-wrapper";
import { colors } from "../theme";

export type ImageNode = {
  id: string;
  name: string;
  childImageSharp: { gatsbyImageData: ImageDataLike };
};
type SafeImageProps = {
  node: ImageNode;
  alt: string;
};

const SafeImage: React.FC<SafeImageProps> = (props) => {
  const { alt, node } = props;
  const { name, childImageSharp } = node;

  const image = getImage(childImageSharp.gatsbyImageData)

  if (!image) {
    console.warn(`SafeImage called without image, file name: ${name}`);
    return null;
  }

  return (
    <ImageWrapper>
      <GatsbyImage
        image={image}
        backgroundColor={colors.backgroundGrey}
        alt={alt}
      />
    </ImageWrapper>
  );
};

export default SafeImage;
