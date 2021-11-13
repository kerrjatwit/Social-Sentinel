const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /note_analytics /view_analytics and /seek_analytics.
const targetsRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

//  get a list of all targets.
targetsRoutes.route("/targets").get(function (req, res) {
  let db_connect = dbo.getDb("social_sentinels");
  db_connect
    .collection("targets")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});



// Add target
targetsRoutes.route("/targets/add").post(function (req, res) {
  let db_connect = dbo.getDb("social_sentinels");
  let myobj = {
    author: req.body
  };
  db_connect.collection("targets").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });
});



module.exports = targetsRoutes;