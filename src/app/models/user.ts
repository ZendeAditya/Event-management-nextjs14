import mongoose, { Schema } from "mongoose";
import { userInfo } from "os";
const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "userInfo",
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
