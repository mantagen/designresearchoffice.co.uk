import React, { CSSProperties, useCallback, useEffect } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import Img from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";

import { ImageData } from "../types/image-data";

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

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 5 });

  const data: { allFile: { edges: ImageData[] } } = useStaticQuery(graphql`
    query {
      allFile(
        sort: { fields: name, order: DESC }
        filter: { relativeDirectory: { eq: "images/home-carousel" } }
      ) {
        edges {
          node {
            id
            name
            childImageSharp {
              fluid {
                base64
                aspectRatio
                src
                srcSet
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
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div onClick={onClick} style={viewportCss} ref={emblaRef}>
      <div style={containerCss}>
        {data.allFile.edges.map(
          (edge) =>
            edge.node.childImageSharp && (
              <div key={`carousel-image-${edge.node.id}`} style={slideCss}>
                <Img
                  fluid={edge.node.childImageSharp.fluid}
                  alt={edge.node.name}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Carousel;