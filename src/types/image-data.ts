import { FluidObject } from "gatsby-image";

export type ImageData = {
  node: {
    id: string;
    name: string;
    childImageSharp: {
      fluid: FluidObject | FluidObject[];
    };
  };
};
