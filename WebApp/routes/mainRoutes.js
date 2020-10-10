const express = require('express');
const router = express.Router();
let ejs = require('ejs');
var path = require('path');
var fs = require('fs');
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        if (file.fieldname == 'textfile'){
            callback(null, file.fieldname+'.txt');
        }
        else{
            callback(null, file.fieldname+'.mp4');
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
        if (ext != '.mp4') {
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
    data = req.body.data
    console.log(data)
})
router.post('/api/txtfile', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            // console.log(err);
            return res.end("Error uploading file.");
        }
        fs.readFile(__dirname + '/../uploads/textfile.txt', 'utf8', function(err, data){ 
            if (err){
                console.log(err);
            }
            console.log(data); 
        }); 
        res.end("File is uploaded");
    });
});

router.post('/api/voicefile', function (req, res) {
    uploadVoice(req, res, function (err) {
        if (err) {
            // console.log(err);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});


module.exports = router;