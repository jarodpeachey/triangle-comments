/* eslint-disable import/prefer-default-export */
const OKTA_DOMAIN = 'dev-977998.okta.com';
const CLIENT_ID = '0oa97mqd3OBIOuNSI4x6';
const CALLBACK_PATH = '/implicit/callback';

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
const SCOPES = 'openid profile email';

export const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scope: SCOPES.split(/\s+/),
};
