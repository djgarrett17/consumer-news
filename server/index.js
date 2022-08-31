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
const nodemailer = require('nodemailer');

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
  




  var dropDown =
    {
      amandasTravels: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/93915e37-a0a3-56c3-06af-86f50fb026cd.png",'785-766-9827','amanda@amandastravels','www.amandastravels.com', 10000088],
      aysToursTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/f8b7c96a-d2bd-23d5-71d5-aee0edb144ae.png",'317-322-8687','aystours@aol.com','www.aystours.com', 10000092],
      blueHorizon: ["https://mcusercontent.com/11010af2fb12955cb8611ec8d/images/5038883c-58ed-4a41-911d-cbb684ce6169.png",'309-526-3499','vacation@bluehorizon.net','www.bluehorizon.net', 10000072],
      caryTravelExpress: ["https://mcusercontent.com/0a04777f1cfaf1db009e2e7aa/images/d1d0ae1e-bbdf-2f5a-7d93-f8fad0e88464.jpg",'847-639-3300','neelie@carytravelexpress.com','www.carytravelexpress.com', 10000076],
      chocolateCityTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/acbe4c26-9fcc-eca6-7cc6-6be3ff33eb64.png",'262-492-8747','staff@chocolatecitytravel.com','www.chocolatecitytravel.com', 10000096],
      compassTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/daf773a0-d6ed-3bbb-280f-dc40597af67a.png",'815-756-1547','info@travelwithcompass.com','www.travelwithcompass.com', 10000100],
      crystalLakeTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/ef236e43-7c3e-534d-f40d-3f551a8572dd.png",'815-459-2500','pattyderoocltravel@sbcglobal.net','www.crystallaketravel.com', 10000104],
      davidsHouseOfTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/4823d6ba-93bb-6e74-a1e7-0b4b1a00d709.png",'920-684-6117','davidshouseoftravel@yahoo.com','www.davidshouseoftravel.com', 10000108],
      destinationsTravelServices: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/588ab7cf-2985-6473-d50e-aa741184157c.png",'815-625-3500','avril@destinationstravelservices.com','www.destinationstravelservices.com', 10000112],
      dsBelmontTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/c24b70fd-484e-7680-f4bb-0881516d0a4e.png",'847-800-7383','sharon@dsbelmonttravel.com','www.dsbelmonttravel.com', 10000116],
      expertJourneysTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/b4928016-f598-4e1f-2c8d-bfb67b0b6908.png",'630-803-4311','christie@expertjourneystravel.com','www.expertjourneystravel.com', 10000120],
      extremeDestinations: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/8df32d21-fb22-2681-62c6-d6fd17ae63a9.png",'651-714-0208','carol@extremedestinationstravel.com','www.extremedestinationstravel.com', 10000124],
      firstChoiceTravelCruise: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/12de86be-695f-bf7b-cfea-bedb6111d9ff.png",'262-542-5955','info@firstchoicetravelandcruise.com','www.firstchoicetravelandcruise.com', 10000128],
      freeSpiritTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/1c5eafb6-f9a0-d139-e553-7be48bcee2ca.png",'608-617-5558','info@free-spirit-travel.com','www.free-spirit-travel.com', 10000132],
      germantownTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/28929a0d-919a-3026-2dce-4a1a51cf2e41.jpg",'262-253-0555','anne@gtowntravel.com','www.gtowntravel.com', 10000136],
      hinsdaleTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/97a39cd3-4f6e-1925-d39f-1f56986e0318.png",'630-325-1335','thetravelpro@yahoo.com','www.hinsdaletravel.com', 10000140],
      holidayTravelVacations: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/94aedab6-2914-f897-1dbc-0a45c54042b7.png",'906-228-6355','travel@holiday-mqt.com','www.holidaytravelvacations.com', 10000144],
      huntleyTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/dbf8c32b-f210-fba0-24a4-0ebf4427be4f.png",'847-669-8900','travel@huntleytravel.com','www.huntleytravel.com', 10000148],
      insiderTravelPlanners: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/b7fd79cf-b4d3-f51f-d020-712b189d5d38.png",'304-784-5705','info@insidetravelplanners.com','www.insidetravelplanners.com', 10000152],
      islandBridal: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/b0884563-a02e-f01c-6174-54159473b56a.png",'877-933-2929','travel@islandtravelgroup.com','www.islandtravelgroup.com', 10000156],
      jjDestinations: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/2e6575dd-f2ed-a19e-12e4-d0243ec3f815.png",'815-524-3424','jkamba@jjdestinations.com','www.jjdestinations.com', 10000160],
      janusTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/4cb43c77-6632-6397-f881-d2712f074c85.jpg",'773-763-2767','info@janustravel.com','www.janustravel.com', 10000164],
      jenniferWalkerTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/1100e4b5-a839-f335-1323-24707478413c.png",'309-256-2984','jennifer@jenniferwalkertravel.com','www.jenniferwalkertravel.com', 10000168],
      jetwayWorldTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/826912c4-8c87-fc42-a2fc-2c6ae883905a.png",'773-779-9813','sales@jetwaytravel.com','www.jetwaytravel.com', 10000172],
      lighthouseTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/52d24685-6859-8b6f-241c-b2ef2734c077.png",'563-242-2470','noreen@travelwithlighthouse.com','www.travelwithlighthouse.com', 10000176],
      mooreTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/f7e88803-7821-49b2-3c37-c98231e73e76.png",'847-593-6700','mooretravel@sbcglobal.net','www.mooretravel.com', 10000180],
      okTravelAgency: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/130c1d6f-44c7-23fb-c349-3f5bcfbb14cf.png",'773-581-0100','karenoktrvl@yahoo.com','www.oktravelagency.com', 10000184],
      sandcastleWishes: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/ba81947f-ba75-b8b6-7651-5a2835301ca4.png",'205-914-2805','info@sandcastlewishes.com','www.sandcastlewishes.com', 10000188],
      seeYourWorld: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/b1375bc5-f2d9-61aa-9813-b68eac3c62d7.png",'608-575-3488','info@seeyourworldadventures.com','www.seeyourworldadventures.com', 10000192],
      shamaTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/02aec321-cf61-c386-50f7-d00dd1b12cef.png",'847-966-7788','raj@shamatravel.com','www.shamatravel.com', 10000196],
      starshipTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/d74d3f7e-04c7-5b6f-bdeb-3329aca64e4a.png",'847-394-1155','linda@starshiptravel.com','www.starshiptravel.com', 10000200],
      sunsetFamilyTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/cf90d16b-87db-15fd-4aba-6123a6d049e8.png",'920-268-1234','shelley@sunsetfamilytravel.com','www.sunsetfamilytravel.com', 10000204],
      townCountryTravel: ["https://mcusercontent.com/663433d5d70d635e4e3bf14a6/images/42040f38-2610-4fed-a5dc-0c294737ef9e.png",'712-792-9742','krista@traveltct.com','www.traveltct.com', 10000068],
      travelHouseQuincy: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/e7eaf053-cdaa-d6cc-6abd-e517f0880fe7.png",'217-222-0515','book@travelhouseofquincy.com','www.travelhouseofquincy.com', 10000208],
      travelOnADream: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/3061f719-29e7-4477-135b-5a8ee2f5c442.png",'888-681-1240','info@travelonadream.com','www.travelonadream.com', 10000212],
      travelPriorities: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/55b4927c-18cd-0812-93d9-79cb950d26cb.png",'847-675-4700','morris@travelpriorities.com','www.travelpriorities.com', 10000216],
      travelTwoThousand: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/c53a9561-8ce4-f999-1373-9041e11cd767.png",'630-645-9500','agent@askttt.com','www.askttt.com', 10000220],
      viaTravelService: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/596449de-4df2-6cab-4fbe-41980fc4c79f.png",'414-301-1071','niki@viatravelservice.com','www.viatravelservice.com', 10000224],
      wilsonTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/a95382cb-3ecc-967d-6f06-ed200fc37083.png",'630-377-3700','agent@wilsontravelandcruise.com','www.wilsontravelandcruise.com', 10000228],
      wonderlandFamily: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/6147fa81-dda5-ffa7-4e61-5b4b7504c32b.png",'616-481-3463','info@wonderlandfamilyvacations.com','www.wonderlandfamilyvacations.com', 10000232],
      worldClassTravel: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/de1f245f-c7e1-f75f-8cc7-c7e099a6c10e.png",'630-515-1551','info@worldclasstravel91.com','www.worldclasstravel91.com', 10000236],
      worldwideTravelerLtd: ["https://mcusercontent.com/c4fd8980badfdb476a3474815/images/5cab8611-a3bd-3acc-dd2e-5071614f9c1f.png",'815-385-6900','worldwide@worldwidetraveler.net','www.worldwidetraveler.net', 10000240]
    }
    var agencyName = req.body.agency
    var selAgency = dropDown[agencyName][0]
    var agencyPhone = dropDown[agencyName][1]
    var agencyEmail = dropDown[agencyName][2]
    var agencyWebsite = dropDown[agencyName][3]
    var templateVariable = dropDown[agencyName][4]
    
    console.log(selAgency)
    console.log(dropDown)
    console.log(agencyName)








    

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



   var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'djgarrett17@gmail.com',
      pass: process.env.EMAIL_APP_PASS
    }
  });

  var emailOptions = {
    from: 'Devin Garrett <djgarrett17@gmail.com>',
    to: "devin.garrett@mvptravel.com",
    subject: 'Node Mailer Test',
    text: `Agency: ${agencyName} \n Image URL: ${fileUrl} \n Content Title: ${req.body.contentTitle} \n Content: ${req.body.msg} \n Landing Link: ${req.body.landinglink}`
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Message Sent: ' + info.response);
      console.log('Email Message: ' + emailMessage);
    }
  });
 

   var imageHeaderUrl= selAgency.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');
   var phoneNumber= agencyPhone.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');
   var emailAddress= agencyEmail.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');
   var websiteUrl= agencyWebsite.replace(/'/g,'${single}').replaceAll('/','${forwardSlash}');

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
  
  write('server/test.txt', `forwardSlash="${forwardslash}" \n singlestring="${singlequote}" \n semicolon="${semicolon}" \n contentTitle='${outputstr2}' \n content='${outputstr1}' \n imageHeader='${imageHeaderUrl}' \n image='${imageUrl}' \n phone='${phoneNumber}' \n email='${emailAddress}' \n website='${websiteUrl}' \n noContent='${noneContent}' \n landingLink='${landingLink}'`, err => {
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


   
  //  var agencyName = req.body.agency
  //  var templateVariable = templateNumber[agencyName]
  //  console.log(templateVariable);
   


  async function run() {
    var myTextFile = require('../server/consumer-1.txt')
    const response = await mailchimp.ping.get();
    console.log(response);


    
    console.log(templateVariable)

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
//   function funcOne(...cb) {
//     console.log("one");
//     fun();
//     cb.forEach(s => s.apply());
// }

// function funcTwo() {
//   cmd();
//     console.log("two");
// }

// function funcThree() {
//   run();
//     console.log("three");
// }
// function funcFour() {
//   restart();
//     console.log("four");
// }
// function funcFive() {
//   restart2();
//     console.log("five");
// }


// funcOne(funcTwo, funcThree, funcFour, funcFive);
// funcOne(funcTwo, funcThree);
  setTimeout(() => {
    fun();
   }, 10)

// need time in between to execute correctly

  setTimeout(() => {
   cmd();
  }, 2900)

  setTimeout(() => {
    run();
   }, 3200)


   setTimeout(() => {
    restart();
   }, 4200)

   setTimeout(() => {
    restart2();
   }, 4500)
 

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