var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/login');
});
router.get('/admin',function (req,res) {
    var jwtToken = req.cookies.jwtToken;
    if(jwtToken){
        jwt.verify(jwtToken,process.env.MY_SECRET,function (err) {
            if(err){
                res.redirect('/login');
            } else {
           var decodedToken = jwt.decode(jwtToken,{complete:true});
               res.render('admin',{username: decodedToken.payload.username,role:decodedToken.payload.role});

            }
        });
    } else {
      res.redirect('/login');
   }
});
module.exports = router;
