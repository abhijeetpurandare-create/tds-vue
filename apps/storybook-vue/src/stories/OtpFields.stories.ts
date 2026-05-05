import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const OTP_STYLES = ['default', 'success', 'error', 'info'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;

function otpCell(otpStyle: string, size: string): string {
  const attrs = `otp-style="${otpStyle}" size="${size}" length="4"`;
  return `<tarmac-otp ${attrs}></tarmac-otp>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/OtpFields',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-otp');
    el.setAttribute('otp-style', 'default');
    el.setAttribute('size', 'md');
    el.setAttribute('length', '4');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => {
    const cols = SIZES.length;
    const gridStyle = `${styles.grid}grid-template-columns:100px repeat(${cols}, 1fr);`;

    let rows = gridHeader(SIZES as unknown as string[]);
    for (const otpStyle of OTP_STYLES) {
      const cells = SIZES.map(size => otpCell(otpStyle, size));
      rows += gridRow(otpStyle, cells);
    }

    return page(
      sectionTitle('OTP Fields') + `<div style="${gridStyle}">${rows}</div>`,
      '4 Styles × 3 Sizes'
    );
  },
};
