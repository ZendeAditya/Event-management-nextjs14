import connectDB from "@/app/helper/connectDB";
import User from "@/app/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export const POST = async (req: any) => {
  try {
    const res = req.json();
    await connectDB();
    const pass = res.password;
    if (!pass?.length || pass.length < 5) {
      new Error("password must be at least 5 characters");
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    res.password = bcrypt.hashSync(notHashedPassword, salt);

    const createdUser = await User.create(res);
    
    return NextResponse.json({ createdUser });
  } catch (error) {
    return NextResponse.json({ msg: "Something went wrong!" }, error!);
  }
};

export const GET = async () => {
  await connectDB();
  const user = await User.find();
  return NextResponse.json({ user });
};
