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

    if (page.path.match(/^\/account/)) {
      page.matchPath = '/account/*';

      // Update the page.
      createPage(page);
    }
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@auth0\/auth0-spa-js/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
