// server/index.js
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
const client = require("mailchimp-marketing");
var stringify = require('stringify');
const shell = require('shelljs');
const write = require('write');
require('dotenv').config();

var bodyParser=require("body-parser");





app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
  res.render('../views/pages/ejscode');
});



// Setup to update html
stringify.registerWithRequire({
  appliesTo: { includeExtensions: ['.txt', '.html'] },
  minify: true,
  minifyAppliesTo: {
    includeExtensions: ['.html']
  },
  minifyOptions: {
    // html-minifier options
  }
});

// console.log(myTextFile);

mailchimp.setConfig({
  apiKey: process.env.REACT_APP_API_KEY,
  server: "us5",
});

client.setConfig({
  apiKey: process.env.REACT_APP_API_KEY,
  server: "us5",
});




app.post('/', (req, res) =>{
  console.log(req.body.fname);
  // alert(req.body.fname);
  write(__dirname + '/test.txt', 'test=' + req.body.fname, err => {
    console.log(err)
  });


  function cmd() {
    shell.exec(__dirname + '/script.sh')
    console.log("chimpy")
   }


  async function run() {
    var myTextFile = require('../server/consumer-1.txt')
    const response = await mailchimp.ping.get();
    console.log(response);

    const response1 = await client.templates.updateTemplate("10000060", {
        name: "Consumer-News-Template",
        html: myTextFile,
      });
      console.log(response1);
  }

  
  setTimeout(() => {
   cmd();
  }, 1000)

  setTimeout(() => {
    run();
   }, 3000)

});










// Updating Html
app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

  



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});