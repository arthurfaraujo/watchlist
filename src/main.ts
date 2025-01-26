import "./style.css"
import Header from "./homepage/components/header"
import { moviesList } from "./homepage/components/moviesList"

document.querySelector<HTMLDivElement>("body")!.className = "bg-neutral-900"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
${Header()}
`

moviesList().then((moviesList) => {
    document.querySelector<HTMLDivElement>('#app')!.appendChild(moviesList)
})