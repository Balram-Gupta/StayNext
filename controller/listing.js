const { types } = require("joi");
const Listing = require("../models/listing.js");


module.exports.index = async (req, res)=>{
    const allListing =await Listing.find({});
    res.render("listing/index.ejs", { allListing});
};

module.exports.renderForm = (req, res)=>{
    res.render("listing/new.ejs");
};

module.exports.show = async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path :"reviews", populate : {path : "author"},}).populate("owner");
     if(!listing){
        req.flash("error", "listing you requested was deleted!");
        res.redirect("/listing");
     }
    res.render("listing/show.ejs", {listing});
}

//new route
module.exports.newRoute = async (req, res) => {
     let url = req.file.path;
     let  filename = req.file.filename;
        const newList = new Listing(req.body.listing);
        newList.owner = req.user._id;
        newList.image = {url, filename};
        await newList.save();
        req.flash("success", "New listing Created!");
        res.redirect("/listing");  
    };

        //edit route
  module.exports.editRoute = async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "listing you requested was deleted!");
        res.redirect("/listing");
     }
    res.render("listing/edit.ejs", {listing})
};

//update route
module.exports.updateRoute =  async (req, res)=>{
        let {id} = req.params;
       let listing =  await Listing.findByIdAndUpdate(id, {...req.body.listing});   

       if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let  filename = req.file.filename;
        listing.image = {url, filename};

         await listing.save();
}
        req.flash("success", " listing updated!");
        res.redirect(`/listing/${id}`);
    };

    //Delete route
    module.exports.deleteRoute = async (req, res)=>{
        let {id} = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", " listing Deleted!");

        res.redirect("/listing");
    };
