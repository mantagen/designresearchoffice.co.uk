/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it
import path from "path";
import { CreatePagesArgs } from "gatsby";
import { WorkPageProps } from "./src/templates/work-page";

exports.createPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  const { createPage } = actions;
  const WorkPageTemplate = path.resolve("./src/templates/work-page.tsx");

  const workPagesRes = await graphql<Queries.WorkPagesQuery>(`
    query WorkPages {
      allWpWorkPostType {
        edges {
          node {
            slug
            workFieldGroup {
              workTitle
              workText {
                workTextParagraph
              }
              workImages {
                nodes {
                  localFile {
                    id
                    name
                    childImageSharp {
                      gatsbyImageData(
                        quality: 70
                        layout: FULL_WIDTH
                        formats: [AUTO, WEBP]
                      )
                      fixedImage: gatsbyImageData(
                        width: 960
                        quality: 70
                        layout: FIXED
                        formats: [AUTO, WEBP]
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const workPages: WorkPageProps[] =
    workPagesRes?.data?.allWpWorkPostType.edges.map((edge) => {
      const { workFieldGroup, slug } = edge.node;
      if (!workFieldGroup) throw new Error(`workFieldGroup is missing`);
      const { workTitle, workText, workImages } = workFieldGroup;
      if (!workText) throw new Error(`workText is missing`);
      if (!slug) throw new Error("slug is missing");
      if (!workTitle) throw new Error("workTitle is missing");
      const paragraphs: string[] = [];
      workText.forEach((t) =>
        t?.workTextParagraph ? paragraphs.push(t.workTextParagraph) : null
      );

      const workPage: WorkPageProps = {
        edge,
        slug,
        titleHtml: workTitle,
        paragraphs,
        images: workImages?.nodes || [],
      };

      return workPage;
    }) || [];

  if (!workPages) throw new Error(`workPages is missing`);

  if ("errors" in workPages) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  workPages.forEach((page) => {
    createPage({
      path: `/work/${page.slug}`,
      component: WorkPageTemplate,
      context: {
        ...page,
      },
    });
  });
};
