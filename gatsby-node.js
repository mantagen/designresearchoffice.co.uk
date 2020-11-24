/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it
const path = require(`path`);
const works = require(`./src/works.json`);
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const WorkPageTemplate = path.resolve("./src/templates/work-page.tsx");

  const workPages = await Promise.all(
    // TODO: might be able to make this one query though doesn't matter as runs at compile time
    // .. directoy { name { in: "...,...,..." }}
    works.map(async (work) => {
      const { slug } = work;
      const result = await graphql(`
        query {
          allFile(
            sort: { fields: name, order: DESC }
            filter: { relativeDirectory: { eq: "images/work/${slug}" } }
          ) {
            edges {
              node {
                id
                name
                childImageSharp {
                  fluid {
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                  fixed(width: 960) {
                    src
                  }
                }    
              }
            }
          }
        }
      `);

      return {
        ...work,
        images: result.data.allFile.edges,
      };
    })
  );

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
