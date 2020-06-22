function checkSignIn(req, res,next){
    if (req.session.iduser) {
     
      return next();
    } else {
       res.redirect('/admin/')
    }
 }

 function checkSignInLogin(req, res,next){
   if (req.session.iduser) {
     
      res.redirect('/admin/index')
   } else {
      next()
   }
}

 module.exports={
checkSignIn,
checkSignInLogin
    
}