import SearchBar from "./searchBar"

export default function Header() {
    return `
<header class="t-1 sticky text-neutral-100">
  <nav class="flex justify-between items-center p-4">
    <p class="font-bold text-2xl cursor-pointer">WatchList</p>
    ${SearchBar()}
    <ul class="font-semibold flex justify-between items-center gap-8">
        <li class="cursor-pointer">Minhas listas</li>
        <li class="w-10 h-10 border rounded-full cursor-pointer"></liv>
    </ul>
  </nav>
</header> 
    `
} 