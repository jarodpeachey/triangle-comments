/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = ({ page, actions }) => {
  console.log(page);
  const { createPage, deletePage } = actions;

  // You can access the variable "house" in your page queries now
  if (page.path !== '/dev-404-page/') {
    deletePage(page);

    createPage({
      ...page,
      context: {
        ...page.context,
        pathname: page.path,
      },
    });
  }
};
