const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/');
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

const validationRegisterForm = ({name,email,password}) => {
  var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
  var errors = [];
  if(name.length === 0)
    errors.push({msg:'name valid'});
  if(password.length <= 5)
    errors.push({msg:'password valid'});
  if(!pattern.test(email))
    errors.push({msg:'email valid'});
  return errors;
}

// @route   GET api/auth
// @desc    Get user data
// @access  Private
router.get('/', auth, 
  async (req,res) => {
  try {
    const user = await User.findOne({_id:req.user.id}).select('-password -__v').populate('friends.user','-password -friends -groups -__v').populate({path:'groups.group',select:'-__v',populate:{path:'people',select:'_id name avatar'}});
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login' ,
  [
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a valid password').exists().isLength({ min: 1 })
  ] ,
  async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
      return res.status(400).json({errors : errors.array()});
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if(!user)
      {
        return res.status(400).json({errors: [{msg:'Invalid credentials'}]})
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch)
        return res.status(400).json({errors: [{msg:'Invalid credentials'}]})

      // get JWT
      const payload = {
        user: {
          id:user.id,
        }
      };
      jwt.sign(payload,config.get('jwtSecret'),{expiresIn: 360000}, (err,token) => {
        if(err) throw err;
        res.json({token});
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register' ,upload.single('file'),
  async (req,res) => {
    const errors = validationRegisterForm(req.body);
    if(errors.length)
    {
      return res.status(400).json({errors});
    }
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if(user)
      {
        return res.status(400).json({errors: [{msg:'User already exists'}]})
      }
      //console.log(req.file.path);
      user = new User({ name,email,password});
      user.avatar.data = fs.readFileSync(req.file?req.file.path:'public/default.png');
      user.avatar.contentType = 'image/jpeg';
      // encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password,salt);
      // save user
      await user.save();
      // get JWT
      const payload = {
        user: {
          id:user.id,
        }
      };
      jwt.sign(payload,config.get('jwtSecret'),{expiresIn: 360000}, (err,token) => {
        if(err) throw err;
        res.json({token});
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});


module.exports = router;
