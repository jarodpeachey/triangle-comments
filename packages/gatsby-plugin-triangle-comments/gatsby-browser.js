const React = require('react');
const { Triangle, TriangleConstructor } = require('triangle-comments');

exports.wrapRootElement = ({ element }, options) => {
  console.log(element, options);
  if (element) {
    return <Triangle options={options}>{element}</Triangle>;
  }

  // return element;
};
