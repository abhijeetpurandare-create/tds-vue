/** @type { import('@storybook/react-vite').Preview } */

import "@delhivery/tarmac/dist/style.css"; 
import "../src/input.css"
// import "../../../packages/molecules/build/output.css"

// Add process polyfill for browser environment
if (typeof window !== 'undefined' && !window.process) {
  window.process = {
    env: {
      NODE_ENV: 'development',
    },
  };
}

const preview = { 
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Tarmac TDS', 'Atoms', 'Molecules', '*'],
      },
    },
  },
};

export default preview;