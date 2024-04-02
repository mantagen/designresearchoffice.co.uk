/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it
import path from "path";
import { CreatePagesArgs } from "gatsby";

exports.createPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  const { createPage } = actions;
  const WorkPageTemplate = path.resolve("./src/templates/work-page.tsx");

  const workPagesRes = await graphql(`
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

  const workPages = workPagesRes.data.allWpWorkPostType.edges.map((edge) => {
    const { workFieldGroup, slug } = edge.node;
    const { workTitle, workText, workImages } = workFieldGroup;

    return {
      edge,
      slug,
      titleHtml: workTitle,
      paragraphs: workText.map((t) => t.workTextParagraph),
      images: workImages?.nodes || [],
    };
  });

  if (workPages.errors) {
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
