import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define User Interface
export interface IUser {
  username: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

// Define Mongoose Schema
const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash Password Before Saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare Password Method
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Create Model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
