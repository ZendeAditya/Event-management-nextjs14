"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
const SignUpPage = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Password must be same");
    }
    if (password.length < 8) {
      alert("Password should be 8 character long");
    }
    const res = await fetch("http://127.0.0.1:3000/api/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("inside fetch");
    if (res.ok) {
      let form = e.target;
      form.reset();
      alert("Successfully Registered!");
      router.push("/login");
    }
  };
  return (
    <>
      <section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center p-4 gap-6 [&_div]:flex [&_div]:flex-col m-4 mt-10 [&_div>label]:text-lg [&_div>label]:font-semibold [&_div>input]:py-2 [&_div>input]:w-72 [&_div>input]:rounded-md [&_div>input]:px-2 [&_div>input]:text-black [&_div>input]:outline-none"
        >
          <h2 className="text-3xl p-3">SignUp Here</h2>
          <div>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="username"
              id="userName"
              placeholder="your name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="eMail">Email</label>
            <input
              type="email"
              name="email"
              id="eMail"
              placeholder="test@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passWord">Password</label>
            <input
              type="password"
              name="password"
              id="passWord"
              placeholder="Strong Password"
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cPassword">Confirm Password</label>
            <input
              type="password"
              name="password"
              id="cPassword"
              placeholder="Strong Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Sign Up"
              className="py-2 px-71 bg-green-500 hover:bg-green-600 cursor-pointer"
            />
          </div>
          <div>
            <p className="text-center">Or</p>
            <button
              onClick={() => SignIn("github")}
              className="py-2 px-6 rounded-md m-2"
            >
              LogIn with github
            </button>
            <button
              onClick={() => signIn("google")}
              className="py-2 px-6 rounded-md m-2"
            >
              LogIn with Google
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignUpPage;
