import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "technician" | "user";
  address?: string;
  profilePicture?: {
    url: string;
    public_id: string;
  };
  phoneNumber?: string;
  isEmailVerified: boolean;
  refreshToken: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  permissions: string[];
  dateOfBirth?: Date;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/.test(v),
        message: "Invalid email format!",
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "technician", "user"],
      default: "user",
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    profilePicture: {
      url: { type: String },
      public_id: { type: String },
    },
    phoneNumber: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    permissions: [
      {
        type: String,
      },
    ],
    dateOfBirth: { type: Date },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken =  function (this: IUser) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiry = process.env.ACCESS_TOKEN_EXPIRY;

  if (!secret || !expiry) {
    throw new Error("Missing ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY in environment variables.");
  }

  return jwt.sign(
    { _id: this._id, role: this.role, email: this.email },
    secret,
    {
      expiresIn: parseInt(expiry),
    }
  );
};


userSchema.methods.generateRefreshToken = function () {};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
