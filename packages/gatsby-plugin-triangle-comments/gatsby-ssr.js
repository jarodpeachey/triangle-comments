const React = require('react');
const { Triangle } = require('triangle-comments');

exports.wrapRootElement = ({ element }, options) => {
  return <Triangle options={options}>{element}</Triangle>;
  // return element;
};
