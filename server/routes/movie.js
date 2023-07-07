var express = require('express');
var router = express.Router();
const moviecontroller = require("../controller/movie.controller");
const { upload } = require('../helper/multer');
router.use((req, res, next) => {
  console.log(
    "TEST ROUTE: " + req.originalUrl + "::" + new Date().toISOString()
  );
  next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/create",upload.single("movie_images"),moviecontroller.createMovie);
router.get("/getall",moviecontroller.getAllMovie);
router.get("/getbyid/:id",moviecontroller.getById)
module.exports = router;
