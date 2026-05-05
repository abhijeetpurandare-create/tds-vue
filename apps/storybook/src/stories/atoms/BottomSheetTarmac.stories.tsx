import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomSheet, ThemeProvider, Button, Checkbox, DialogBoxIllustration, Snackbar } from '@delhivery/tarmac';
import type { BottomSheetProps } from '@delhivery/tarmac';

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    <div style={{ minHeight: 500, position: 'relative', background: '#f5f5f5' }}>
      {children}
    </div>
  </ThemeProvider>
);

/* ── Helper icons matching Figma ── */
const AddCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#2b2b2b"/>
  </svg>
);

const InfoIconSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
  </svg>
);

/** Tarmac Snackbar matching Figma: Warning / Subtle / Small / Leading Icon / No Trailing / No CTAs */
const WarningSnackbar = () => (
  <Snackbar
    message="More info about this info alert goes here."
    variant="warning"
    snackbarStyle="subtle"
    size="sm"
    leadingIcon={<InfoIconSmall />}
    trailingIcon={false}
    duration={0}
  />
);

const CheckboxRow = () => (
  <>
    <Checkbox tarmacVariant="standard" tarmacSize="sm" />
    <span style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 12, color: '#454545' }}>
      Don't show this message again
    </span>
  </>
);

const SlotPlaceholder: React.FC<{ label?: string }> = ({ label = 'Slot: Replace with local component' }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '100%', height: '100%', minHeight: 120,
    fontFamily: 'Noto Sans, sans-serif', fontSize: 10, color: '#454545',
  }}>
    {label}
  </div>
);

const SlotHeaderPlaceholder: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <div style={{ width: size, height: size, borderRadius: 4, backgroundColor: '#e6e6e6', flexShrink: 0 }} />
);

/* ── Mobile frame wrapper to show the sheet in context ── */
const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    position: 'relative', width: 360, margin: '0 auto',
    border: '1px solid #e6e6e6', borderRadius: 16,
    overflow: 'hidden', minHeight: 640, background: '#fafafa',
  }}>
    {children}
  </div>
);

const meta: Meta<BottomSheetProps> = {
  title: 'Tarmac TDS/BottomSheet',
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<BottomSheetProps>;

/* ── Playground ── */
export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  args: {
    isOpen: true,
    title: 'Title here',
    subtext: '',
    sheetType: 'standard',
    ctaStyle: 'horizontal',
    cancellable: true,
    showHeader: true,
    bodyTitle: 'The quick fox jumped over the lazy fox',
    bodyDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  },
  argTypes: {
    sheetType: { control: 'select', options: ['standard', 'slotMini', 'slotDual', 'slot'] },
    ctaStyle: { control: 'select', options: ['horizontal', 'vertical'] },
    cancellable: { control: 'boolean' },
    showHeader: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    subtext: { control: 'text' },
    bodyTitle: { control: 'text' },
    bodyDescription: { control: 'text' },
  },
  render: (args) => (
    <MobileFrame>
      <BottomSheet
        {...args}
        headerIcon={<AddCircleIcon />}
        illustrationType="success"
        snackbar={<WarningSnackbar />}
        checkboxContent={<CheckboxRow />}
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  ),
};

/* ── Standard + CTA Horizontal ── */
export const StandardHorizontal: Story = {
  name: 'Standard / CTA Horizontal',
  render: () => (
    <MobileFrame>
      <BottomSheet
        isOpen sheetType="standard" ctaStyle="horizontal"
        title="Title here" headerIcon={<AddCircleIcon />}
        snackbar={<WarningSnackbar />}
        illustrationType="success"
        bodyTitle="The quick fox jumped over the lazy fox"
        bodyDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        checkboxContent={<CheckboxRow />}
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  ),
};

/* ── Standard + CTA Vertical ── */
export const StandardVertical: Story = {
  name: 'Standard / CTA Vertical',
  render: () => (
    <MobileFrame>
      <BottomSheet
        isOpen sheetType="standard" ctaStyle="vertical"
        title="Title here" headerIcon={<AddCircleIcon />}
        snackbar={<WarningSnackbar />}
        illustrationType="success"
        bodyTitle="The quick fox jumped over the lazy fox"
        bodyDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        checkboxContent={<CheckboxRow />}
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  ),
};

/* ── Slot Dual + CTA Horizontal ── */
export const SlotDualHorizontal: Story = {
  name: 'Slot Dual / CTA Horizontal',
  render: () => (
    <MobileFrame>
      <BottomSheet
        isOpen sheetType="slotDual" ctaStyle="horizontal"
        title="Title here" slotHeader={<SlotHeaderPlaceholder size={40} />}
        snackbar={<WarningSnackbar />}
        slotContent={<SlotPlaceholder />}
        bodyTitle="The quick fox jumped over the lazy fox"
        bodyDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        checkboxContent={<CheckboxRow />}
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  ),
};

/* ── Slot Dual + CTA Vertical ── */
export const SlotDualVertical: Story = {
  name: 'Slot Dual / CTA Vertical',
  render: () => (
    <MobileFrame>
      <BottomSheet
        isOpen sheetType="slotDual" ctaStyle="vertical"
        title="Title here" slotHeader={<SlotHeaderPlaceholder size={40} />}
        snackbar={<WarningSnackbar />}
        slotContent={<SlotPlaceholder />}
        bodyTitle="The quick fox jumped over the lazy fox"
        bodyDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        checkboxContent={<CheckboxRow />}
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  ),
};

/* ── Slot (full body) + CTA Horizontal ── */
export const SlotHorizontal: Story = {
  name: 'Slot / CTA Horizontal',
  render: () => (
    <MobileFrame>
      <BottomSheet
        isOpen sheetType="slot" ctaStyle="horizontal"
        title="Title here" slotHeader={<SlotHeaderPlaceholder size={24} />}
        snackbar={<WarningSnackbar />}
        slotContent={<SlotPlaceholder />}
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  ),
};

/* ── Slot + CTA Vertical ── */
export const SlotVertical: Story = {
  name: 'Slot / CTA Vertical',
  render: () => (
    <MobileFrame>
      <BottomSheet
        isOpen sheetType="slot" ctaStyle="vertical"
        title="Title here" slotHeader={<SlotHeaderPlaceholder size={24} />}
        snackbar={<WarningSnackbar />}
        slotContent={<SlotPlaceholder />}
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  ),
};

/* ── Slot Mini + CTA Horizontal ── */
export const SlotMiniHorizontal: Story = {
  name: 'Slot Mini / CTA Horizontal',
  render: () => (
    <MobileFrame>
      <BottomSheet
        isOpen sheetType="slotMini" ctaStyle="horizontal"
        title="Title here" headerIcon={<AddCircleIcon />}
        snackbar={<WarningSnackbar />}
        slotContent={<SlotPlaceholder />}
        bodyTitle="The quick fox jumped over the lazy fox"
        bodyDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        checkboxContent={<CheckboxRow />}
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  ),
};

/* ── Slot Mini + CTA Vertical ── */
export const SlotMiniVertical: Story = {
  name: 'Slot Mini / CTA Vertical',
  render: () => (
    <MobileFrame>
      <BottomSheet
        isOpen sheetType="slotMini" ctaStyle="vertical"
        title="Title here" headerIcon={<AddCircleIcon />}
        snackbar={<WarningSnackbar />}
        slotContent={<SlotPlaceholder />}
        bodyTitle="The quick fox jumped over the lazy fox"
        bodyDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        checkboxContent={<CheckboxRow />}
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  ),
};

/* ── All Illustration Types ── */
const IllustrationTypesRender = () => {
  const types = ['success', 'download', 'error', 'warning', 'caution'] as const;
  const [active, setActive] = React.useState<typeof types[number]>('success');
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {types.map((t) => (
          <button key={t} onClick={() => setActive(t)}
            style={{
              padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer',
              fontFamily: 'Noto Sans, sans-serif', fontSize: 12, textTransform: 'capitalize',
              background: active === t ? '#000' : '#fff',
              color: active === t ? '#fff' : '#2b2b2b',
            }}>
            {t}
          </button>
        ))}
      </div>
      <MobileFrame>
        <BottomSheet
          isOpen title={`${active} dialog`} headerIcon={<AddCircleIcon />}
          illustrationType={active}
          bodyTitle="The quick fox jumped over the lazy fox"
          bodyDescription="Lorem ipsum dolor sit amet."
          ctaStyle="horizontal"
          footer={
            <>
              <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
              <Button buttonStyle="primary" variant="black" size="md" text="Action" />
            </>
          }
        />
      </MobileFrame>
    </div>
  );
};

export const IllustrationTypes: Story = {
  name: 'Illustration Types',
  render: () => <IllustrationTypesRender />,
};

/* ── Compound Children Pattern ── */
export const CompoundPattern: Story = {
  name: 'Compound Children Pattern',
  render: () => (
    <MobileFrame>
      <BottomSheet isOpen title="Compound Example" headerIcon={<AddCircleIcon />}>
        <BottomSheet.Body>
          <div style={{ padding: 16, textAlign: 'center' }}>
            <DialogBoxIllustration type="success" />
            <p style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 14, color: '#2b2b2b', marginTop: 12 }}>
              Custom body content via compound children
            </p>
          </div>
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
          <Button buttonStyle="primary" variant="black" size="md" text="Confirm" />
        </BottomSheet.Footer>
      </BottomSheet>
    </MobileFrame>
  ),
};

/* ── With Subtext ── */
export const WithSubtext: Story = {
  name: 'With Subtext',
  render: () => (
    <MobileFrame>
      <BottomSheet
        isOpen title="Title here" subtext="Supporting subtext"
        headerIcon={<AddCircleIcon />}
        illustrationType="success"
        bodyTitle="The quick fox jumped over the lazy fox"
        bodyDescription="Lorem ipsum dolor sit amet."
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  ),
};

/* ── No Header ── */
export const NoHeader: Story = {
  name: 'No Header',
  render: () => (
    <MobileFrame>
      <BottomSheet
        isOpen showHeader={false}
        illustrationType="download"
        bodyTitle="Content without header"
        bodyDescription="This bottom sheet has no header section."
        footer={<Button buttonStyle="primary" variant="black" size="md" text="Got it" />}
      />
    </MobileFrame>
  ),
};

/* ── Boolean Toggles ── */
const BooleanTogglesRender = () => {
  const [active, setActive] = React.useState<string>('noSnackbar');
  const tabs = [
    { key: 'noSnackbar', label: 'No Snackbar' },
    { key: 'noCheckbox', label: 'No Checkbox' },
    { key: 'noFooter', label: 'No Footer' },
    { key: 'noHeader', label: 'No Header' },
  ];
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActive(t.key)}
            style={{
              padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer',
              fontFamily: 'Noto Sans, sans-serif', fontSize: 12,
              background: active === t.key ? '#000' : '#fff',
              color: active === t.key ? '#fff' : '#2b2b2b',
            }}>
            {t.label}
          </button>
        ))}
      </div>
      <MobileFrame>
        {active === 'noSnackbar' && (
          <BottomSheet isOpen title="Title here" headerIcon={<AddCircleIcon />}
            illustrationType="success" bodyTitle="Body title" bodyDescription="Body description"
            checkboxContent={<CheckboxRow />}
            footer={<Button buttonStyle="primary" variant="black" size="md" text="Action" />}
          />
        )}
        {active === 'noCheckbox' && (
          <BottomSheet isOpen title="Title here" headerIcon={<AddCircleIcon />}
            snackbar={<WarningSnackbar />} illustrationType="success"
            bodyTitle="Body title" bodyDescription="Body description"
            footer={<Button buttonStyle="primary" variant="black" size="md" text="Action" />}
          />
        )}
        {active === 'noFooter' && (
          <BottomSheet isOpen title="Title here" headerIcon={<AddCircleIcon />}
            snackbar={<WarningSnackbar />} illustrationType="success"
            bodyTitle="Body title" bodyDescription="Body description"
            checkboxContent={<CheckboxRow />}
          />
        )}
        {active === 'noHeader' && (
          <BottomSheet isOpen showHeader={false}
            illustrationType="download" bodyTitle="Content without header"
            bodyDescription="This bottom sheet has no header section."
            footer={<Button buttonStyle="primary" variant="black" size="md" text="Got it" />}
          />
        )}
      </MobileFrame>
    </div>
  );
};

export const BooleanToggles: Story = {
  name: 'Boolean Toggles',
  render: () => <BooleanTogglesRender />,
};

/* ── Light vs Dark Mode ── */
const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme"
    modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: '#1a1a1a', padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

const LightVsDarkRender = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const sheet = (
    <MobileFrame>
      <BottomSheet isOpen title="Title here" headerIcon={<AddCircleIcon />}
        snackbar={<WarningSnackbar />} illustrationType="success"
        bodyTitle="The quick fox jumped over the lazy fox"
        bodyDescription="Lorem ipsum dolor sit amet." ctaStyle="horizontal"
        footer={
          <>
            <Button buttonStyle="tertiary" variant="black" size="md" text="Cancel" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action" />
          </>
        }
      />
    </MobileFrame>
  );
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['light', 'dark'] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            style={{
              padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer',
              fontFamily: 'Noto Sans, sans-serif', fontSize: 12, textTransform: 'capitalize',
              background: mode === m ? '#000' : '#fff',
              color: mode === m ? '#fff' : '#2b2b2b',
            }}>
            {m}
          </button>
        ))}
      </div>
      {mode === 'light' ? sheet : <DarkWrap>{sheet}</DarkWrap>}
    </div>
  );
};

export const LightVsDark: Story = {
  name: 'Light vs Dark Mode',
  render: () => <LightVsDarkRender />,
};
