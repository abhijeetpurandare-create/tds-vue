import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Form/Toggle', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:24px;align-items:center';
    d.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center"><tarmac-toggle tarmac-color="black" tarmac-style="filled" checked></tarmac-toggle><span style="font-size:12px">Black</span></div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center"><tarmac-toggle tarmac-color="blue" tarmac-style="filled" checked></tarmac-toggle><span style="font-size:12px">Blue</span></div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center"><tarmac-toggle tarmac-color="dlv_red" tarmac-style="filled" checked></tarmac-toggle><span style="font-size:12px">DLV Red</span></div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center"><tarmac-toggle tarmac-color="green" tarmac-style="filled" checked></tarmac-toggle><span style="font-size:12px">Green</span></div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center"><tarmac-toggle tarmac-color="black" tarmac-style="outlined" checked></tarmac-toggle><span style="font-size:12px">Outlined</span></div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center"><tarmac-toggle tarmac-color="black" disabled></tarmac-toggle><span style="font-size:12px">Disabled</span></div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center"><tarmac-toggle tarmac-color="black" is-ghost></tarmac-toggle><span style="font-size:12px">Ghost</span></div>
    `;
    return d;
  },
};
