import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="bg-neutral-800 w-full">
      <div className="max-w-screen-xl xl:mx-auto mx-4 text-neutral-100 flex justify-between items-center p-2 ">
        <a
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
        </a>
        <div className="w-1/2 sm:mx-4 mx-2 relative">
          <SearchBar />
        </div>
        <ul className="text-sm font-semibold flex justify-between items-center">
          <li className="cursor-pointer whitespace-nowrap">
            <a href="/mywatchlists">Minhas Listas</a>
          </li>
          <li className="flex justify-center items-center ml-4 w-10 h-10 border rounded-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeDasharray="28"
                strokeDashoffset="28"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2">
                <path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.4s"
                    values="28;0"
                  />
                </path>
                <path d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.4s"
                    dur="0.4s"
                    values="28;0"
                  />
                </path>
              </g>
            </svg>
          </li>
        </ul>
      </div>
    </header>
  );
}
