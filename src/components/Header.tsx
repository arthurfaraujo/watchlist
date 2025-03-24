"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-neutral-800 w-full">
      <div className="max-w-screen-xl xl:mx-auto mx-4 text-neutral-100 flex justify-between items-center p-2 ">
        <Link
          className="hidden sm:flex gap-2 font-bold text-xl cursor-pointer"
          href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m20.84 2.18l-3.93.78l2.74 3.54l1.97-.4zm-6.87 1.36L12 3.93l2.75 3.53l1.96-.39zm-4.9.96l-1.97.41l2.75 3.53l1.96-.39zm-4.91 1l-.98.19a1.995 1.995 0 0 0-1.57 2.35L2 10l4.9-.97zM20 12v8H4v-8zm2-2H2v10a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2z"
            />
          </svg>
          <span>WatchList</span>
        </Link>
        <div className="w-1/2 sm:mx-4 mx-2 relative">
          <SearchBar />
        </div>
        <ul className="text-sm font-semibold flex justify-between items-center">
          <li className="cursor-pointer whitespace-nowrap">
            <Link href="/mywatchlist">Minha Lista</Link>
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
    </header>
  );
}