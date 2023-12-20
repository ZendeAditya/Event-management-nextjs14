import Image from "next/image";
import React from "react";
import { MdEventAvailable } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";
const Sidebar = () => {
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
  return (
    <div
      id="sideBar"
      className="w-80 border-2 border-white h-screen flex items-center flex-col justify-between p-4"
    >
      <div className="flex flex-col items-center gap-2">
        <Image
          src="https://pbs.twimg.com/profile_images/1604077005498384385/9rKVoKle_400x400.jpg"
          alt="profile Photo"
          width={70}
          height={70}
          className="rounded-full"
        />
        <p>Aditya Zende</p>
        <Link href="/profile" className="text-sm border-2 px-6 py-2 rounded">
          Edit Profile
        </Link>
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
      <div>sign Out</div>
    </div>
  );
};

export default Sidebar;
