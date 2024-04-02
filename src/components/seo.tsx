import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export type SeoProps = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  author?: string | null;
  pathname: string;
};
const Seo: React.FC<SeoProps> = (props) => {
  const res = useStaticQuery<Queries.SeoQuery>(graphql`
    query Seo {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `);

  const defaults = { ...res.site?.siteMetadata };

  if (!defaults) throw new Error("No defaults");

  if (defaults.siteUrl === "" && typeof window !== "undefined") {
    defaults.siteUrl = window.location.origin;
  }

  if (defaults.siteUrl === "") {
    console.error("Please set a siteUrl in your site metadata!");
    return null;
  }

  if (!defaults.siteUrl) throw new Error("No defaults.siteUrl");

  const author = props.author || defaults.author || "";
  const title =
    (props.title ? `${props.title} - ${defaults.title}` : defaults.title) || "";
  const description = props.description || defaults.description || "";
  const url = new URL(props.pathname, defaults.siteUrl).href;
  const image = props.image
    ? new URL(props.image, defaults.siteUrl).href
    : false;

  return (
    <>
      <title>{props.title || defaults.title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      {image && <meta name="image" content={image} />}

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <html lang="en" />
    </>
  );
};

export default Seo;
