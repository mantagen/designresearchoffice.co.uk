/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  /* Your site config here */
  siteMetadata: {
    title: `Design Research Office`,
    author: `Valis Loizides`,
    description: `Valis Loizides, Design Research Office, London`,
    siteUrl: `https://www.designresearchoffice.co.uk`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-13P231HXJZ"],
      },
    },
    `gatsby-plugin-robots-txt`
  ],
};

export default config