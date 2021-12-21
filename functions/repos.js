const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const {Octokit} = require("@octokit/core");
const octokit = new Octokit({auth: functions.config().github.pat});
const cors = require("cors")({"origin": true});

exports.repos = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const response = await octokit.request("GET /user/repos");
    res.send(JSON.stringify(response, null, "\t"));
  });
});
