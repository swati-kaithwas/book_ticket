const path = require("path");
const multer = require("multer");

////////////////////multer-start///////////////////////////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
 
      cb(
        null,
        path.join(__dirname, "../public/moviesimages"),
        function (err, success) {
          if (err) throw err;
        }
      );
    
  },

  filename: function (req, file, cb) {
    // console.log("file:", file);
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (error1, success1) {
      if (error1) throw error1;
    });
  },
});
//
const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      console.log("only jpg & png file supported !");
      callbackPromise(null, false);
    }
  }
});

module.exports = { upload };