import React, { CSSProperties, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const data = useStaticQuery(graphql`
    query {
      allFile(
        sort: { name: ASC }
        filter: { relativeDirectory: { eq: "images/home-carousel" } }
      ) {
        edges {
          node {
            id
            name
            childImageSharp {
              gatsbyImageData(
                width: 1200
                quality: 70
                layout: CONSTRAINED
                aspectRatio: 1.5
                formats: [AUTO, WEBP]
              )
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
          {data.allFile.edges.map((edge) => {
            const image = getImage(edge.node.childImageSharp.gatsbyImageData);
            if (!image) {
              return null;
            }
            return (
              <div key={`carousel-image-${edge.node.id}`} style={slideCss}>
                <GatsbyImage
                  image={image}
                  alt={edge.node.name}
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
