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
const multer = require('multer');
const morgan = require("morgan");
const path = require('path');

const upload = multer({dest: 'uploads/'});


// app.use(express.static(__dirname, 'server'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/server', express.static("server"));
// app.use(bodyParser.urlencoded({extended:true}));

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





// const storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, '/uploads/my-images');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.filename);
    
//   }
// });


// console.log(ogname);




app.post('/', upload.single('thefilename'), (req, res) =>{
  console.log(req.body.fname);
  // const x = "&ldquo;"
  // const z = "&lsquo;"

  console.log(req.body.msg);
  console.log(req.body.contentTitle);
  console.log(req.body.landinglink);
  console.log(req.body.thefilename);
  // console.log(file.req.body.thefilename);
  console.log(req.file);
  console.log(req.file.originalname);
  

  

  // console.log(contentTitle);
  // write(__dirname + '/test.txt', 'content=' + '"' + req.body.msg + '"'  + " \n " + 'contentTitle=' + '"cat << BLOCK3 ' + req.body.contentTitle + ' BLOCK3"', err => {
  //   console.log(err)
  // });



  var outputstr1= req.body.msg.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');
  var outputstr2= req.body.contentTitle.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');
  var singlequote="\\'";
  var forwardslash="/";
  var landingLink= req.body.landinglink.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');
  // var ogname = req.file.originalname
  




  write(__dirname + '/test.txt', `forwardSlash="${forwardslash}" \n singlestring="${singlequote}" \n contentTitle='${outputstr2}' \n content='${outputstr1}' \n landingLink='${landingLink}'`, err => {
    console.log(err)
  });



  

   function fun() {

var ogname = req.file.originalname;
console.log(ogname);

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
   
    const ogname = req.file.originalname;
    // cb(null, req.file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // cb(null, file.originalname);
    var uploadFileName = "x.jpg";
    cb(null, uploadFileName);
  }
  });


    var upload = multer({ storage: storage}).single('thefilename');

    upload(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any
  
      // if (req.fileValidationError) {
      //     return res.send(req.fileValidationError);
      // }
      // else if (!req.file) {
      //     return res.send('Please select an image to upload');
      // }
      // else if (err instanceof multer.MulterError) {
      //     return res.send(err);
      // }
      // else if (err) {
      //     return res.send(err);
      // }
  
      // Display uploaded image for user validation
      // res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
  });
   
   }




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
    fun();
   }, 1000)

  setTimeout(() => {
   cmd();
  }, 2000)

  setTimeout(() => {
    run();
   }, 3000)

  //  setTimeout(() => {
  //   fil();
  //  }, 5000)

});



// app.post('/', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     console.log("No file received");
//     return res.send({
//       success: false
//     });

//   } else {
//     console.log('file received');
//     return res.send({
//       success: true
//     })
//   }
// });






// Updating Html
app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

  



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});