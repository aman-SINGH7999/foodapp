const express = require('express')
const router  = express.Router();

router.post('/fooddata', (req,res)=>{
    try{
        res.send([global.foodItems,global.foodCat])
    }catch(e){
        console.log(e);
    }
})

module.exports = router