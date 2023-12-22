"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl,
      });
      if (res?.error) {
        toast.error("Invalide email or password");
      } else {
        router.push("/profile");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("An error occured during login");
    }
  };
  return (
    <>
      <div>
        <button
          onClick={() => signIn("github")}
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center p-4 gap-6 [&_div]:flex [&_div]:flex-col m-4 mt-10 [&_div>label]:text-lg [&_div>label]:font-semibold [&_div>input]:py-2 [&_div>input]:w-72 [&_div>input]:rounded-md [&_div>input]:px-2 [&_div>input]:text-black [&_div>input]:outline-none"
      >
        <div>
          <label htmlFor="emailInput">Email</label>
          <input
            type="email"
            name="email"
            id="emailInput"
            placeholder="test@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            name="password"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            onClick={() => signIn("credentials")}
            type="submit"
            value="Log In"
            className="px-10 rounded-md bg-green-400 cursor-pointer"
          />
        </div>
      </form>
    </>
  );
};

export default LoginPage;
