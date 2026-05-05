// Register all Tarmac web components once
import '@tarmac/web-components';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
    },
  },
  options: {
    storySort: {
      order: ['Atoms', 'Form', 'Feedback', 'Overlay', 'Navigation', 'Layout', 'Action'],
    },
  },
};
