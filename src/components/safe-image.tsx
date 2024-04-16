import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ImageWrapper from "./image-wrapper";
import { colors } from "../theme";

export type ImageNode = {
  id: string | null;
  altText: string | null;
  childImageSharp: Queries.ImageSharp | null;
};
type SafeImageProps = {
  node?: ImageNode | null;
  alt?: string | null;
};

const SafeImage: React.FC<SafeImageProps> = (props) => {
  const { alt, node } = props;
  if (!node) {
    console.warn("SafeImage called without node");
    return null;
  }

  const { altText, childImageSharp } = node;

  if (!childImageSharp) {
    console.warn(`SafeImage called without childImageSharp, file: ${altText}`);
    return null;
  }

  const image = getImage(childImageSharp.gatsbyImageData);

  if (!image) {
    console.warn(`SafeImage called without image, file: ${altText}`);
    return null;
  }

  return (
    <ImageWrapper>
      <GatsbyImage
        image={image}
        backgroundColor={colors.backgroundGrey}
        alt={alt || node.altText || ""}
      />
    </ImageWrapper>
  );
};

export default SafeImage;
