import "./style.css"
import Header from "./homepage/components/header"
import MoviesList,{ movieBycategory } from "./homepage/components/moviesList"

document.querySelector<HTMLDivElement>("body")!.className = "bg-neutral-900"
document.querySelector<HTMLDivElement>("#app")!.className = "w-full flex flex-col items-center"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
${Header()}
`

MoviesList().then(moviesContainer => {
    document.querySelector<HTMLDivElement>('#app')!.appendChild(moviesContainer);
});

movieBycategory("35").then(moviesContainer => {
    document.querySelector<HTMLDivElement>('#app')!.appendChild(moviesContainer);
});