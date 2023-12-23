import connectDB from "@/app/helper/connectDB";
import User from "@/app/models/user";
import UserInfo from "@/app/models/userInfo";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
export const POST = async (req: any) => {
  try {
    await connectDB();
    const { userId, firstName, lastName, phone, dob } = await req.json();
    console.log("userId", userId);
    const saveProfile = await UserInfo.create({
      userId: userId,
      firstName,
      lastName,
      phone,
      dob,
    });

    console.log("saveProfile", saveProfile);
    return NextResponse.json({ saveProfile });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to save data. Please try again.");
  }
};

export const GET = async (req: any) => {
  await connectDB();
  const user = await User.find();
  return NextResponse.json({ user });
};
