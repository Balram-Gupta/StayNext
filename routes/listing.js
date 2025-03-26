if(process.env.Node_ENV != "production"){
    require('dotenv').config()    
}
    
    const express = require("express");
    const router = express.Router();
    const wrapAsync = require("../utils/wrapAsync.js");
    const { isLogin, validateListing, isOwner} = require("../middleware.js");
     const listingController = require("../controller/listing.js");
     const multer  = require('multer')
      const { storage} = require("../cloudinary.js");
     const upload = multer({ storage });
      
     // index and show route
     router.route("/")
    .get(wrapAsync(listingController.index))
     .post(isLogin,
         upload.single('listing[image]'), 
         validateListing,
           wrapAsync( listingController.newRoute));
    

  

    //new route
    router.get("/new",isLogin, 
         wrapAsync( listingController.renderForm));
    
    //show route
    router.route("/:id")
    .get(wrapAsync( listingController.show))
    .put(isLogin, isOwner,upload.single('listing[image]'), validateListing, (listingController.updateRoute))
    .delete(isLogin, isOwner, (listingController.deleteRoute));

    
    //edit route
    router.get("/:id/edit", isLogin, isOwner, wrapAsync(listingController.editRoute));
   
    module.exports = router;
