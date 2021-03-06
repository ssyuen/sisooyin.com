const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
require("dotenv").config();
const express = require("express");
const app = express();

const {Octokit} = require("@octokit/core");
const octokit = new Octokit({auth: functions.config().github.pat});
console.log(functions.config().github.pat)

const cors = require("cors")({origin: true});
app.use(cors);
// Add headers before the routes are defined
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.get("/api/repos", async (req, res) => {
  const response = await octokit.request("GET /user/repos");
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, "\t"));
});

app.get("/api/website/lastUpdated", async (req, res) => {
  const response = await octokit.request("GET /repos/ssyuen/sisooyin.com");
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, "\t"));
});

exports.app = functions.https.onRequest(app);
