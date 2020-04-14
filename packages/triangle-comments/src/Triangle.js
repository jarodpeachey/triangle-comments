const React = require('react');

export const TriangleContext = React.createContext({});

/**
 * Manages the shopping cart, which is persisted in local storage.
 * The cart and related methods are shared through context.
 */

export class TriangleConstructor {
  color = 'tomato';

  apiKey = '';

  siteID = '';

  constructor(props) {
    console.log(props);

    this.apiKey = props.apiKey;
    this.color = props.color;
    this.siteID = props.siteID;
  }
}

export const Triangle = ({ options, children }) => {
  console.log(options, children);

  const { apiKey, siteID, color } = options;

  window.triangle = new TriangleConstructor(options);

  const ctx = {
    apiKey,
    siteID,
    color,
  };

  return (
    <TriangleContext.Provider value={{ ...ctx }}>
      {children}
    </TriangleContext.Provider>
  );
};
