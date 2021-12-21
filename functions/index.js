const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp();
// require("dotenv").config();
const express = require("express");
const app = express();

const {Octokit} = require("@octokit/core");
const octokit = new Octokit({auth: functions.config().github.pat});
console.log(functions.config().github.pat);
console.log(octokit);

const cors = require("cors")({"origin": true});
app.use(cors);

app.get("/api/repos", async (req, res) => {
  const response = await octokit.request("GET /user/repos");
  console.log(response);
  res.set("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, "\t"));
});

app.get("/api/website/lastUpdated", async (req, res) => {
  const response = await octokit.request("GET /repos/ssyuen/sisooyin.com");
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, "\t"));
});

exports.app = functions.https.onRequest(app);
