const Listing = require("./models/listing.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");



module.exports.isLogin = ((req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create Listing");
        res.redirect("/login");
 }
 next();
});

module.exports.saveRedirect = (req, res, next)=>{
   if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
   }
   next();
}

 module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      return next(new ExpressError(400, errMsg));  
    }
    next(); 
  };

  module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      return next(new ExpressError(400, errMsg));  // Pass the error to the error handler
    } 
      next();
    
  };


  module.exports.isOwner = async (req, res, next)=>{
     let {id} = req.params;
    const listing =await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not owner of the listing");
        return res.redirect(`/listing/${id}`);

    }
    next();
  }

  module.exports.isAuthor = async (req, res, next)=>{
    let {id, reviewId} = req.params;
   const review =await Review.findById(reviewId);
   if(!review.author.equals(res.locals.currUser._id)){
       req.flash("error", "You are not owner of the review");
       return res.redirect(`/listing/${id}`);

   }
   next();
 }