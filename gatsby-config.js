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
    {
      resolve: 'gatsby-plugin-zopfli',
      options: {
        path: 'zopfli',
      },
    },
    'gatsby-plugin-styled-components',
  ],
};
