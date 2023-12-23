import mongoose, { Schema } from "mongoose";
import User from "./user";
const userInfoSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^\d{10}$/.test(v);
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid phone number!`,
      },
    },
    dob: {
      type: Date,
    }
  },
  { timestamps: true }
);

const UserInfo =
  mongoose.models.UserInfo || mongoose.model("UserInfo", userInfoSchema);

export default UserInfo;
