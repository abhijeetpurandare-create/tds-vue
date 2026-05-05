import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Atoms/Pill', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Solid: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';
    d.innerHTML = `
      <tarmac-pill pill-variant="black" pill-type="solid">Black</tarmac-pill>
      <tarmac-pill pill-variant="blue" pill-type="solid">Blue</tarmac-pill>
      <tarmac-pill pill-variant="success" pill-type="solid">Success</tarmac-pill>
      <tarmac-pill pill-variant="error" pill-type="solid">Error</tarmac-pill>
      <tarmac-pill pill-variant="warning" pill-type="solid">Warning</tarmac-pill>
    `;
    return d;
  },
};

export const Subtle: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';
    d.innerHTML = `
      <tarmac-pill pill-variant="black" pill-type="subtle">Black</tarmac-pill>
      <tarmac-pill pill-variant="blue" pill-type="subtle">Blue</tarmac-pill>
      <tarmac-pill pill-variant="success" pill-type="subtle">Success</tarmac-pill>
      <tarmac-pill pill-variant="error" pill-type="subtle">Error</tarmac-pill>
    `;
    return d;
  },
};

export const Outlined: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';
    d.innerHTML = `
      <tarmac-pill pill-variant="black" pill-type="outlined">Black</tarmac-pill>
      <tarmac-pill pill-variant="blue" pill-type="outlined">Blue</tarmac-pill>
      <tarmac-pill pill-variant="success" pill-type="outlined">Success</tarmac-pill>
    `;
    return d;
  },
};
