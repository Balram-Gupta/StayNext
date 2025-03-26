const User = require("../models/user");


module.exports.signup = async (req, res)=>{
       try{ 
        let {email, username, password} = req.body;
        let newUser = new User({email, username});
      let registerUser = await User.register(newUser, password);
          req.login(registerUser, (err)=>{
            if(err){
               return next(err);
            }
            req.flash("success", "Welcome to Wondurlust");
         res.redirect("./listing");
          }) 
       }catch(err){
          req.flash("error", err.message);
          res.redirect("/signup");
       }
    };

    module.exports.login =  async(req, res)=>{
        req.flash("success", "Welcome back to Wondurlust");
        let redirectUrl = res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl);
      };


      module.exports.logout = (req, res, next)=>{
        req.logout((err)=>{
            if(err){
               return next(err);
            }
            req.flash("success", "you are logout");
            res.redirect("/listing");
        });
    };