/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const fetch = require('node-fetch');

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter },
  options
) => {
  const { createNode } = actions;

  const { siteID, color, apiKey } = options;

  if (!apiKey) {
    reporter.panicOnBuild('Please define a Netlify access token');
  }

  if (!siteID) {
    reporter.panicOnBuild('Please define a site ID');
  }

  // const client = new NetlifyAPI(apiKey, opts);

  const nodeHelper = (input, name) => {
    // input.netlify_id = input.id;
    // input.id = createNodeId(`gatsby-source-netlify-${input.netlify_id}`);
    // console.log(input);

    const nodeMeta = {
      id: input.id,
      parent: null,
      children: [],
      internal: {
        type: `Netlify${name}`,
      },
    };
    nodeMeta.internal.content = JSON.stringify(nodeMeta);
    nodeMeta.internal.contentDigest = createContentDigest(nodeMeta);

    console.log(nodeMeta);

    createNode({ ...input, ...nodeMeta });
  };

  try {
    await fetch(
      `https://api.netlify.com/api/v1/sites/${siteID}/submissions/?access_token=${apiKey}`
    ).then((res) => {
      res.json().then((json) => {
        console.log(typeof json);
        console.log(json);

        Object.values(json).forEach((submission) => {
          nodeHelper(submission, 'Submissions');
        });
      });
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
