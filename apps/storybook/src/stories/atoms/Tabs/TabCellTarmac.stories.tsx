import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TabCell, ThemeProvider, Badge, Pill, StatusIndicatorComponent } from "@delhivery/tarmac";
import type { TabCellProps } from "@delhivery/tarmac";
import { css } from "@emotion/css";

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);
const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme" modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

const TYPES = ["regular", "button"] as const;
const STYLES = ["black", "blue", "dlvRed"] as const;
const SIZES = ["lg", "sm"] as const;
const STATES = ["default", "hover", "pressed", "disabled", "ghost"] as const;
const sw = { padding: 24, backgroundColor: "#f5f5f5", borderRadius: 8 };
const label = (t: string) => <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t}</div>;
const sublabel = (t: string) => <div style={{ fontSize: 10, color: "#888", marginBottom: 4 }}>{t}</div>;
const T = "Title goes here";
const S = "Something goes here";

const Icon = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/></svg>;
const BadgeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/></svg>;

const STYLE_PILL: Record<string, { v: string; t: "solid" | "subtle" }> = { black: { v: "black", t: "subtle" }, blue: { v: "blue", t: "solid" }, dlvRed: { v: "error", t: "solid" } };
const tabPill = (s: string = "black") => { const p = STYLE_PILL[s] || STYLE_PILL.black; return <Pill pillVariant={p.v as any} pillType={p.t} size="sm" text="12" />; };
const statusDot = <StatusIndicatorComponent variant="success" size="xs" />;
const stateProps = (s: string): Partial<TabCellProps> => ({ isPressed: s === "pressed", isDisabled: s === "disabled", isGhost: s === "ghost" });

const ShowcaseTabCell: React.FC<TabCellProps & { showcaseState: string }> = ({ showcaseState, tabStyle = "black", orientation = "horizontal", tabType = "regular", ...props }) => {
  if (showcaseState !== "hover") return <TabCell tabStyle={tabStyle} orientation={orientation} tabType={tabType} {...props} {...stateProps(showcaseState)} />;
  const isButton = tabType === "button";
  const isVertical = orientation === "vertical";
  const m: Record<string, Record<string, string>> = {
    black: { bg: "#f7f7f7", border: "#2b2b2b", buttonBg: "#f2f2f2" },
    blue: { bg: "#f0f8ff", border: "#91cafd", buttonBg: "#f0f8ff" },
    dlvRed: { bg: "#fef1f3", border: "#f68d9a", buttonBg: "#fef1f3" },
  };
  const c = m[tabStyle] || m.black;
  const cls = css({
    backgroundColor: isButton ? c.buttonBg : c.bg,
    boxShadow: isButton ? undefined : (isVertical ? `inset 0 -2px 0 0 ${c.border}` : `inset 2px 0 0 0 ${c.border}`),
  });
  return <TabCell tabStyle={tabStyle} orientation={orientation} tabType={tabType} {...props} className={cls} />;
};

const meta: Meta<TabCellProps> = {
  title: "Tarmac TDS/Tabs/TabCell",
  component: TabCell,
  parameters: { layout: "fullscreen", docs: { description: { component: "Tab cells represent individual navigation items within a tab group. Supports regular and button types, with slots for checkbox, icons, badge, pill, and status indicator. See [TabGroup](?path=/docs/tarmac-tds-tabs-tabgroup--docs) for grouped tab navigation." } } },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    tabType: { control: "select", options: [...TYPES], description: "Tab cell type — regular (underline indicator) or button (pill shape)" },
    orientation: { control: "select", options: ["horizontal", "vertical"], description: "Layout direction — horizontal tabs have left border, vertical have bottom border" },
    tabStyle: { control: "select", options: [...STYLES], description: "Color style — black (default), blue, or DLV Red" },
    size: { control: "select", options: [...SIZES], description: "Size — lg (14px title, 24px icons) or sm (12px title, 20px icons)" },
    isPressed: { control: "boolean", description: "Pressed/active state — shows bold title + active border" },
    isSelected: { control: "boolean", description: "Alias for isPressed — use for controlled tab selection" },
    isDisabled: { control: "boolean", description: "Disabled state — muted colors, no interaction" },
    isGhost: { control: "boolean", description: "Ghost/skeleton state — renders placeholder blocks" },
    title: { control: "text", description: "Title text — omit to hide" },
    subtext: { control: "text", description: "Subtext below title — omit to hide" },
    showCheckbox: { control: "boolean", description: "Show internal Tarmac Checkbox (hidden in vertical orientation)" },
    checkboxVariant: { control: "select", options: ["standard", "blue", "green", "dlv_red"], description: "Tarmac Checkbox variant" },
    checkboxStyle: { control: "select", options: ["box", "rounded"], description: "Tarmac Checkbox style" },
    checkboxChecked: { control: "boolean", description: "Controlled checkbox checked state" },
    leadingIcon: { description: "ReactNode — leading icon slot, auto-sizes to tab size (lg=24px, sm=20px)" },
    trailingIcon: { description: "ReactNode — trailing icon slot, auto-sizes to tab size" },
    badge: { description: "ReactNode — pass a <Badge> component with any variant/size" },
    pill: { description: "ReactNode — pass a <Pill> component with any variant/type" },
    status: { description: "ReactNode — pass a <StatusIndicator> with any variant" },
  },
};
export default meta;
type Story = StoryObj<TabCellProps>;

export const Playground: Story = {
  name: "Playground",
  args: {
    tabType: "regular", orientation: "horizontal", tabStyle: "black", size: "lg",
    title: T, subtext: S,
    showCheckbox: true, checkboxVariant: "standard", checkboxStyle: "box", checkboxChecked: false,
  },
  render: (args: any) => (
    <div style={sw}>
      <TabCell {...args}
        leadingIcon={<Icon />}
        trailingIcon={<Icon />}
        badge={<Badge variant="black" badgeType="solid" size="md" text="Badge" leadingIcon={<BadgeIcon />} />}
        pill={tabPill(args.tabStyle)}
        status={statusDot}
      />
    </div>
  ),
};

const StyleGrid: React.FC<{ orientation?: string }> = ({ orientation: o }) => (
  <div style={{ ...sw, display: "flex", flexDirection: "column", gap: 40, overflow: "auto" }}>
    {STYLES.map(s => (
      <div key={s}>
        {label(s)}
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: `120px repeat(${STATES.length}, minmax(180px, 1fr))`, gap: "8px 12px", alignItems: "start", minWidth: 1050 }}>
            <div style={{ fontSize: 11, fontWeight: 600 }}>Type / Size</div>
            {STATES.map(st => <div key={st} style={{ fontSize: 11, fontWeight: 600, textAlign: "center" }}>{st}</div>)}
            {SIZES.map(sz => TYPES.map(t => (
              <React.Fragment key={`${sz}-${t}-sub`}>
                <div style={{ fontSize: 11, fontWeight: 600, paddingTop: 8 }}>{t} / {sz}</div>
                {STATES.map(st => (
                  <div key={st}><ShowcaseTabCell showcaseState={st} tabStyle={s} tabType={t} orientation={o} size={sz} title={T} subtext={S} /></div>
                ))}
              </React.Fragment>
            )))}
            {SIZES.map(sz => TYPES.map(t => (
              <React.Fragment key={`${sz}-${t}-nosub`}>
                <div style={{ fontSize: 11, fontWeight: 600, paddingTop: 8 }}>{t} / {sz} (no sub)</div>
                {STATES.map(st => (
                  <div key={st}><ShowcaseTabCell showcaseState={st} tabStyle={s} tabType={t} orientation={o} size={sz} title={T} /></div>
                ))}
              </React.Fragment>
            )))}
            {SIZES.map(sz => (
              <React.Fragment key={`${sz}-icons`}>
                <div style={{ fontSize: 11, fontWeight: 600, paddingTop: 8 }}>icons / {sz}</div>
                {STATES.map(st => (
                  <div key={st}><ShowcaseTabCell showcaseState={st} tabStyle={s} orientation={o} size={sz} title={T} leadingIcon={<Icon />} trailingIcon={<Icon />} /></div>
                ))}
              </React.Fragment>
            ))}
            {SIZES.map(sz => (
              <React.Fragment key={`${sz}-badge`}>
                <div style={{ fontSize: 11, fontWeight: 600, paddingTop: 8 }}>badge / {sz}</div>
                {STATES.map(st => (
                  <div key={st}><ShowcaseTabCell showcaseState={st} tabStyle={s} orientation={o} size={sz} title={T} badge={<Badge variant="black" badgeType="solid" size="md" text="Badge" />} /></div>
                ))}
              </React.Fragment>
            ))}
            {SIZES.map(sz => (
              <React.Fragment key={`${sz}-pill`}>
                <div style={{ fontSize: 11, fontWeight: 600, paddingTop: 8 }}>pill / {sz}</div>
                {STATES.map(st => (
                  <div key={st}><ShowcaseTabCell showcaseState={st} tabStyle={s} orientation={o} size={sz} title={T} pill={tabPill(s)} /></div>
                ))}
              </React.Fragment>
            ))}
            {SIZES.map(sz => (
              <React.Fragment key={`${sz}-status`}>
                <div style={{ fontSize: 11, fontWeight: 600, paddingTop: 8 }}>status / {sz}</div>
                {STATES.map(st => (
                  <div key={st}><ShowcaseTabCell showcaseState={st} tabStyle={s} orientation={o} size={sz} title={T} status={statusDot} /></div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const HorizontalCells: Story = {
  name: "Horizontal Cells (left border)",
  render: () => <StyleGrid orientation="horizontal" />,
};

export const VerticalCells: Story = {
  name: "Vertical Cells (bottom border)",
  render: () => <StyleGrid orientation="vertical" />,
};

export const FullMatrixHorizontal: Story = {
  name: "Full Matrix — Horizontal",
  render: () => (
    <div style={{ ...sw, display: "flex", flexDirection: "column", gap: 40 }}>
      {TYPES.map(t => STYLES.map(s => (
        <div key={`${t}-${s}`}>
          {label(`${t} / ${s}`)}
          <div style={{ overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: `60px repeat(${STATES.length}, minmax(180px, 1fr))`, gap: "8px 12px", alignItems: "start", minWidth: 980 }}>
              <div />
              {STATES.map(state => <div key={state} style={{ fontSize: 11, fontWeight: 600, textAlign: "center" }}>{state}</div>)}
              {SIZES.map(sz => (
                <React.Fragment key={sz}>
                  <div style={{ fontSize: 11, fontWeight: 600, paddingTop: 8 }}>{sz}</div>
                  {STATES.map(state => (
                    <div key={state}><ShowcaseTabCell showcaseState={state} tabType={t} orientation="horizontal" tabStyle={s} size={sz} title={T} subtext={S} /></div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )))}
    </div>
  ),
};

export const FullMatrixVertical: Story = {
  name: "Full Matrix — Vertical",
  render: () => (
    <div style={{ ...sw, display: "flex", flexDirection: "column", gap: 40 }}>
      {TYPES.map(t => STYLES.map(s => (
        <div key={`${t}-${s}`}>
          {label(`${t} / ${s}`)}
          <div style={{ overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: `60px repeat(${STATES.length}, minmax(180px, 1fr))`, gap: "8px 12px", alignItems: "start", minWidth: 980 }}>
              <div />
              {STATES.map(state => <div key={state} style={{ fontSize: 11, fontWeight: 600, textAlign: "center" }}>{state}</div>)}
              {SIZES.map(sz => (
                <React.Fragment key={sz}>
                  <div style={{ fontSize: 11, fontWeight: 600, paddingTop: 8 }}>{sz}</div>
                  {STATES.map(state => (
                    <div key={state}><ShowcaseTabCell showcaseState={state} tabType={t} orientation="vertical" tabStyle={s} size={sz} title={T} subtext={S} /></div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )))}
    </div>
  ),
};

export const LightVsDarkMode: Story = {
  name: "Light vs Dark Mode",
  decorators: [(Story) => <Story />],
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24, alignItems: "flex-start" }}>
      <div style={{ flex: "1 1 0" }}>
        {label("Light")}
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {STYLES.map(s => <TabCell key={s} tabStyle={s} title={T} subtext={S} isPressed />)}
          </div>
        </Wrap>
      </div>
      <div style={{ flex: "1 1 0" }}>
        {label("Dark")}
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {STYLES.map(s => <TabCell key={s} tabStyle={s} title={T} subtext={S} isPressed />)}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
