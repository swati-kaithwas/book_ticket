const sendResponse = require("../helper/responseSender");
const setJwtToken = require("../middleware/jwtAuth");
const Userservice = require("../service/user.service");
const crypto = require("crypto-js");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sfgjgsuuhduhudsusu";
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const signup = async (req, res) => {
  try {
    /*
    1. email,name,password is required!
    2.vaildate name ,email,password
    */
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const { email, name, password } = req.body;
    //   validate field
    if (!email || !password || !name)
      return sendResponse(res, 400, {
        sataus: false,
        message: "Please fill all details",
      });
    else if (spChars.test(name) || name.match(numbers)) {
      return sendResponse(res, 400, {
        sataus: false,
        messaage: "name must not have special characters and numbers !",
      });
    } else if (!validator.validate(email)) {
      return sendResponse(res, 400, {
        status: false,
        message: "please enter correct email",
      });
    } else if (!password.match(upperCaseLetters) || password.length < 8) {
      return sendResponse(res, 400, {
        status: false,
        message: "Password must have at least 8 characters and one uppercase!",
      });
    }

    let checkuser = await Userservice.findUserByMail(email);
    // console.log("dfghj", checkuser);
    if (checkuser) {
      return sendResponse(res, 400, {
        status: false,
        message: "Email already exist",
      });
    }


  //  let saltRounds = 90;
  //  let  salt = bcrypt.genSaltSync(saltRounds);
    // let hashedPass = crypto.HmacSHA512(password, Key);
    const hashedPass = bcrypt.hashSync(password);
    // console.log(hashedPass,"degefgejbfjgfrj")
    const user = await Userservice.create({
      email: email.toLowerCase(),
      password: hashedPass,
      name: name,
    });
    if (!user)
      return sendResponse(res, 400, {
        status: false,
        message: "somthing went wrong....",
      });
    return sendResponse(res, 200, {
      status: true,
      data: user,
      message: "Singup Success",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      satus: false,
      message: "Internal Error",
    });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const user = await User.findOne({ email });
   
    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const isMatch =  await bcrypt.compareSync(password, user.password);
   
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "3d" });
    res
      .status(200)
      .json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
        message:"login successfully"
      });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong",error:err.message });
  }
};

const UpadteProfile = async (req, res) => {
  try {
    /*
          1. id is required
          */
    let { id, name } = req.body;
    if (!id)
      return sendResponse(res, 400, {
        status: false,
        message: " Id is required !",
      });
    let obj = {
      id,
      name,
    };
    // update profile function
    let content = await Userservice.updateProfile(id, obj);

    if (!content)
      return sendResponse(400, res, {
        status: false,
        message: "profile not update !",
      });
    return res.status(200).send({
      status: true,
      data: content,
      message: "sucessfully update profile!",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};
const logout = async (req, res) => {
  try {
    /*
          1.user token =null
          */
    let isLoggedOut = await userServices.logout(req.tokenData);
    if (!isLoggedOut)
      return res
        .status(400)
        .json({ status: false, message: "Unable to logout." });
    res.status(200).json({ status: true, message: "successfully logged out" });
  } catch (error) {
    console.log("error in logout api: ", error);
    res.status(500).json({ status: false, message: "Internal error" });
  }
};

module.exports = {
  signup,
  login,
  UpadteProfile,
  logout,
};
