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
const fs = require('fs');
// const upload = multer({dest: 'uploads/'});

// app.use(express.static(__dirname, 'server'));
app.set('view engine', 'ejs');


var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, callback) {
   
    // const ogname = req.file.originalname;
    // cb(null, req.file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // cb(null, file.originalname);
    
    var uploadFileName = "x.jpg";
    callback(null, file.originalname);
  }
  });

  var upload = multer({ storage: storage });





app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/server', express.static("server"));
// app.use('/client/public', express.static("public"));
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
// var ogname = req.file.originalname;
// console.log(ogname);





app.post('/', upload.single('thefilename'), (req, res) => {
  // console.log(req.body.fname);
  // const x = "&ldquo;"
  // const z = "&lsquo;"

  // console.log(req.body.msg);
  // console.log(req.body.contentTitle);
  // console.log(req.body.landinglink);
  // console.log(req.file.filename);
  // console.log(req.file);
  // console.log(req.file.fieldname);
  // console.log(req.file.originalname);
  // console.log(__dirname);
  // console.log(process.cwd() + "/" + req.file.path);

  

  // console.log(contentTitle);
  // write(__dirname + '/test.txt', 'content=' + '"' + req.body.msg + '"'  + " \n " + 'contentTitle=' + '"cat << BLOCK3 ' + req.body.contentTitle + ' BLOCK3"', err => {
  //   console.log(err)
  // });


  var outputstr1= req.body.msg.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}').replaceAll(decodeURIComponent('%0D%0A'),'${semicolon}').replaceAll(decodeURIComponent('%0A'),'${semicolon}');
  // var outputstr1= req.body.msg.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}').replace(/\r\n/g,'${semicolon}').replace(/\n/g,'${semicolon}');
  var outputstr2= req.body.contentTitle.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');
  var singlequote="\\'";
  var forwardslash="/";
  var semicolon=" <br> ";
  var landingLink= req.body.landinglink.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');
  // var ogname = req.file.originalname
  





  const fun = async () => {

    if(req.file){
    const contents = fs.readFileSync(`./uploads/${req.file.originalname}`, {encoding: 'base64'});
  
// let menny3 = btoa(process.cwd() + "/" + req.file.path);
// file_data: process.cwd() + "/" + req.file.path,

      const response3 = await client.fileManager.upload({
        name: req.file.originalname,
        file_data: contents,
        
      });

    }
      // console.log(response3);
      // console.log(contents);
  //  console.log(req.file);



// var sortDir={ 
//   sortDir: "DESC",
//   count: 3
// }
// var count=[{ 
//   count: 3
// }]
// setTimeout(() => {
  // var jim = Date.now() - (Date.now() - start);
  var yoTime = Date.now();
  function toIsoString(date) {
    var tzo = date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
        
        var hours = date.getHours()
        var floor = (Math.floor(Math.abs(tzo) / 60))
        
        

        if(dif === "+"){
          console.log("positive")
          var hoursTime = parseInt(hours) + parseInt(floor)
        } else if (dif === "-"){
          console.log("negative")
          var hoursTime = parseInt(hours) - parseInt(floor)
        } else{
          console.log("unexpected")
        }
        console.log(hoursTime);
        console.log(dif);
        console.log(tzo);
        console.log((Math.floor(Math.abs(tzo) / 60)));
        
        
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(hoursTime) +
        ':' + pad(date.getMinutes() ) +
        ':' + pad(date.getSeconds() - 5) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }
  
  
  
  var dt = new Date();

  console.log(toIsoString(dt));
  console.log(yoTime)
  // console.log(jim)
  // }, 000);

  //  const responseList = await client.fileManager.files(sort_dir= "DESC", count= 3);
  //  console.log(responseList);
  const responseList = await client.fileManager.files({sinceCreatedAt: toIsoString(dt)});
   console.log(responseList);

   if(req.file){
   var fileUrl = responseList.files[0].full_size_url
   console.log(fileUrl);
   var imageUrl= fileUrl.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');
   }


   const dropDown =
    {
      blueHorizon: "https://mcusercontent.com/11010af2fb12955cb8611ec8d/images/5038883c-58ed-4a41-911d-cbb684ce6169.png",
      townCountryTravel: "https://mcusercontent.com/663433d5d70d635e4e3bf14a6/images/42040f38-2610-4fed-a5dc-0c294737ef9e.png",
      caryTravelExpress: "https://mcusercontent.com/0a04777f1cfaf1db009e2e7aa/images/d1d0ae1e-bbdf-2f5a-7d93-f8fad0e88464.jpg"
    }

  
    console.log(dropDown)
const agencyName = req.body.agency
console.log(agencyName)

var selAgency = dropDown[agencyName]
console.log(selAgency)

   var imageHeaderUrl= selAgency.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');

if(!req.file && (req.body.msg == "") && (req.body.contentTitle == "")){
   var noneContent = `display: none;`
} else{
  var noneContent = ""
}

  //  write(path.join(__dirname, 'test.txt'), `forwardSlash="${forwardslash}" \n singlestring="${singlequote}" \n contentTitle='${outputstr2}' \n content='${outputstr1}' \n imageHeader='${imageHeaderUrl}' \n image='${imageUrl}' \n noContent='${noneContent}' \n landingLink='${landingLink}'`, err => {
  //   console.log(err)
  // });
  console.log(__dirname + '/test.txt')
  console.log(process.cwd() + '/test.txt')
  
  write('server/test.txt', `forwardSlash="${forwardslash}" \n singlestring="${singlequote}" \n semicolon="${semicolon}" \n contentTitle='${outputstr2}' \n content='${outputstr1}' \n imageHeader='${imageHeaderUrl}' \n image='${imageUrl}' \n noContent='${noneContent}' \n landingLink='${landingLink}'`, err => {
    console.log(err)
  });
   
//   const responseList = client.fileManager.files = function(sortDir, opts){
//     opts = opts || {};
// if (sortDir === undefined || sortDir === null){
//  throw new Error("Missing sortDir")
// } else {
//   sortDir = "DESC"
// }

   
// var queryParams = {
//   "sort_dir": opts["sortDir"]
// };
//   };
  //  const response4 = await client.fileManager.getFile("9b4f0f09-41a5-8a31-afc2-14eaeb397296");
  // console.log(response4);

  // var imageAdd = response4.id
  // console.log(imageAdd);


   }


   



   function cmd() {
    shell.exec(__dirname + '/script.sh')
    console.log("chimpy")
   }

   function restart() {

    // res.redirect('https://consumer-e-newsletter.herokuapp.com/');
    
    // process.exit(0)
    var api= process.env.HEROKU_API_KEY

shell.exec(`HEROKU_API_KEY=${api} sh ${__dirname}/restart.sh`);
   
    // shell.exec(__dirname + '/restart.sh')
    console.log("chimpy2")
   
   }


   function restart2() {

    console.log("chimpy3")
    res.redirect(req.get('referer'));
    
   }




  async function run() {
    var myTextFile = require('../server/consumer-1.txt')
    const response = await mailchimp.ping.get();
    console.log(response);


    const templateNumber =
    {
      blueHorizon: 10000072,
      townCountryTravel: 10000068,
      caryTravelExpress: 10000076
    }
    var agencyName = req.body.agency
    var templateVariable = templateNumber[agencyName]

    const response1 = await client.templates.updateTemplate(templateVariable, {
        name: `"Consumer-News-Template-${agencyName}"`,
        html: myTextFile,
      });
      console.log(response1);


      

      // var random= Math.random() + Math.random()
      // write(__dirname + '/listener.rtf', `randomNumber="${random}"`, err => {
      //   console.log(err)
      // });
  }

  setTimeout(() => {
    fun();
   }, 200)

// need time in between to execute correctly

  setTimeout(() => {
   cmd();
  }, 2500)

  setTimeout(() => {
    run();
   }, 3500)

  //  setTimeout(() => {
  //   end();
  //  }, 6000)

   setTimeout(() => {
    restart();
   }, 4800)

   setTimeout(() => {
    restart2();
   }, 5400)
  //  setTimeout(() => {
  //   fil();
  //  }, 5000)

});

// app.get('/',function(req,res){
 
//   res.redirect('https://consumer-e-newsletter.herokuapp.com/');
  // res.redirect(req.get('referer'));
// });

    

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