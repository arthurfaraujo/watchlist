import SearchBar from "./searchBar"

export default function Header() {
    return `
<nav class="bg-neutral-800 w-full">
  <div class="max-w-screen-xl xl:mx-auto mx-4 text-neutral-100 flex justify-between items-center p-2 ">
    <a class="hidden sm:block font-bold text-xl cursor-pointer" href="/">WatchList</a>
    ${SearchBar()}
    <ul class="text-sm font-semibold flex justify-between items-center">
        <li class="cursor-pointer whitespace-nowrap"><a href='/mywatchlists'>Minhas Listas</a></li>
        <li class="ml-4 w-10 h-10 border rounded-full cursor-pointer"></liv>
    </ul>
  </div>
</nav>
    `;
} 