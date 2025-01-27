import '@/style.css'
import { render } from '@/router'

export const app = document.querySelector<HTMLDivElement>('#app')
document.querySelector<HTMLDivElement>('body')!.className = 'bg-neutral-900 min-h-screen'

window.addEventListener('popstate', () =>
  render(new URL(window.location.href).pathname)
)

render(new URL(window.location.href).pathname)
