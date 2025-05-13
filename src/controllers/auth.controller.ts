import { RequestHandler,Request, Response, NextFunction } from "express";
import User from "../models/user.model";

 export const registerUser = async function( req: Request, res: Response, next: NextFunction): Promise<any>  {
  const { name, email, password, role } =req.body;
  try {
    const existingUser: any = User.findOne(email)
    if(existingUser) return res.status(400).json({ message: "User already exists with this email" })
    const newUser = new User({
         name,
         email,
         password,
         role
    })
    const saveUser = await newUser.save()
    return res.status(201).json({message: "User Registered Successfully", saveUser})
  } catch (error: any) {
    console.error(error.message)
  }
};

 export const loginUser  = async function(req: Request,res: Response, next: NextFunction): Promise<any> {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal server error" })
  }
};


