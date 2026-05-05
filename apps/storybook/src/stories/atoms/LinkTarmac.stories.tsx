import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { LinkProps } from "@delhivery/tarmac";

const STYLES = ["blue", "black", "white"] as const;
const SIZES = ["xl", "lg", "md", "sm", "xs"] as const;
type ShowcaseState = "default" | "hover" | "focused" | "disabled";
const STATES: ShowcaseState[] = ["default", "hover", "focused", "disabled"];

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider
    initialSource="./tarmac-theme.json"
    activeTheme="tarmac-theme"
    modeOverrides={{ "DLV_Mapped ": "Dark" }}
  >
    <div style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 8 }}>
      {children}
    </div>
  </ThemeProvider>
);

const ShowcaseLink: React.FC<LinkProps & { showcaseState: ShowcaseState }> = ({
  showcaseState,
  ...props
}) => {
  const { theme } = useTheme();
  const cfg = theme.components?.link;
  const vc = cfg?.variants?.[props.linkStyle || "blue"] || {};

  if (showcaseState === "default") return <Link {...props} />;
  if (showcaseState === "disabled") return <Link {...props} isDisabled />;

  const overrides: Record<string, string> = {};
  if (showcaseState === "hover") {
    overrides.color = vc.hoverTextColor || vc.textColor || "#1d7dd1";
  } else if (showcaseState === "focused") {
    overrides.color = vc.focusTextColor || vc.textColor || "#1764a7";
  }

  return <Link {...props} className={css(overrides)} />;
};

const meta: Meta<LinkProps> = {
  title: "Tarmac TDS/Link",
  component: Link,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<LinkProps>;

/* ─── Playground ─── */
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    linkStyle: "blue",
    size: "md",
    text: "Something goes here",
    isDisabled: false,
    href: "#",
  },
  argTypes: {
    linkStyle: { control: "select", options: [...STYLES] },
    size: { control: "select", options: [...SIZES] },
    isDisabled: { control: "boolean" },
  },
  render: (args) => <Link {...args} />,
};

/* ─── Full Matrix ─── */
const StyleSection: React.FC<{ linkStyle: string }> = ({ linkStyle }) => {
  const dark = linkStyle === "white";
  const wrapStyle = dark
    ? { backgroundColor: "#1a1a2e", padding: 16, borderRadius: 8 }
    : {};
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ marginBottom: 8, fontWeight: 600, fontSize: 16 }}>
        {linkStyle}
      </h3>
      <div style={wrapStyle}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px repeat(4, 1fr)",
            gap: "8px 16px",
            alignItems: "center",
          }}
        >
          <div />
          {STATES.map((s) => (
            <div key={s} style={{ fontSize: 12, color: "#888", textAlign: "center" }}>
              {s}
            </div>
          ))}
          {SIZES.map((sz) => (
            <React.Fragment key={sz}>
              <div style={{ fontSize: 12, color: "#888" }}>{sz}</div>
              {STATES.map((state) => (
                <div key={state} style={{ textAlign: "center" }}>
                  <ShowcaseLink
                    showcaseState={state}
                    linkStyle={linkStyle}
                    size={sz}
                    text="Something goes here"
                    href="#"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 24 }}>
      {STYLES.map((s) => (
        <StyleSection key={s} linkStyle={s} />
      ))}
    </div>
  ),
};

/* ─── Per-Style Stories ─── */
const styleStory = (linkStyle: string): Story => ({
  render: () => (
    <div style={{ padding: 24 }}>
      <StyleSection linkStyle={linkStyle} />
    </div>
  ),
});

export const Blue: Story = { name: "Blue", ...styleStory("blue") };
export const Black: Story = { name: "Black", ...styleStory("black") };
export const White: Story = { name: "White", ...styleStory("white") };

/* ─── With Icons ─── */
const SampleIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, color: "#888" }}>Leading Icon</h4>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {SIZES.map((sz) => (
            <Link key={sz} linkStyle="blue" size={sz} text="Link text" leadingIcon={<SampleIcon />} href="#" />
          ))}
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, color: "#888" }}>Trailing Icon</h4>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {SIZES.map((sz) => (
            <Link key={sz} linkStyle="blue" size={sz} text="Link text" trailingIcon={<SampleIcon />} href="#" />
          ))}
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, color: "#888" }}>Both Icons</h4>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {SIZES.map((sz) => (
            <Link
              key={sz}
              linkStyle="blue"
              size={sz}
              text="Link text"
              leadingIcon={<SampleIcon />}
              trailingIcon={<SampleIcon />}
              href="#"
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ─── Disabled State ─── */
export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      {STYLES.map((s) => {
        const dark = s === "white";
        const wrapStyle = dark
          ? { backgroundColor: "#1a1a2e", padding: 16, borderRadius: 8 }
          : {};
        return (
          <div key={s}>
            <h4 style={{ marginBottom: 8, fontSize: 14, color: "#888" }}>{s}</h4>
            <div style={wrapStyle}>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                {SIZES.map((sz) => (
                  <Link key={sz} linkStyle={s} size={sz} text="Disabled link" isDisabled href="#" />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ),
};

/* ─── Light vs Dark Mode ─── */
export const LightVsDarkMode: Story = {
  name: "Light vs Dark Mode",
  decorators: [],
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 12, fontSize: 14, color: "#888" }}>Light Mode</h4>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SIZES.map((sz) => (
              <Link key={sz} linkStyle="blue" size={sz} text="Blue link" href="#" />
            ))}
          </div>
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 12, fontSize: 14, color: "#888" }}>Dark Mode</h4>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SIZES.map((sz) => (
              <Link key={sz} linkStyle="blue" size={sz} text="Blue link" href="#" />
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
