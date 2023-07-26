const mongoose = require('mongoose');

const dburl = "mongodb://0.0.0.0:27017/fooddb"

const mongoDB = async ()=>{
    try{
        await mongoose.connect(dburl)
        console.log("connected");
        const food_data = await mongoose.connection.db.collection("food_data");
        food_data.find({}).toArray().then( async (foodData)=>{
            const food_category = await mongoose.connection.db.collection('food_category');
            food_category.find({}).toArray().then((catData)=>{
                global.foodItems = foodData;
                global.foodCat = catData;
                // console.log(catData)
            })
        }).catch((e)=>{
            console.log(e.message)
        })
    }catch(err){
        console.log(err);
    }
}

module.exports = mongoDB;