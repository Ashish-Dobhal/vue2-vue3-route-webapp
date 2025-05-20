import { mount } from './mounted';
// This file is only used during development
  const appElement = document.getElementById('app');
  if (appElement) {
    mount(appElement, {
      // Dev-specific props
      showHeader: true,
      title: 'Dev Mode - Micro Frontend'
    });
  } else {
    console.error('Root element #app not found');
  }
