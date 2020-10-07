const express = require('express');
const router = express.Router();
let ejs = require('ejs');

router.get("/",async (req,res,next)=>{
    res.render("../views/home");
})

module.exports = router;