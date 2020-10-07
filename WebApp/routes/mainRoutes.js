const express = require('express');
const router = express.Router();
let ejs = require('ejs');

router.get("/",async (req,res,next)=>{
    res.render("home");
})
router.get("/text", async (req,res,next)=>{
    res.render("textinput");
})

router.get("/textuploader", async (req,res,next)=>{
    res.render("uploader");
})

module.exports = router;