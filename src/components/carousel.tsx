import React, { CSSProperties, useCallback, useEffect } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import Img from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";

import { ImageData } from "../types/image-data";
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

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 5 });

  const data: { allFile: { edges: ImageData[] } } = useStaticQuery(graphql`
    query {
      allFile(
        sort: { fields: name, order: ASC }
        filter: { relativeDirectory: { eq: "images/home-carousel" } }
      ) {
        edges {
          node {
            id
            name
            childImageSharp {
              fluid(maxWidth: 1200, quality: 70) {
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
          }
        }
      }
    }
  `);

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
          {data.allFile.edges.map(
            (edge) =>
              edge.node.childImageSharp && (
                <div key={`carousel-image-${edge.node.id}`} style={slideCss}>
                  <Img
                    fluid={{
                      ...edge.node.childImageSharp.fluid,
                      aspectRatio: 1.5,
                    }}
                    alt={edge.node.name}
                    backgroundColor={colors.backgroundGrey}
                    loading="eager"
                  />
                </div>
              )
          )}
        </div>
      </div>
      <RightArrowWrapper onClick={onClick} aria-label="Next slide">
        <RightArrow />
      </RightArrowWrapper>
    </CarouselRoot>
  );
};

export default Carousel;
