// Firebase Variables
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Database Variables
const faunadb = require('faunadb');

const q = faunadb.query;

// API Variables
const express = require('express');
const cors = require('cors');

const api = express();

if (typeof api !== 'undefined') {
  // Init Firebase
  admin.initializeApp(functions.config().firebase);

  // Init FaunaDB
  const client = new faunadb.Client({
    secret: 'fnADqyhLlZACEv1Zj9Z9Uqtk6Hffc9_iLyqoBtzf',
  });

  // Automatically allow cross-origin requests
  api.use(cors({ origin: true }));

  // Test API
  api.get(['/api/v1', '/api/v1/'], (req, res) => {
    res
      .status(200)
      .send(
        `<img src="https://media.giphy.com/media/hhkflHMiOKqI/source.gif">`
      );
  });

  // Create user
  api.post(['/api/v1/users', '/api/v1/users/'], (req, res) => {
    let addUser = client.query(
      q.Map(
        [
          [
            req.body.name || 'Guest',
            req.body.email,
            req.body.id,
            {
              name: 'Staticboard Team',
              email: 'staticboard@gmai.com',
              comment:
                "This is your first comment! Awesome sauce!\n\n If you don't want this comment here, go to your dashboard to delete it: https://staticboard.com/dashboard",
            },
          ],
        ],
        q.Lambda(
          'data',
          q.Let(
            {
              user: q.Create(q.Collection('users'), {
                data: {
                  name: q.Select(0, q.Var('data')),
                  email: q.Select(1, q.Var('data')),
                  id: q.Select(2, q.Var('data')),
                },
                credentials: {
                  password: req.body.id,
                },
              }),
              comment: q.Select(3, q.Var('data')),
              // keys: q.Select(4, q.Var('data')),
            },
            q.Map(
              [[q.Var('user'), q.Var('comment')]],
              q.Lambda(
                'newData',
                q.Create(q.Collection('comments'), {
                  data: {
                    user: q.Select('ref', q.Select(0, q.Var('newData'))),
                    comment: q.Select(1, q.Var('newData')),
                  },
                })
              )
            )
          )
        )
      )
    );

    addUser
      .then((response) => {
        res.status(200).send(`User added! ${response.ref}`);
        return;
      })
      .catch((reason) => {
        res.error(reason);
      });
  });

  // Get user
  api.get(['/api/v1/users/:id', '/api/v1/users/:id/'], (req, res) => {
    let getUserById = client.query(
      q.Get(q.Match(q.Index('user_by_id'), req.params.id))
    );

    getUserById
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
        return;
      })
      .catch((error) => {
        // res.error(error);
        console.log(error);
        res.error(error);
      });
  });

  // Get API keys
  api.get(['/api/v1/keys', '/api/v1/users/keys/'], (req, res) => {
    console.log(req.headers.authorization);
    let getKeys = client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_keys'))),
        q.Lambda(
          'keysRef',
          q.Let(
            {
              keys: q.Get(q.Var('keysRef')),
              user: q.Get(q.Select(['data', 'user'], q.Var('keys'))),
            },
            {
              user: q.Select(['ref'], q.Var('user')),
              key: q.Select(['data', 'key'], q.Var('keys')),
            }
          )
        )
      ),
      { secret: req.headers.authorization.split(' ')[1] }
    );

    getKeys
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
        return;
      })
      .catch((error) => {
        // res.error(error);
        console.log(error);
        res.error(error);
      });
  });
}

// Create function
exports.api = functions.https.onRequest(api);
