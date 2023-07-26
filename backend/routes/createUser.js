const express = require('express')
const router = express.Router();
const User = require('../models/User')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = "IloveAGirlHerNameIsIDontNo??"

router.post('/createuser',
[ body('name').isLength({min:5}),
body('email').isEmail(),
body('password').isLength({min:5}) ],
 async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return await res.status(400).json({errors:errors.array()})
    }

    try{
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : await bcrypt.hash(req.body.password,10),
            location : req.body.location,
        })
        res.json({success : true});
    }catch(e){
        console.log(e);
        res.json({success:false})
    }
})

router.post('/loginuser', async (req,res)=>{
    console.log("req body : ",req.body)
    const email = req.body.email
    
    try{
        const result = await User.findOne({email});

        if(!result){
            return res.status(400).json({errors:"Try login with correct information!"})
        }
        const pass = await bcrypt.compare(req.body.password, result.password)
        if(!pass){
            return res.status(400).json({errors:"Try login with correct information!"})
        }
        console.log(result)

        const data = {
            user : {
                id : result.id
            }
        }

        const authToken = jwt.sign(data,jwtSecret)

        return res.json({success:true,authToken:authToken});
    }catch(e){
        console.log(e);
        res.json({success:false})
    }
    
})

module.exports = router