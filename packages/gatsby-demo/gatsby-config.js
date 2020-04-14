require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// console.log(process.env.NETLIFY_TOKEN);

module.exports = {
  siteMetadata: {
    title: 'Jarod Peachey',
    description:
      'Front-End web developer with an eye for design. Experience in HTML, CSS, Javascript, Bootstrap, as well as back-end languages like PHP, MySQL and others.',
    author: '@jarodpeachey',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-triangle',
      options: {
        key: process.env.NETLIFY_TOKEN,
        siteID: 'b6b13974-f786-41c8-841f-38ba49c28710',
        color: '#254864',
      },
    },
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
        name: 'jarod-peachey',
        short_name: 'jarod-peachey',
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
