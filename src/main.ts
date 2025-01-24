import "./style.css"
import Header from "./home-page/components/header"
import MoviesList from "./home-page/components/moviesList"

document.querySelector<HTMLDivElement>("body")!.className = "bg-neutral-900"
document.querySelector<HTMLDivElement>("#app")!.className = "h-[3281px] w-full flex flex-col items-center"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
${Header()}
`

MoviesList().then(moviesContainer => {
    document.querySelector<HTMLDivElement>('#app')!.appendChild(moviesContainer);
});