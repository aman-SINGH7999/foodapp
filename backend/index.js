const express = require('express')
const app = express();
const mongoDB = require('./db')

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

const router = require('./routes/createUser')
const router2 = require('./routes/displaydata')
const router3 = require('./routes/orderData')

app.use(express.json());
mongoDB();

app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.use('/api',router)
app.use('/api',router2)
app.use('/api',router3) 

app.listen(5000,()=>{ 
    console.log("server is listinung at port 5000")
})