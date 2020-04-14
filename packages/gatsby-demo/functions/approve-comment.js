'use strict';

let request = require('request');

// populate environment letiables locally.
require('dotenv').config();

/*
  Handle the lambda invocation
*/
export function handler(event, context, callback) {
  // parse the payload
  let body = event.body.split('payload=')[1];
  let payload = JSON.parse(unescape(body));
  let method = payload.actions[0].name;
  let id = payload.actions[0].value;

  // get the comment data from the queue
  let url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.NETLIFY_TOKEN}`;

  console.log();

  request(url, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      let data = JSON.parse(body).data;

      // now we have the data, let's massage it and post it to the approved form
      let payload = {
        'form-name': 'Approved Comments',
        path: data.path,
        received: new Date().toString(),
        email: data.email,
        name: data.name,
        comment: data.comment,
      };
      let approvedURL = process.env.URL;

      console.log('Posting to', approvedURL);
      console.log(payload);

      // post the comment to the approved lost
      request.post({ url: approvedURL, formData: payload }, function(
        err,
        httpResponse,
        body,
      ) {
        let msg;
        if (err) {
          msg = 'Post to approved comments failed:' + err;
          console.log(msg);
        } else {
          msg = 'Post to approved comments list successful.';
          console.log(msg);
          purgeComment(id);
        }
        let msg = 'Comment registered. Site deploying to include it.';
        callback(null, {
          statusCode: 200,
          body: msg,
        });
        return console.log(msg);
      });
    }
  });
}
