# Vue 3 Microfrontend

This project is a Vue 3 microfrontend application designed to be loaded and controlled by a container application. It's built with modern frontend tools and follows a modular architecture to be consumed as a remote module in a micro-frontend architecture.

## Project Overview

The Vue 3 Microfrontend demonstrates how to build a Vue 3 application that can be:
- Loaded remotely by a container application
- Mounted to a specific DOM element
- Navigated programmatically by the container

### Key Features

- Vue 3.4 with Composition API
- Vue Router 4 with file-based routing using unplugin-vue-router
- TypeScript support
- Exports mount/unmount functions for container integration
- Communicates with parent container via callbacks

## Project Structure

- `src/mounted.ts` - Entry point that exports mount/unmount functions for remote usage
- `src/App.vue` - Root Vue component with router setup
- `src/pages/` - Directory containing page components:
  - `index.vue` - Home page component
  - `about.vue` - About page component
- `vite.config.js` - Vite configuration with special build options for micro-frontend usage

## How It Works

1. The application builds with a special configuration that exports the `mount` and `unmount` functions
2. When loaded by a container app, the `mount` function can be called with:
   - A route name to navigate to
   - A DOM element to mount into
   - Optional callbacks for communication
3. The microfrontend creates an instance of Vue with the specified route
4. Pages can communicate back to the parent via injected callbacks

## Getting Started

### Prerequisites

- Node.js and npm/yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Build for Production

```bash
# Build for production as a microfrontend
npm run build
```

### Preview Build

```bash
# Preview the production build
npm run preview
```

## Integration with Container

The microfrontend is designed to be loaded by a container application like the Vue 2 Container. The container should:

1. Import the `mount` function from `mounted.js`
2. Call it with the route name and a DOM element
3. Optionally provide callbacks for navigation

Example:
```js
import { mount, unmount } from 'http://localhost:4173/mounted.js';

// Mount the microfrontend
mount('/', document.getElementById('micro-frontend-root'), {
  onNavigate: (route) => {
    // Handle navigation requests from the microfrontend
  }
});

// Later, to unmount:
unmount('/', document.getElementById('micro-frontend-root'));
```

## Technical Details

- Uses Vite as the build tool with a custom configuration to export the mount/unmount functions
- Leverages unplugin-vue-router for type-safe file-based routing
- Built as ESM modules for modern browser support
- TypeScript for enhanced developer experience and type safety

## Dependencies

- Vue 3.4
- Vue Router 4.3
- TypeScript 5
- Vite 5
- unplugin-vue-router

## Notes

This microfrontend is part of a micro-frontend architecture demonstration and may need adjustments for production use, including:
- Security considerations for cross-origin loading
- Shared dependencies management
- Styling isolation or coordination with container
