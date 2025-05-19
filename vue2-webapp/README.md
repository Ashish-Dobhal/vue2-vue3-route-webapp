# Vue2 Container App for Micro-Frontend Architecture

This project serves as a Vue 2 container application that hosts and manages micro-frontends, specifically designed to load Vue 3 micro-apps dynamically.

## Project Overview

The Vue2 Container App demonstrates a micro-frontend architecture where a Vue 2 application serves as the shell/container that can load externally hosted Vue 3 components or applications.

### Key Features

- Vue 2.7 container application
- Ability to load remote Vue 3 micro-frontends via ESM imports
- Route-based micro-frontend loading
- Simple navigation interface

## Project Structure

- `public/index.html` - Main HTML file that includes the script for loading remote micro-frontends
- `src/App.vue` - Root Vue component that includes the MicroFrontendLoader
- `src/components/MicroFrontendLoader.vue` - Component responsible for loading and mounting remote micro-frontends
- `src/main.js` - Vue application entry point

## How It Works

1. The container app provides a UI with navigation buttons
2. When a route is selected, the `loadRoute` method in `MicroFrontendLoader.vue` is called
3. This triggers the globally available `window.loadVue3Route` function defined in `index.html`
4. The function dynamically imports a remote Vue 3 application from a specified URL
5. The imported module's `mount` function is called to render the micro-frontend into the designated container div

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run serve
```

### Production Build

```bash
# Build for production
npm run build
```

## Configuration

To connect to your own micro-frontends:

1. Update the import URL in `public/index.html` to point to your micro-frontend's ESM build location
2. Ensure your micro-frontend exports a `mount` function that accepts a route name and container element

## Technical Details

- The application currently expects the remote micro-frontend to expose a `mount` function
- The micro-frontend is loaded into the `#micro-frontend-root` element
- By default, the `/about` route is loaded after initialization

## Dependencies

- Vue 2.7
- Vue CLI 5

## Notes

This is a demonstration of micro-frontend architecture and may need adjustments for production use, including:

- Proper error handling for failed imports
- Loading states
- Unmounting logic when switching between micro-frontends
- Authentication and data sharing between container and micro-frontends
