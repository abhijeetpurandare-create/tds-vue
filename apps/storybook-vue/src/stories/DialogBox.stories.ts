import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, styles } from './utils/showcase';

const meta: Meta = {
  title: 'Tarmac TDS/DialogBox',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:16px;padding:24px;';

    const btn = document.createElement('tarmac-button');
    btn.setAttribute('variant', 'black');
    btn.setAttribute('size', 'md');
    btn.setAttribute('button-style', 'primary');
    btn.setAttribute('text', 'Open Dialog');

    const dialog = document.createElement('tarmac-dialog-box');
    dialog.setAttribute('dialog-type', 'standard');
    dialog.setAttribute('size', 'web');
    dialog.innerHTML = `
      <span slot="title">Dialog Title</span>
      <p slot="content">This is the dialog content. You can place any content here.</p>
    `;

    btn.addEventListener('click', () => {
      dialog.setAttribute('open', '');
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(dialog);
    return wrapper;
  },
};

export const Showcase: Story = {
  name: 'Showcase',
  render: () => {
    const types = ['standard', 'slots', 'slotsx2'];
    const sizes = ['mobile', 'web'];

    let content = '';
    for (const type of types) {
      for (const size of sizes) {
        content += `
          <div style="margin:16px 0;">
            <p style="font-size:11px;color:#9ca3af;margin-bottom:8px;">${type} / ${size}</p>
            <tarmac-dialog-box dialog-type="${type}" size="${size}" open>
              <span slot="title">Dialog Title</span>
              <p slot="content">Dialog content for ${type} / ${size}.</p>
            </tarmac-dialog-box>
          </div>
        `;
      }
    }

    return page(
      sectionTitle('Dialog Types & Sizes') + content,
      '3 Types × 2 Sizes'
    );
  },
};
