"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "./LogoutButton";
import { FaSearch } from "react-icons/fa";
import { PiFilmSlateBold } from "react-icons/pi";
import { MdClose } from "react-icons/md";
import { useState } from "react";

export default function Header() {
  const { user } = useAuth();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  return (
    <header className="bg-neutral-800 w-full ">
      {showSearchBar ? (
        <div className="transition-all duration-100 ease-in-out max-w-screen-xl text-neutral-100 flex justify-between gap-2 items-center p-3 ">
          <SearchBar className="w-full" />
          <button
            onClick={() => setShowSearchBar(false)}
            className="text-white p-1 bg-red-600 hover:bg-red-700 rounded hover:cursor-pointer">
            <MdClose className="text-xl" />
          </button>
        </div>
      ) : (
        <div className="transition-all duration-100 ease-in-out relative max-w-screen-xl xl:mx-auto mx-4 text-neutral-100 flex justify-between items-center p-2 ">
          <Link
            className="flex items-center gap-2 font-bold cursor-pointer"
            href="/">
            <PiFilmSlateBold className="text-base sm:text-xl md:text-2xl" />
            <span className="text-xs sm:text-base md:text-xl">WatchList</span>
          </Link>
          <SearchBar className="w-full sm:block sm:w-1/2 sm:mx-4 hidden" />

          <ul className="text-sm font-semibold flex justify-between items-center">
            <li className="sm:hidden block mr-4">
              <FaSearch
                className="hover:cursor-pointer"
                onClick={() => setShowSearchBar(true)}
              />
            </li>
            <li className="text-xs md:text-sm cursor-pointer whitespace-nowrap">
              <Link href="/mywatchlists">Listas</Link>
            </li>
            {user ? (
              <li className="flex items-center gap-3 ml-4">
                <span className="text-xs text-gray-300 hidden sm:inline">
                  {user.email}
                </span>
                <LogoutButton />
              </li>
            ) : (
              <li className="flex justify-center items-center ml-4 w-10 h-10 cursor-pointer">
                <Link href="/auth/login">
                  <VscAccount className="text-4xl" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
