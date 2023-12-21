import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
    unique: [true, "Password should 8 character"],
  },
  image: {
    type: String,
    data: Buffer,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
