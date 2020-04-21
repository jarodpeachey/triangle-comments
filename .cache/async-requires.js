// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-account-js": () => import("./../src/pages/account.js" /* webpackChunkName: "component---src-pages-account-js" */),
  "component---src-pages-index-js": () => import("./../src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-login-js": () => import("./../src/pages/login.js" /* webpackChunkName: "component---src-pages-login-js" */),
  "component---src-pages-signup-js": () => import("./../src/pages/signup.js" /* webpackChunkName: "component---src-pages-signup-js" */)
}

