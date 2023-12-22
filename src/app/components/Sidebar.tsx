"use client";
import React from "react";
import { MdEventAvailable } from "react-icons/md";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Sidebar = ({ name }: any) => {
  const route = useRouter();
  const Links = [
    {
      icon: <MdEventAvailable />,
      label: "All Events",
      href: "/",
    },
    {
      icon: <CiBookmark />,
      label: "Bookmark",
      href: "/bookmark",
    },
    {
      icon: <BiCategory />,
      label: "Category",
      href: "/category",
    },
  ];
  const { data: session, status } = useSession();
  console.log("session", status);
  // console.log(session?.user?.image!);
  if (status === "loading") {
    return <p>Plese wait!</p>;
  }
  return (
    <div
      id="sideBar"
      className="w-80 border-2 border-white h-screen flex items-center flex-col justify-between p-4"
    >
      <div className="flex flex-col items-center gap-2">
        {session?.user?.email ? (
          <>
            <Image
              src={session.user.image!}
              alt="profile Photo"
              width={70}
              height={70}
              className="rounded-full"
            />
            <p>{session.user.email}</p>
            <p>{name}</p>
            <Link
              href="/profile"
              className="text-sm border-2 px-6 py-2 rounded"
            >
              Edit Profile
            </Link>
          </>
        ) : (
          <div className="p-2 flex flex-col gap-2 [&_button]:border-2 [&_button]:py-2 [&_button]:px-5 [&_button]:rounded-md">
            <Link href={"/signup"}>
              <button>Sign Up</button>
            </Link>
            <Link href={"/login"}>
              <button>Log In</button>
            </Link>
          </div>
        )}
      </div>
      <div>
        <ul>
          {Links.map((link) => (
            <li
              key={link.label}
              className="flex items-center justify-evenly gap-2 text-xl p-3 text-black/100 hover:text-white m-2  rounded-md cursor-pointer"
            >
              {link.icon}
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <>
          {session?.user?.email ? (
            <div>
              <button onClick={signOut}>Sign Out</button>
            </div>
          ) : (
            <button onClick={signIn}>Log In</button>
          )}
        </>
      </div>
    </div>
  );
};

export default Sidebar;
