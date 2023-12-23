"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import User from "../models/user";
const ProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  console.log("email", session?.user._id);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:3000/api/profile", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user?._id,
          firstName,
          lastName,
          phone,
          dob,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log("failed to send data");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  };
  return (
    <>
      <section>
        <form
          onSubmit={handleSubmit}
          className="p-5 m-4 flex items-center justify-center gap-3 flex-col
        [&_div]:flex [&_div]:flex-col [&_div]:items-start [&_div>label]:text-md [&_div>label]:font-semibold [&_div>label]:p-1 [&_div>input]:py-2 [&_div>input]:w-72 [&_div>input]:rounded-md [&_div>input]:text-black [&_div>input]:outline-none [&_div>input]:border-2 [&_div>input]:border-pink-900 [&_div>input]:px-2"
        >
          <div>
            <button onClick={() => router.push("/")}>Back to Home</button>
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="tel"
              id="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Save"
              className="bg-blue-300 hover:bg-blue-400 cursor-pointer"
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default ProfilePage;
