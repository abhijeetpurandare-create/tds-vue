import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, styles } from './utils/showcase';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const meta: Meta = {
  title: 'Tarmac TDS/Popup',
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
    btn.setAttribute('text', 'Open Popup');

    const popup = document.createElement('tarmac-popup');
    popup.setAttribute('size', 'md');
    popup.innerHTML = `
      <span slot="title">Popup Title</span>
      <div slot="content"><p>This is the popup content.</p></div>
    `;

    btn.addEventListener('click', () => {
      popup.setAttribute('open', '');
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(popup);
    return wrapper;
  },
};

export const Showcase: Story = {
  name: 'Showcase',
  render: () => {
    let content = '';
    for (const size of SIZES) {
      content += `
        <div style="margin:16px 0;">
          <p style="font-size:11px;color:#9ca3af;margin-bottom:8px;">Size: ${size}</p>
          <div style="border:1px dashed #e5e7eb;padding:16px;border-radius:8px;position:relative;min-height:80px;">
            <tarmac-popup size="${size}" open>
              <span slot="title">Popup ${size.toUpperCase()}</span>
              <div slot="content"><p>Content for ${size} popup.</p></div>
            </tarmac-popup>
          </div>
        </div>
      `;
    }

    return page(
      sectionTitle('Popup Sizes') + content,
      '5 Sizes: xs, sm, md, lg, xl'
    );
  },
};
