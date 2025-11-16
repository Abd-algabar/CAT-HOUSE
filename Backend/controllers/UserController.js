import User from "../models/User.js";
import Cat from "../models/Cat.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const CreateUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).send("جميع الحقول مطلوبة");
    }
    if (name.length<2) {
       return res.status(400).send("الاسم قصير جدا ");
    }
    const isValid = /^09\d{8}$/.test(phone);
    if (!isValid) {
      return res.status(400).send("رقم الهاتف غير صحيح");
    }
    const findUser = await User.findOne({ phone });
    if (findUser) {
      return res.status(400).send(" لا يمكنك استخدام هذا الرقم حاول برقم اخر");
    }
    if (password.length < 6) {
      return res
        .status(400)
        .send("كلمة السر قصيرا جدا يجب ادخال 6 محارف على الاقل");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, phone, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({status:true, message:"User created successfully"});
  } catch (error) {
    // console.error("Error in CreateUser:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({status:false, message:"All fields are required"});
    }
    const findUser = await User.findOne({ phone });
    if (!findUser) {
      return res.status(400).json({status:false, message:"Invalid phone or password"});
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({status:false, message:"Invalid phone or password"});
    }
    const payload = { userId: findUser._id, name: findUser.name, phone: findUser.phone };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      token,
      user: {
        name: findUser.name,
        phone: findUser.phone,
      },
    });
  } catch (error) {
    // console.error("Error in LoginUser:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const verifyToken =  async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user.userId,
        name: req.user.name,    
        phone: req.user.phone,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
}

export const MyAccount=async(req,res)=>{
  try {
    const user=req.user;
    const myCats=await Cat.find({owner:user.userId})
    return res.json({success:true ,cats:{
      myCats,
      count:myCats.length
    },user:{
      name:user.name,
      phone:user.phone
    } })
  } catch (error) {
      console.log("my",error);
  }
}