var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function(req, res, next) {
    var jwtToken = req.cookies.jwtToken;
    if(jwtToken){
        jwt.verify(jwtToken,process.env.MY_SECRET,function (err) {
                if(err){
                    res.render('login');
                } else {
                    res.redirect('/admin');
                }
            });
    } else {
        res.render('login');
    }

});
router.post('/authentication',function (req,res) {
      if(req.body.username ==='admin' && req.body.password === '123'){
          var payload = {
            username:'admin',
              role:'admin',
          };
          var jwtToken = jwt.sign(payload,process.env.MY_SECRET);
          res.cookie('jwtToken',jwtToken,{maxAge:60*1000*60*24*365,httpOnly:true});
          res.send(jwtToken);
      }else{
        res.send('unauth');
      }
});
module.exports = router;
