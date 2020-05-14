/* eslint-disable import/prefer-default-export */
// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

exports.handler = function (event, context, callback) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const json = JSON.parse(event.body);

  console.log(json);

  const msg = {
    to: 'jwpeachey107@aol.com',
    from: 'hello@staticbox.io',
    templateId: 'd-bddc1f05116740c1af038ce47364fe06',
    dynamicTemplateData: {
      name: json.name,
      nameLowerCase: json.nameLowerCase,
    },
  };
  try {
    sgMail
      .send(msg)
      .then((res) => {
        callback(null, {
          statusCode: 200,
          body: 'Success!',
        });
      })
      .catch((err) => {
        callback(null, {
          statusCode: 200,
          body: 'Error',
        });

        console.log(err.response.body.errors);
      });

    // exports.handler = function(event, context, callback) {

    // }
  } catch {
    console.log('Error');
  }
};
