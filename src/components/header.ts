import SearchBar from "./searchBar"

export default function Header() {
    return `
<nav class="bg-neutral-800 w-full">
  <div class="w-4/6 mx-auto text-neutral-100 flex justify-between items-center p-2 ">
    <a href="/" class="text-xl font-bold">WatchList</a>
    ${SearchBar()}
    <ul class="font-semibold flex justify-between items-center gap-8">
      <li class="cursor-pointer"><a href='/mywatchlists'>Minhas Listas</a></li>
      <li class="w-10 h-10 border rounded-full cursor-pointer"></liv>
    </ul>
  </div>
</nav>
    `
} 