import connectDB from "@/app/helper/connectDB";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const POST = async (req: any) => {
  try {
    await connectDB();
    const { username, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ newUser });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
