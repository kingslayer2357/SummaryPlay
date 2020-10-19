const express = require('express');
const router = express.Router();
let ejs = require('ejs');
var path = require('path');
var fs = require('fs');
const multer = require('multer')
const { spawn } = require('child_process');

// const x=require('../../test/test.py')


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        if (file.fieldname == 'textfile'){
            callback(null, file.fieldname+'.txt');
        }
        else{
            callback(null, file.fieldname+'.mp3');
        }
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req,file,cb)=>{
        var ext = path.extname(file.originalname)
        if (ext != '.txt') {
            return cb(new Error('Wrong file type'));
        }
        cb(null, true)
    }
}).single('textfile');

var uploadVoice = multer({
    storage: storage,
    fileFilter: (req,file,cb)=>{
        var ext = path.extname(file.originalname)
        if (ext != '.mp3') {
            return cb(new Error('Wrong file type'));
        }
        cb(null, true)
    }
}).single('voicefile');


router.get("/", async (req, res, next) => {
    res.render("home");
})
router.get("/text", async (req, res, next) => {
    res.render("textinput");
})

router.get("/textuploader", async (req, res, next) => {
    res.render("uploader");
})

router.get("/voiceuploader", async (req, res, next) => {
    res.render("uploadvoice");
})

router.post("/posttext", async (req, res, next) => {
    inp = req.body.data
    const python = spawn('python3', [__dirname +"/../../pythonScripts/sumar.py", inp]);
    python.stdout.on('data', async function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = await data.toString();
    });
    python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);

      return res.status(200).send(dataToSend)
    });

})
router.post('/api/txtfile', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        fs.readFile(__dirname + '/../uploads/textfile.txt', 'utf8', function(err, data){ 
            if (err){
                console.log(err);
            }
            const python = spawn('python3', [__dirname +"/../../pythonScripts/sumar.py", data]);
            python.stdout.on('data', async function (data) {
            console.log('Pipe data from python script ...');
            dataToSend = await data.toString();
            });
            python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            return res.status(200).send(dataToSend)
            });
        }); 
    });
});

router.post('/api/voicefile', function (req, res) {
    uploadVoice(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
module.exports = router;