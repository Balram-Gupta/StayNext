const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wondurlust');
}

const initDb =async ()=>{
 await Listing.deleteMany({});
 initData.data = initData.data.map((obj)=>({...obj, owner: "67daea07f4fd209b9348dcd0"}));
 await Listing.insertMany(initData.data);
 console.log("Data have been initlized");
}
 
initDb();
