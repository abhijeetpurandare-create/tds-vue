import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PopupHeaderFooter, ThemeProvider, Button, Badge, Link } from "@delhivery/tarmac";
import type { PopupHeaderFooterProps } from "@delhivery/tarmac";
import { css } from "@emotion/css";

const noUnderline = css({ textDecoration: "none !important" });
const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);
const ShowcaseWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: "#F2F2F2", borderRadius: 8, padding: 24 }}>{children}</div>
);
const AddCircleIcon24: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#2B2B2B"/></svg>
);
const AddCircleIcon20: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10.8333 5.83329H9.16663V9.16663H5.83329V10.8333H9.16663V14.1666H10.8333V10.8333H14.1666V9.16663H10.8333V5.83329ZM9.99996 1.66663C5.39996 1.66663 1.66663 5.39996 1.66663 10C1.66663 14.6 5.39996 18.3333 9.99996 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.39996 14.6 1.66663 9.99996 1.66663ZM9.99996 16.6666C6.32496 16.6666 3.33329 13.675 3.33329 10C3.33329 6.32496 6.32496 3.33329 9.99996 3.33329C13.675 3.33329 16.6666 6.32496 16.6666 10C16.6666 13.675 13.675 16.6666 9.99996 16.6666Z" fill="#2B2B2B"/></svg>
);

const meta: Meta<PopupHeaderFooterProps> = {
  title: "Tarmac TDS/PopupHeaderFooter",
  component: PopupHeaderFooter,
  parameters: { layout: "fullscreen", docs: { story: { inline: true, iframeHeight: 400 }, toc: true,
    description: { component: "The header and footer sub-component used inside [Popup](?path=/docs/tarmac-tds-popup--docs). Supports header variant (title, subtext, icons, badges, close) and footer variant (CTA buttons, link)." } } },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["header", "footer"], description: "Header or footer mode" },
    size: { control: "select", options: ["lg", "md", "sm"], description: "Size variant" },
    title: { control: "text", description: "Heading text (header)" },
    subtext: { control: "text", description: "Subtext below heading (header)" },
    showSubtext: { control: "boolean", description: "Show/hide subtext" },
    showSlot: { control: "boolean", description: "Show/hide slot area" },
    className: { control: "text", description: "Additional CSS class" },
  },
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<PopupHeaderFooterProps>;

/* ═══ 1. HEADER PLAYGROUND ═══ */
export const HeaderPlayground: Story = {
  name: "Header Playground",
  args: { variant: "header", size: "lg", title: "Heading goes here", subtext: "Subtext goes here", showSubtext: true, showSlot: false },
  render: (args) => (
    <div style={{ padding: 24 }}><ShowcaseWrap>
      <PopupHeaderFooter {...args}
        slot={<div style={{ width: 40, height: 40, background: "#eee", borderRadius: 4 }} />}
        leadingIcon={args.size === "sm" ? <AddCircleIcon20 /> : <AddCircleIcon24 />}
        badges={<><Badge badgeType="subtle" variant="success" size="md">Badge</Badge><Badge badgeType="subtle" variant="success" size="md">Badge</Badge></>}
        onClose={() => {}} />
    </ShowcaseWrap></div>
  ),
};

/* ═══ 2. HEADER VARIANTS ═══ */
export const HeaderVariants: Story = {
  name: "Header Variants",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 620 }}>
      {([
        { sz: "lg" as const, icon: <AddCircleIcon24 />, slotW: 40, label: "Large — all features" },
        { sz: "md" as const, icon: <AddCircleIcon24 />, slotW: 32, label: "Medium — all features" },
        { sz: "sm" as const, icon: <AddCircleIcon20 />, slotW: 24, label: "Small — all features" },
      ]).map(({ sz, icon, slotW, label }) => (
        <div key={sz}>
          <h4 style={{ margin: "0 0 8px", color: "#666" }}>{label}</h4>
          <ShowcaseWrap>
            <PopupHeaderFooter variant="header" size={sz} title="Heading goes here" subtext="Subtext goes here"
              showSlot slot={<div style={{ width: slotW, height: slotW, background: "#eee", borderRadius: 4 }} />}
              leadingIcon={icon}
              badges={<><Badge badgeType="subtle" variant="success" size="md">Badge</Badge><Badge badgeType="subtle" variant="success" size="md">Badge</Badge></>}
              onClose={() => {}} />
          </ShowcaseWrap>
        </div>
      ))}
      <div>
        <h4 style={{ margin: "0 0 8px", color: "#666" }}>Medium — minimal</h4>
        <ShowcaseWrap><PopupHeaderFooter variant="header" size="md" title="Heading goes here" onClose={() => {}} /></ShowcaseWrap>
      </div>
    </div>
  ),
};

/* ═══ 3. FOOTER PLAYGROUND ═══ */
export const FooterPlayground: Story = {
  name: "Footer Playground",
  args: { variant: "footer", size: "lg" },
  argTypes: { title: { table: { disable: true } }, subtext: { table: { disable: true } }, showSubtext: { table: { disable: true } }, showSlot: { table: { disable: true } } },
  render: (args) => {
    const sz = (args.size || "lg") as "lg" | "md" | "sm";
    return (
      <div style={{ padding: 24 }}><ShowcaseWrap>
        <PopupHeaderFooter variant="footer" size={sz}
          ctaLeft={<Button variant="black" buttonStyle="tertiary" size={sz} text="Action" />}
          link={<Link href="#" linkStyle="blue" size={sz === "lg" ? "sm" : "xs"} className={noUnderline}>Add any link</Link>}
          ctasRight={<>
            <Button variant="black" buttonStyle="tertiary" size={sz} text="Action" />
            <Button variant="black" buttonStyle="secondary" size={sz} text="Action" />
            <Button variant="black" buttonStyle="primary" size={sz} text="Action" />
          </>} />
      </ShowcaseWrap></div>
    );
  },
};

/* ═══ 4. FOOTER VARIANTS ═══ */
export const FooterVariants: Story = {
  name: "Footer Variants",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 620 }}>
      {([
        { sz: "lg" as const, linkSz: "sm" as const, label: "Large" },
        { sz: "md" as const, linkSz: "xs" as const, label: "Medium" },
        { sz: "sm" as const, linkSz: "xs" as const, label: "Small" },
      ]).map(({ sz, linkSz, label }) => (
        <div key={sz}>
          <h4 style={{ margin: "0 0 8px", color: "#666" }}>{label} — CTA Left + Link + 3 CTAs Right</h4>
          <ShowcaseWrap>
            <PopupHeaderFooter variant="footer" size={sz}
              ctaLeft={<Button variant="black" buttonStyle="tertiary" size={sz} text="Action" />}
              link={<Link href="#" linkStyle="blue" size={linkSz} className={noUnderline}>Add any link</Link>}
              ctasRight={<>
                <Button variant="black" buttonStyle="tertiary" size={sz} text="Action" />
                <Button variant="black" buttonStyle="secondary" size={sz} text="Action" />
                <Button variant="black" buttonStyle="primary" size={sz} text="Action" />
              </>} />
          </ShowcaseWrap>
        </div>
      ))}
      <div>
        <h4 style={{ margin: "0 0 8px", color: "#666" }}>Medium — 2 CTAs only</h4>
        <ShowcaseWrap>
          <PopupHeaderFooter variant="footer" size="md" ctasRight={<>
            <Button variant="black" buttonStyle="secondary" size="md" text="Action" />
            <Button variant="black" buttonStyle="primary" size="md" text="Action" />
          </>} />
        </ShowcaseWrap>
      </div>
    </div>
  ),
};
