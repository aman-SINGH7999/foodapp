const express = require('express')
const Order = require('../models/Orders')

const router = express.Router();

router.post('/orderData', async (req,res)=>{
        
        // console.log("---------------------------------",req.body)
        let data = req.body.order_data;
        // console.log("data :  --- ",data)
        await data.splice(0,0,{order_date : req.body.order_date})

        let eld = await Order.findOne({"email" : req.body.email})
        // console.log("eld : ",eld)
        if(eld === null){
            try{
                await Order.create({
                    email : req.body.email,
                    order_data : [data]
                }).then(()=>{
                    res.json({success:true})
                })
            }catch(err){
                console.log(err)
                res.send("Server Error", err.message);
            }
        }else{
            try{
                await Order.findOneAndUpdate({"email" : req.body.email},{
                    $push : {order_data : data} 
                }).then(()=>{
                    res.json({success:true})
                })
            }catch(err){
                console.log(err)
                res.send("Server Error", err.message);
            }
        }
})

router.post('/myOrder', async (req,res)=>{
    try{
        const myData = await Order.findOne({'email':req.body.email});

        const result = [];
        for(const val of myData.order_data){
            let valArray = [];
            valArray.push(val[0].order_date);
            for(let i=1;i<val.length;i++){
                const arr = [];
                arr.push(val[i].name)
                arr.push(val[i].price)
                arr.push(val[i].qty)
                arr.push(val[i].size)
                valArray.push(arr)
            }
            result.push(valArray);
        }
        // console.log("--=================-----==============----------",result)
        res.json({orderData : result})
    }catch(err){
        res.send("Response error",err.message)
    }
})

module.exports = router