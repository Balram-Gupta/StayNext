 const express = require("express");
    const router = express.Router({mergeParams : true});
    const wrapAsync = require("../utils/wrapAsync.js");
    const {isLogin, validateReview, isAuthor } = require("../middleware.js");
        const reviewController = require("../controller/review.js");

  
  //post review
  router.post("/", isLogin, validateReview, wrapAsync(reviewController.addReview ));
  
  //delete review route
  router.delete("/:reviewId", isLogin, isAuthor, wrapAsync(reviewController.deleteReview));

      module.exports = router;