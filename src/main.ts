import "./style.css"
import Header from "./home-page/components/header"

document.querySelector<HTMLDivElement>("body")!.className = "bg-neutral-900"
document.querySelector<HTMLDivElement>("#app")!.className = "h-[3281px] w-full flex flex-col items-center"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
${Header()}
<main class="w-4/6">hello world</main>
`