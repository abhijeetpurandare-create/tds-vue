import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider, ThemeProvider, useTheme } from '@delhivery/tarmac';
import { css } from '@emotion/css';
import type { SliderProps } from '@delhivery/tarmac';

const VARIANTS = ['black', 'coal', 'dlv_red'] as const;
const SIZES = ['sm', 'lg'] as const;
const TYPES = ['single', 'dual'] as const;

type ShowcaseState = 'default' | 'hover' | 'focused' | 'disabled';

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider
    initialSource="./tarmac-theme.json"
    activeTheme="tarmac-theme"
    modeOverrides={{ 'DLV_Mapped ': 'Dark' }}
  >
    <div style={{ backgroundColor: '#1a1a1a', padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

const ShowcaseSlider: React.FC<SliderProps & { showcaseState?: ShowcaseState }> = ({
  showcaseState = 'default',
  ...props
}) => {
  const { theme } = useTheme();
  const cfg = theme.components?.slider;
  const vc = cfg?.variants?.[props.variant || 'black'];
  const states = cfg?.states;

  if (showcaseState === 'disabled') {
    return <Slider {...props} isDisabled />;
  }

  if (showcaseState === 'hover') {
    const hoverBg = states?.knobHover?.backgroundColor || '#ededed';
    const overrides = css({
      '& [role="slider"]': {
        backgroundColor: `${hoverBg} !important`,
      },
    });
    return (
      <div className={overrides}>
        <Slider {...props} />
      </div>
    );
  }

  if (showcaseState === 'focused') {
    const focusBg = states?.knobFocused?.backgroundColor || '#f2f2f2';
    const focusShadow = states?.knobFocused?.shadow || '0 0 0 2px rgba(0,0,0,0.4)';
    const overrides = css({
      '& [role="slider"]': {
        backgroundColor: `${focusBg} !important`,
        boxShadow: `${focusShadow} !important`,
      },
    });
    return (
      <div className={overrides}>
        <Slider {...props} />
      </div>
    );
  }

  return <Slider {...props} />;
};

const meta: Meta<SliderProps> = {
  title: 'Tarmac TDS/Slider',
  component: Slider,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    variant: { control: 'select', options: [...VARIANTS] },
    size: { control: 'select', options: [...SIZES] },
    sliderType: { control: 'select', options: [...TYPES] },
    isDisabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<SliderProps>;

// ── Playground ──
const PlaygroundRender: React.FC<SliderProps> = (args) => {
  const isDual = args.sliderType === 'dual';
  const [singleVal, setSingleVal] = useState(50);
  const [dualVal, setDualVal] = useState<[number, number]>([25, 75]);

  const val = isDual ? dualVal : singleVal;
  const handleChange = (v: number | [number, number]) => {
    if (Array.isArray(v)) setDualVal(v);
    else setSingleVal(v);
  };

  return (
    <div style={{ width: 320, padding: 24 }}>
      <Slider {...args} value={val} onChange={handleChange} />
      <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
        Value: {Array.isArray(val) ? `[${val[0]}, ${val[1]}]` : val}
      </div>
    </div>
  );
};

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  args: { variant: 'black', size: 'sm', sliderType: 'single' },
  render: (args) => <PlaygroundRender {...args} />,
};

// ── Variant Section helper ──
const STATES: ShowcaseState[] = ['default', 'hover', 'focused', 'disabled'];

const VariantSection: React.FC<{ variant: string }> = ({ variant }) => (
  <div style={{ marginBottom: 32 }}>
    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, textTransform: 'capitalize' }}>
      {variant.replace('_', ' ')}
    </h3>
    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(4, 1fr)', gap: '12px 8px', alignItems: 'center' }}>
      <div />
      {STATES.map((s) => (
        <div key={s} style={{ fontSize: 11, fontWeight: 500, color: '#888', textTransform: 'capitalize' }}>{s}</div>
      ))}
      {TYPES.flatMap((type) =>
        SIZES.map((size) => (
          <React.Fragment key={`${type}-${size}`}>
            <div style={{ fontSize: 12, color: '#555' }}>{type}/{size}</div>
            {STATES.map((state) => (
              <div key={state} style={{ width: 200 }}>
                <ShowcaseSlider
                  variant={variant}
                  size={size}
                  sliderType={type}
                  showcaseState={state}
                  value={type === 'dual' ? [30, 70] : 50}
                />
              </div>
            ))}
          </React.Fragment>
        )),
      )}
    </div>
  </div>
);

// ── Full Matrix ──
export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => (
    <div style={{ padding: 24 }}>
      {VARIANTS.map((v) => (
        <VariantSection key={v} variant={v} />
      ))}
    </div>
  ),
};

// ── Per-variant stories ──
const vs = (variant: string): Story => ({
  render: () => (
    <div style={{ padding: 24 }}>
      <VariantSection variant={variant} />
    </div>
  ),
});

export const Black: Story = { name: 'Black', ...vs('black') };
export const Coal: Story = { name: 'Coal', ...vs('coal') };
export const DlvRed: Story = { name: 'DLV Red', ...vs('dlv_red') };

// ── Per-type stories ──
export const SingleSlider: Story = {
  name: 'Single Slider',
  render: () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Single Slider — All Variants & Sizes</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {VARIANTS.map((v) =>
          SIZES.map((s) => (
            <div key={`${v}-${s}`}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{v}/{s}</div>
              <ShowcaseSlider variant={v} size={s} sliderType="single" value={60} />
            </div>
          )),
        )}
      </div>
    </div>
  ),
};

export const DualSlider: Story = {
  name: 'Dual Slider',
  render: () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Dual Slider — All Variants & Sizes</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {VARIANTS.map((v) =>
          SIZES.map((s) => (
            <div key={`${v}-${s}`}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{v}/{s}</div>
              <ShowcaseSlider variant={v} size={s} sliderType="dual" value={[25, 75]} />
            </div>
          )),
        )}
      </div>
    </div>
  ),
};

// ── Disabled state ──
export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Disabled State</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {VARIANTS.map((v) => (
          <React.Fragment key={v}>
            <div>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{v} / single</div>
              <Slider variant={v} size="lg" sliderType="single" value={50} isDisabled />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{v} / dual</div>
              <Slider variant={v} size="lg" sliderType="dual" value={[30, 70]} isDisabled />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  ),
};

// ── Light vs Dark Mode ──
export const LightVsDarkMode: Story = {
  name: 'Light vs Dark Mode',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 24 }}>
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Light Mode</h3>
        <Wrap>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {VARIANTS.map((v) => (
              <div key={v} style={{ width: 240 }}>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{v}</div>
                <Slider variant={v} size="lg" value={60} />
              </div>
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Dark Mode</h3>
        <DarkWrap>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {VARIANTS.map((v) => (
              <div key={v} style={{ width: 240 }}>
                <div style={{ fontSize: 12, color: '#ccc', marginBottom: 4 }}>{v}</div>
                <Slider variant={v} size="lg" value={60} />
              </div>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
