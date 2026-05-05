import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DialogBox, ThemeProvider, Button, Snackbar } from "@delhivery/tarmac";
import type { DialogBoxProps } from "@delhivery/tarmac";

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);
const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme" modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div>{children}</div>
  </ThemeProvider>
);

const TYPES = ["standard", "slots", "slotsx2"] as const;
const SIZES = ["mobile", "web"] as const;
const FOOTER_STYLES = ["type1", "type2"] as const;

const AddCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/></svg>
);
const SuccessIllustration = () => (
  <svg width="39" height="45" viewBox="0 0 39 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.7926 1.53294L1.3435 8.12091C0.641822 8.30998 0.229673 9.06072 0.422941 9.79773L9.28916 43.6082C9.48242 44.3452 10.2079 44.7894 10.9096 44.6003L35.3587 38.0124C36.0604 37.8233 36.4725 37.0726 36.2793 36.3356L27.413 2.52507C27.2198 1.78806 26.4943 1.34387 25.7926 1.53294Z" fill="#DCDCDC" fillOpacity="0.5"/>
    <path d="M36.9649 14.0274C36.9806 14.0318 36.9901 14.0482 36.986 14.064L29.431 43.3546C29.2057 44.2279 28.3188 44.7397 27.45 44.4979L3.63288 37.8683C2.76406 37.6265 2.24234 36.7225 2.46758 35.8493L11.3065 1.58119C11.5318 0.707923 12.4187 0.196048 13.2875 0.437886L32.2347 5.71188C32.2365 5.71239 32.2376 5.71429 32.2371 5.71612L32.2996 5.82858L36.9468 14.0133C36.9507 14.0202 36.9573 14.0253 36.9649 14.0274Z" fill="white" stroke="#E6E6E6" strokeWidth="0.408236" strokeMiterlimit="10"/>
    <path d="M36.5385 14.2039C36.6866 14.4771 36.4959 14.8064 36.1895 14.8064L32.5514 14.8064C30.8743 14.8064 29.671 13.1361 30.1959 11.5368L31.837 6.53618C31.9125 6.30597 32.2206 6.27224 32.3502 6.48L36.5385 14.2039Z" fill="#3D445C" fillOpacity="0.12"/>
    <path d="M36.7009 13.6412C36.8822 13.9592 36.597 14.3339 36.2476 14.2366L32.6435 13.2334C31.3402 12.8706 30.5577 11.5147 30.8955 10.2048L32.06 5.69026C32.0724 5.64189 32.137 5.63408 32.1619 5.67793L36.7009 13.6412Z" fill="#D9D8D8" stroke="#E6E6E6" strokeWidth="0.408236" strokeMiterlimit="10"/>
    <path d="M29.5638 18.4094L14.4117 14.0869C14.0541 13.9849 13.6872 14.1936 13.5922 14.5531C13.4972 14.9126 13.71 15.2867 14.0676 15.3887L29.2196 19.7112C29.5772 19.8132 29.9441 19.6045 30.0391 19.245C30.1341 18.8855 29.9213 18.5114 29.5638 18.4094Z" fill="#D4D4D4"/>
    <path d="M21.8525 12.5347L15.3155 10.6698C14.9579 10.5678 14.5911 10.7765 14.496 11.136C14.401 11.4954 14.6138 11.8695 14.9714 11.9715L21.5084 13.8364C21.866 13.9384 22.2329 13.7297 22.3279 13.3702C22.4229 13.0108 22.2101 12.6367 21.8525 12.5347Z" fill="#D4D4D4"/>
    <path d="M25.9437 20.8765L13.5518 17.3414C13.1943 17.2394 12.8274 17.4481 12.7324 17.8076C12.6373 18.1671 12.8502 18.5412 13.2077 18.6432L25.5996 22.1783C25.9571 22.2803 26.324 22.0716 26.4191 21.7121C26.5141 21.3526 26.3013 20.9785 25.9437 20.8765Z" fill="#D4D4D4"/>
    <path d="M20.0731 27.7789L11.4566 25.3208C11.0991 25.2188 10.7322 25.4275 10.6371 25.787C10.5421 26.1464 10.7549 26.5205 11.1125 26.6225L19.729 29.0806C20.0866 29.1826 20.4534 28.9739 20.5485 28.6145C20.6435 28.255 20.4307 27.8809 20.0731 27.7789Z" fill="#D4D4D4"/>
    <path d="M15.785 22.8808L12.3602 21.9038C12.0026 21.8018 11.6357 22.0105 11.5407 22.37C11.4457 22.7295 11.6585 23.1036 12.0161 23.2056L15.4409 24.1826C15.7985 24.2846 16.1654 24.0759 16.2604 23.7164C16.3554 23.3569 16.1426 22.9828 15.785 22.8808Z" fill="#D4D4D4"/>
    <path d="M17.5499 30.5589L10.5967 28.5753C10.2392 28.4733 9.87231 28.682 9.77728 29.0415C9.68226 29.401 9.89507 29.7751 10.2526 29.8771L17.2058 31.8606C17.5633 31.9626 17.9302 31.7539 18.0252 31.3945C18.1203 31.035 17.9075 30.6609 17.5499 30.5589Z" fill="#D4D4D4"/>
    <path d="M23 34C23 29.5817 26.5817 26 31 26C35.4183 26 39 29.5817 39 34C39 38.4183 35.4183 42 31 42C26.5817 42 23 38.4183 23 34Z" fill="#1BA86E"/>
    <path d="M31 42V40.875C27.203 40.875 24.125 37.797 24.125 34H21.875C21.875 39.0396 25.9604 43.125 31 43.125V42ZM39 34H37.875C37.875 37.797 34.797 40.875 31 40.875V43.125C36.0396 43.125 40.125 39.0396 40.125 34H39ZM31 26V27.125C34.797 27.125 37.875 30.203 37.875 34H40.125C40.125 28.9604 36.0396 24.875 31 24.875V26ZM31 24.875C25.9604 24.875 21.875 28.9604 21.875 34H24.125C24.125 30.203 27.203 27.125 31 27.125V24.875Z" fill="white"/>
    <path d="M29.6667 35.625L27.9167 33.875L27.3334 34.4584L29.6667 36.7917L34.6667 31.7917L34.0834 31.2084L29.6667 35.625Z" fill="#F2F2F2"/>
  </svg>
);
const SlotPlaceholder = ({ label = "Replace content here" }: { label?: string }) => (
  <div style={{ width: "100%", background: "rgba(35,150,251,0.05)", borderRadius: 4, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 64, color: "#454545", fontSize: 10, fontWeight: 500 }}>{label}</div>
);

const InfoIcon16 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.33 4.67h1.34V6H7.33V4.67Zm0 2.66h1.34v4H7.33v-4ZM8 1.33A6.67 6.67 0 1 0 8 14.67 6.67 6.67 0 0 0 8 1.33Zm0 12A5.34 5.34 0 1 1 8 2.67a5.34 5.34 0 0 1 0 10.66Z" fill="currentColor"/></svg>
);
const warningSnackbar = <Snackbar variant="warning" snackbarStyle="filled" size="sm" message="More info about this info alert goes here." duration={0} trailingIcon={false} leadingIcon={<InfoIcon16 />} />;
const shared: Partial<DialogBoxProps> = {
  isOpen: true, renderInline: true, title: "Title here",
  heading: "The quick fox jumped over the lazy fox",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

const storyWrap = { padding: 24, minHeight: 500, backgroundColor: "#f5f5f5", borderRadius: 8 };

const meta: Meta<DialogBoxProps> = {
  title: "Tarmac TDS/Dialog Box",
  component: DialogBox,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<DialogBoxProps>;

/* ═══ 1. PLAYGROUND ═══ */
export const Playground: Story = {
  name: "Playground",
  argTypes: {
    type: { control: "select", options: [...TYPES] },
    size: { control: "select", options: [...SIZES] },
    footerStyle: { control: "select", options: [...FOOTER_STYLES] },
    showHeader: { control: "boolean" },
    showSnackbar: { control: "boolean" },
    showFooter: { control: "boolean" },
    showCheckbox: { control: "boolean" },
    showSubtext: { control: "boolean" },
    title: { control: "text" },
    subtext: { control: "text" },
    heading: { control: "text" },
    description: { control: "text" },
  },
  args: { ...shared, type: "standard", size: "web", footerStyle: "type1",
    showHeader: true, showSnackbar: true, showFooter: true, showCheckbox: true, showSubtext: false, subtext: "Title here" },
  render: (args) => (
    <div style={{ ...storyWrap }}>
      <DialogBox {...args} headerLeadingIcon={<AddCircleIcon />} snackbar={warningSnackbar}
        illustration={<SuccessIllustration />}
        slotHeader={<div style={{ width: 40, height: 40, background: "#fff", borderRadius: 4 }} />}
        slotMiddle={<SlotPlaceholder />} />
    </div>
  ),
};

/* ═══ 2. FULL MATRIX ═══ */
export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ ...storyWrap, display: "flex", flexWrap: "wrap", gap: 32 }}>
      {TYPES.map(t => SIZES.map(s => FOOTER_STYLES.map(fs => (
        <div key={`${t}-${s}-${fs}`} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{t} / {s} / {fs}</div>
          <DialogBox {...shared} type={t} size={s} footerStyle={fs}
            snackbar={warningSnackbar} headerLeadingIcon={<AddCircleIcon />}
            illustration={<SuccessIllustration />}
            slotHeader={<div style={{ width: 40, height: 40, background: "#fff", borderRadius: 4 }} />}
            slotMiddle={<SlotPlaceholder />} />
        </div>
      ))))}
    </div>
  ),
};

/* ═══ 3. PER-TYPE STORIES ═══ */
export const Standard: Story = {
  name: "Standard",
  render: () => (
    <div style={{ ...storyWrap, display: "flex", gap: 24, flexWrap: "wrap" }}>
      {SIZES.map(s => (
        <div key={s}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{s}</div>
          <DialogBox {...shared} type="standard" size={s} snackbar={warningSnackbar}
            headerLeadingIcon={<AddCircleIcon />} illustration={<SuccessIllustration />} />
        </div>
      ))}
    </div>
  ),
};

export const Slots: Story = {
  name: "Slots",
  render: () => (
    <div style={{ ...storyWrap, display: "flex", gap: 24, flexWrap: "wrap" }}>
      {SIZES.map(s => (
        <div key={s}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{s}</div>
          <DialogBox {...shared} type="slots" size={s} snackbar={warningSnackbar}
            headerLeadingIcon={<AddCircleIcon />} illustration={<SuccessIllustration />}
            slotMiddle={<SlotPlaceholder />} />
        </div>
      ))}
    </div>
  ),
};

export const SlotsX2: Story = {
  name: "Slots x2",
  render: () => (
    <div style={{ ...storyWrap, display: "flex", gap: 24, flexWrap: "wrap" }}>
      {SIZES.map(s => (
        <div key={s}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{s}</div>
          <DialogBox {...shared} type="slotsx2" size={s} snackbar={warningSnackbar}
            headerLeadingIcon={<AddCircleIcon />} illustration={<SuccessIllustration />}
            slotHeader={<div style={{ width: 40, height: 40, background: "#fff", borderRadius: 4 }} />}
            slotMiddle={<SlotPlaceholder />} />
        </div>
      ))}
    </div>
  ),
};

/* ═══ 4. PER-STYLE STORIES ═══ */
export const Type1InlineFooter: Story = {
  name: "Type 1 (Inline Footer)",
  render: () => (
    <div style={{ ...storyWrap, display: "flex", gap: 24, flexWrap: "wrap" }}>
      {TYPES.map(t => (
        <div key={t}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{t}</div>
          <DialogBox {...shared} type={t} size="web" footerStyle="type1" snackbar={warningSnackbar}
            headerLeadingIcon={<AddCircleIcon />} illustration={<SuccessIllustration />}
            slotHeader={<div style={{ width: 40, height: 40, background: "#fff", borderRadius: 4 }} />}
            slotMiddle={<SlotPlaceholder />} />
        </div>
      ))}
    </div>
  ),
};

export const Type2StackedFooter: Story = {
  name: "Type 2 (Stacked Footer)",
  render: () => (
    <div style={{ ...storyWrap, display: "flex", gap: 24, flexWrap: "wrap" }}>
      {TYPES.map(t => (
        <div key={t}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{t}</div>
          <DialogBox {...shared} type={t} size="web" footerStyle="type2" snackbar={warningSnackbar}
            headerLeadingIcon={<AddCircleIcon />} illustration={<SuccessIllustration />}
            slotHeader={<div style={{ width: 40, height: 40, background: "#fff", borderRadius: 4 }} />}
            slotMiddle={<SlotPlaceholder />} />
        </div>
      ))}
    </div>
  ),
};

/* ═══ 5. FIGMA BOOLEAN PROPERTIES ═══ */
export const BooleanProperties: Story = {
  name: "Boolean Properties",
  render: () => {
    const base: Partial<DialogBoxProps> = { ...shared, size: "web",
      headerLeadingIcon: <AddCircleIcon />, illustration: <SuccessIllustration />, snackbar: warningSnackbar };
    const booleans = [
      { label: "Snackbar: false", props: { showSnackbar: false } },
      { label: "Title container: false", props: { showHeader: false } },
      { label: "CTAs Container: false", props: { showFooter: false } },
      { label: "Checkbox Text: false", props: { showCheckbox: false } },
      { label: "Subtext: true", props: { showSubtext: true, subtext: "Title here" } },
    ];
    return (
      <div style={{ ...storyWrap, display: "flex", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>All defaults (on)</div>
          <DialogBox {...base} />
        </div>
        {booleans.map(({ label, props }) => (
          <div key={label}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{label}</div>
            <DialogBox {...base} {...props} />
          </div>
        ))}
      </div>
    );
  },
};

/* ═══ 6. INTERACTIVE DEMO ═══ */
export const InteractiveDemo: Story = {
  name: "Interactive Demo",
  render: () => {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button buttonStyle="primary" variant="black" size="md" text="Open Dialog" onClick={() => setOpen(true)} />
        <DialogBox isOpen={open} onClose={() => setOpen(false)} size="web"
          title="Confirm Action" heading="Are you sure?" description="This action cannot be undone."
          snackbar={warningSnackbar} headerLeadingIcon={<AddCircleIcon />}
          illustration={<SuccessIllustration />}
          checkboxChecked={checked} onCheckboxChange={setChecked}
          onSecondaryClick={() => setOpen(false)} onPrimaryClick={() => setOpen(false)} />
      </div>
    );
  },
};

/* ═══ 7. LIGHT Vs DARK MODE ═══ */
export const LightVsDarkMode: Story = {
  name: "Light Vs Dark Mode",
  render: () => (
    <div style={{ ...storyWrap, display: "flex", gap: "36px", flexDirection:"row", alignItems:"start" }}>
      <DialogBox {...shared} size="web" headerLeadingIcon={<AddCircleIcon />}
        illustration={<SuccessIllustration />} snackbar={warningSnackbar} />
      <DarkWrap>
        <DialogBox {...shared} size="web" headerLeadingIcon={<AddCircleIcon />}
          illustration={<SuccessIllustration />} snackbar={warningSnackbar} />
      </DarkWrap>
    </div>
  ),
};
