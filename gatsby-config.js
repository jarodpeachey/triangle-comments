const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// console.log(process.env.NETLIFY_TOKEN);

module.exports = {
  siteMetadata: {
    title: 'Triangle',
    description: 'A comment system for modern-day web development.',
    author: '@jarodpeachey',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-firebase',
    //   options: {
    //     credentials: {
    //       apiKey: 'AIzaSyBvYZ7_Yp3d3RvVMkNxEuGg2aUA_dkLWQ0',
    //       authDomain: 'staticbox-ddea5.firebaseapp.com',
    //       databaseURL: 'https://staticbox-ddea5.firebaseio.com',
    //       projectId: 'staticbox-ddea5',
    //       storageBucket: 'staticbox-ddea5.appspot.com',
    //       messagingSenderId: '106733678517',
    //       appId: '1:106733678517:web:324a9c5bcbcaf29706f3fc',
    //     },
    //   },
    // },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'triangle-comments',
        short_name: 'triangle',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-styled-components',
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    );
  },
};
