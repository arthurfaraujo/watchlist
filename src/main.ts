import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <header class="">
        <nav class="flex justify-between items-center p-4">
          <h3 class="text-4xl cursor-pointer">WatchList</h3>
  
          <ul class="flex justify-between gap-2">
            <li class="cursor-pointer">Minhas listas</li>
            <li class="cursor-pointer">Filmes avaliados</li>
          </ul>
        </nav>
      </header> 
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
