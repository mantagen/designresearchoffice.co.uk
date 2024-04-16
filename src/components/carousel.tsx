import React, { CSSProperties, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";

import styled from "styled-components";
import RightArrow from "./right-arrow";
import { colors } from "../theme";
import IconButton from "./icon-button";

const viewportCss: CSSProperties = {
  overflow: "hidden",
};
const containerCss: CSSProperties = {
  display: "flex",
};
const slideCss: CSSProperties = {
  position: "relative",
  minWidth: "100%",
};

const CarouselRoot = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const RightArrowWrapper = styled(IconButton)`
  margin-left: auto;
  margin-top: 1rem;
  color: ${colors.midGrey};

  &:hover {
    color: ${colors.lightGrey};
  }
`;

type ImageNodes =
  | readonly {
      readonly localFile: {
        readonly id: string;
        readonly altText: string | null;
        readonly childImageSharp: {
          readonly gatsbyImageData: IGatsbyImageData;
        } | null;
      } | null;
    }[]
  | undefined;
const Carousel = (props: { nodes: ImageNodes }) => {
  const nodes = props.nodes;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return;
      }

      if (emblaApi) {
        switch (event.key) {
          case "Left":
          case "ArrowLeft":
            return emblaApi.scrollPrev();

          case "Right":
          case "ArrowRight":
            return emblaApi.scrollNext();
        }
      }
    },
    [emblaApi]
  );

  const onClick = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown, { passive: true });

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <CarouselRoot>
      <div onClick={onClick} style={viewportCss} ref={emblaRef}>
        <div style={containerCss}>
          {nodes?.map((node) => {
            const imageData = node?.localFile?.childImageSharp?.gatsbyImageData;
            if (!imageData) {
              return null;
            }
            const image = getImage(imageData);
            if (!image) {
              return null;
            }
            return (
              <div key={`carousel-image-${node.localFile.id}`} style={slideCss}>
                <GatsbyImage
                  image={image}
                  alt={node?.localFile?.altText || ""}
                  backgroundColor={colors.backgroundGrey}
                  loading="eager"
                />
              </div>
            );
          })}
        </div>
      </div>
      <RightArrowWrapper onClick={onClick} aria-label="Next slide">
        <RightArrow />
      </RightArrowWrapper>
    </CarouselRoot>
  );
};

export default Carousel;
