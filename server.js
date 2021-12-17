const axios = require('axios').default
require('dotenv').config();
const express = require('express')
const app = express()
const port = 3001
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get('/api/repos', async (req, res) => {
    const response = await octokit.request('GET /user/repos')
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(response, null, '\t'))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});