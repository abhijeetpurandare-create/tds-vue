import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, styles } from './utils/showcase';

const VARIANTS = ['narrow', 'extended'] as const;

const meta: Meta = {
  title: 'Tarmac TDS/SideDrawer',
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
    btn.setAttribute('text', 'Open Side Drawer');

    const drawer = document.createElement('tarmac-side-drawer');
    drawer.setAttribute('variant', 'narrow');
    drawer.innerHTML = `
      <span slot="title">Drawer Title</span>
      <div slot="content"><p>Side drawer content goes here.</p></div>
    `;

    btn.addEventListener('click', () => {
      drawer.setAttribute('open', '');
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(drawer);
    return wrapper;
  },
};

export const Showcase: Story = {
  name: 'Showcase',
  render: () => {
    let content = '';
    for (const variant of VARIANTS) {
      content += `
        <div style="margin:16px 0;">
          <p style="font-size:11px;color:#9ca3af;margin-bottom:8px;">Variant: ${variant}</p>
          <div style="border:1px dashed #e5e7eb;padding:16px;border-radius:8px;position:relative;min-height:100px;">
            <tarmac-side-drawer variant="${variant}" open>
              <span slot="title">Drawer ${variant}</span>
              <div slot="content"><p>Content for ${variant} drawer.</p></div>
            </tarmac-side-drawer>
          </div>
        </div>
      `;
    }

    return page(
      sectionTitle('Side Drawer Variants') + content,
      '2 Variants: narrow, extended'
    );
  },
};
