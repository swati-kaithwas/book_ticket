var express = require('express');
var router = express.Router();
const usercontroller= require("../controller/user.controller")
router.use((req, res, next) => {
  console.log(
    "TEST ROUTE: " + req.originalUrl + "::" + new Date().toISOString()
  );
  next();
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 router.post("/signup",usercontroller.signup);
 router.post("/login",usercontroller.login);
module.exports = router;
