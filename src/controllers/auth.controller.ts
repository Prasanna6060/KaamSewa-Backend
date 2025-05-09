import { RequestHandler,Request, Response, NextFunction } from "express";
import User from "../models/user.model";

 export const registerUser = async function(
  req: Request,
  res: Response,
  next: NextFunction
)  {
  
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


