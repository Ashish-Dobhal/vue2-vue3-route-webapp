import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from 'vue-router/auto-routes'

console.log("##########################")
const mountedApps: Record<string, any> = {}

export async function mount(routeName: string, el: HTMLElement, options: { onNavigate?: (route: string) => void } ) {
  // Find the route by name
  const router = createRouter({
    history: createWebHistory(), // Uses browser history API
    routes,
  })
  const route = routes.find(r => r.name === routeName)
  if (!route) throw new Error(`Route ${routeName} not found`)

    router.push({ name: routeName })
    
  // Dynamically import the route component
  const component = await route.component()

  // Create a Vue app for this route
  const app = createApp(component.default || component)
  // Optional: Use router only if needed for nested routes
  // const router = createRouter({ history: createWebHistory(), routes: [route] })
  // app.use(router)
  app.mount(el)

  // Store app instance for potential unmounting
  mountedApps[routeName] = app
}

export function unmount(routeName: string, el: HTMLElement) {
  if (mountedApps[routeName]) {
    mountedApps[routeName].unmount()
    el.innerHTML = ''
    delete mountedApps[routeName]
  }
}
