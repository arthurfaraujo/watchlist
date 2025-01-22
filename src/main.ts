import "./style.css"
import Header from "./header.ts"

document.querySelector<HTMLDivElement>("body")!.className = "bg-neutral-800 h-screen"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
${Header()}
`