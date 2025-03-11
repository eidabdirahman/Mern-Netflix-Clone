import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body); // Log the incoming request body
    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "Please fill in all fields." });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address." });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: "Email already exists." });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ success: false, message: "Username already exists." });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const pics = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = pics[Math.floor(Math.random() * pics.length)];

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image
    });
    if(newUser){
        generateTokenAndSetCookies(newUser._id, res);
        await newUser.save();
        res.status(201).json({
          success: true,
          user: {
            ...newUser._doc,
            password: ""
          }
        });
    }

  

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({ success: false, message: "all fields are required"});
        }
            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({ success: false, message: "invalid credentials"});
            };

            const ispasswordCorrect = await bcryptjs.compare(password , user.password);
            if(!ispasswordCorrect) {
                return res.status(400).json({ success: false, message: "invalid password"});
            };

            generateTokenAndSetCookies(user._id, res);
            res.status(200).json({
              success: true,
              user: {
                ...user._doc,
                password: ""
              }
            });
    
        
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "internal server error" });
        
    }
}
const logout = async (req, res) => {
    try {
        res.clearCookie('jwt-netflix');
        return res.status(200).json({success:true, message : "logged out successfully"});
        
    } catch (error) {
        console.log("errron in logout controller ", error.message);
        res.status(500).json({ success: false, message: "internal server error" });

    }
}

const AuthCheck = async (req, res) => {
  try {
    res.status(200).json({success:true, user: req.user});
  } catch (error) {
    console.log("error in auth check controller ", error.message);
    res.status(500).json({ success: false, message: "internal server error" });
    
  }
}

export {
  signup,
  login,
  logout,
  AuthCheck
};
