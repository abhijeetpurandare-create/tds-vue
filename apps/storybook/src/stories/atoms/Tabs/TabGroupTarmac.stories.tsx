import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TabCell, TabGroup, ThemeProvider, Badge, Pill, StatusIndicatorComponent } from "@delhivery/tarmac";
import type { TabGroupProps, TabCellProps } from "@delhivery/tarmac";

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);

const TYPES = ["regular", "button"] as const;
const STYLES = ["black", "blue", "dlvRed"] as const;
const SIZES = ["lg", "sm"] as const;
const sw = { padding: 24, backgroundColor: "#f5f5f5", borderRadius: 8 };
const label = (t: string) => <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t}</div>;
const sublabel = (t: string) => <div style={{ fontSize: 10, color: "#888", marginBottom: 4 }}>{t}</div>;
const T = "Title goes here";
const S = "Something goes here";

const Icon = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/></svg>;

const STYLE_PILL: Record<string, { v: string; t: "solid" | "subtle" }> = { black: { v: "black", t: "subtle" }, blue: { v: "blue", t: "solid" }, dlvRed: { v: "error", t: "solid" } };
const tabPill = (s: string = "black") => { const p = STYLE_PILL[s] || STYLE_PILL.black; return <Pill pillVariant={p.v as any} pillType={p.t} size="sm" text="12" />; };
const statusDot = <StatusIndicatorComponent variant="success" size="xs" />;

const ContentPanel: React.FC<{ label: string }> = ({ label: l }) => (
  <div style={{ padding: 24, border: "1px dashed #ccc", borderRadius: 4, color: "#888", fontSize: 13 }}>Content for <strong>{l}</strong></div>
);

const CELL_VARIANTS: { name: string; props: Partial<TabCellProps> }[] = [
  { name: "Title only", props: { title: T } },
  { name: "Title + Subtext", props: { title: T, subtext: S } },
  { name: "Checkbox", props: { title: T, showCheckbox: true } },
  { name: "Checkbox + Subtext", props: { title: T, subtext: S, showCheckbox: true } },
  { name: "Status", props: { title: T, status: statusDot } },
  { name: "Badge", props: { title: T, badge: <Badge variant="black" badgeType="solid" size="md" text="Badge" /> } },
  { name: "Pill", props: { title: T, pill: tabPill() } },
  { name: "Leading Icon", props: { title: T, leadingIcon: <Icon /> } },
  { name: "Trailing Icon", props: { title: T, trailingIcon: <Icon /> } },
  { name: "Both Icons", props: { title: T, leadingIcon: <Icon />, trailingIcon: <Icon /> } },
  { name: "All Slots", props: { title: T, subtext: S, showCheckbox: true, leadingIcon: <Icon />, trailingIcon: <Icon />, badge: <Badge variant="black" badgeType="solid" size="md" text="Badge" />, pill: tabPill(), status: statusDot } },
];

const meta: Meta<TabGroupProps> = {
  title: "Tarmac TDS/Tabs/TabGroup",
  component: TabGroup,
  parameters: { layout: "fullscreen", docs: { description: { component: "A container that groups TabCell items into horizontal or vertical navigation with dividers and tab selection. See [TabCell](?path=/docs/tarmac-tds-tabs-tabcell--docs) for individual tab cell variants." } } },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"], description: "Layout — horizontal (left-to-right) or vertical (top-to-bottom). Auto-sets cell border direction." },
    size: { control: "select", options: [...SIZES], description: "Size — affects vertical group width (lg=300px, sm=264px)" },
    tabType: { control: "select", options: [...TYPES], description: "Tab type — regular or button (pill shape)" },
    showDivider: { control: "boolean", description: "Show dividers between tabs (regular type only, horizontal needs explicit opt-in)" },
  },
};
export default meta;
type Story = StoryObj<TabGroupProps>;

export const Playground: Story = {
  name: "Playground",
  args: { orientation: "horizontal", size: "lg", tabType: "regular", showDivider: false },
  render: (args) => {
    const [active, setActive] = useState(0);
    const tabs = [T, T, T, T];
    return (
      <div style={sw}>
        <TabGroup {...args}>
          {tabs.map((tab, i) => (
            <TabCell key={i} tabType={args.tabType} size={args.size}
              title={tab} subtext={S}
              isSelected={active === i} onClick={() => setActive(i)} />
          ))}
        </TabGroup>
        <ContentPanel label={`Tab ${active + 1}`} />
      </div>
    );
  },
};

export const HorizontalAllVariants: Story = {
  name: "Horizontal — All Variants",
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <div style={{ ...sw, display: "flex", flexDirection: "column", gap: 32 }}>
        {STYLES.map(s => TYPES.map(t => (
          <div key={`${s}-${t}`}>
            {label(`${s} / ${t}`)}
            {SIZES.map(sz => (
              <div key={sz} style={{ marginBottom: 8 }}>
                {sublabel(sz)}
                <div style={{ overflowX: "auto" }}>
                  <TabGroup tabType={t}>
                    {CELL_VARIANTS.map((cv, i) => (
                      <TabCell key={cv.name} tabType={t} tabStyle={s} size={sz}
                        isSelected={active === i} onClick={() => setActive(i)} {...cv.props} />
                    ))}
                  </TabGroup>
                </div>
              </div>
            ))}
            <ContentPanel label={CELL_VARIANTS[active]?.name || "Tab"} />
          </div>
        )))}
      </div>
    );
  },
};

export const VerticalAllVariants: Story = {
  name: "Vertical — All Variants",
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <div style={{ ...sw, display: "flex", flexDirection: "column", gap: 32 }}>
        {STYLES.map(s => TYPES.map(t => (
          <div key={`${s}-${t}`}>
            {label(`${s} / ${t}`)}
            {SIZES.map(sz => (
              <div key={sz} style={{ marginBottom: 8 }}>
                {sublabel(sz)}
                <div style={{ display: "flex", gap: 16 }}>
                  <TabGroup orientation="vertical" size={sz} tabType={t}>
                    {CELL_VARIANTS.map((cv, i) => (
                      <TabCell key={cv.name} tabType={t} tabStyle={s} size={sz}
                        isSelected={active === i} onClick={() => setActive(i)} {...cv.props} />
                    ))}
                  </TabGroup>
                  <div style={{ flex: 1 }}><ContentPanel label={CELL_VARIANTS[active]?.name || "Tab"} /></div>
                </div>
              </div>
            ))}
          </div>
        )))}
      </div>
    );
  },
};

export const WithDivider: Story = {
  name: "With Divider",
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <div style={{ ...sw, display: "flex", flexDirection: "column", gap: 24 }}>
        {label("Horizontal — With Divider")}
        <TabGroup showDivider>
          {[0, 1, 2, 3].map(i => (
            <TabCell key={i} title={T} subtext={S} isSelected={active === i} onClick={() => setActive(i)} />
          ))}
        </TabGroup>
        <ContentPanel label={`Tab ${active + 1}`} />
        {label("Vertical — With Divider (default)")}
        <div style={{ display: "flex", gap: 16 }}>
          <TabGroup orientation="vertical" showDivider>
            {[0, 1, 2, 3].map(i => (
              <TabCell key={i} title={T} isSelected={active === i} onClick={() => setActive(i)} />
            ))}
          </TabGroup>
          <div style={{ flex: 1 }}><ContentPanel label={`Tab ${active + 1}`} /></div>
        </div>
      </div>
    );
  },
};

export const HorizontalTabCounts: Story = {
  name: "Horizontal — Tab Counts (2–8)",
  render: () => {
    const [active, setActive] = useState(0);
    const COUNTS = [2, 3, 4, 5, 6, 7, 8];
    return (
      <div style={{ ...sw, display: "flex", flexDirection: "column", gap: 32 }}>
        {STYLES.map(s => (
          <div key={s}>
            {label(s)}
            {TYPES.map(t => (
              <div key={t} style={{ marginBottom: 16 }}>
                {sublabel(t)}
                {SIZES.map(sz => (
                  <div key={sz} style={{ marginBottom: 12 }}>
                    {sublabel(sz)}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {COUNTS.map(count => (
                        <div key={count}>
                          <div style={{ fontSize: 10, color: "#aaa", marginBottom: 2 }}>{count} Tabs</div>
                          <TabGroup tabType={t}>
                            {Array.from({ length: count }, (_, i) => (
                              <TabCell key={i} tabType={t} tabStyle={s} size={sz} title={T}
                                isSelected={active === i} onClick={() => setActive(i)} />
                            ))}
                          </TabGroup>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const VerticalTabCounts: Story = {
  name: "Vertical — Tab Counts (2–8)",
  render: () => {
    const [active, setActive] = useState(0);
    const COUNTS = [2, 3, 4, 5, 6, 7, 8];
    return (
      <div style={{ ...sw, display: "flex", flexDirection: "column", gap: 32 }}>
        {STYLES.map(s => (
          <div key={s}>
            {label(s)}
            {TYPES.map(t => (
              <div key={t} style={{ marginBottom: 16 }}>
                {sublabel(t)}
                {SIZES.map(sz => (
                  <div key={sz} style={{ marginBottom: 12 }}>
                    {sublabel(sz)}
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                      {COUNTS.map(count => (
                        <div key={count}>
                          <div style={{ fontSize: 10, color: "#aaa", marginBottom: 2 }}>{count} Tabs</div>
                          <TabGroup orientation="vertical" size={sz} tabType={t}>
                            {Array.from({ length: count }, (_, i) => (
                              <TabCell key={i} tabType={t} tabStyle={s} size={sz} title={T}
                                isSelected={active === i} onClick={() => setActive(i)} />
                            ))}
                          </TabGroup>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => {
    const [active, setActive] = useState(0);
    const COUNTS = [2, 4, 6, 8];
    return (
      <div style={{ ...sw, display: "flex", flexDirection: "column", gap: 40 }}>
        {(["horizontal", "vertical"] as const).map(dir => (
          <div key={dir}>
            {label(dir)}
            {STYLES.map(s => TYPES.map(t => SIZES.map(sz => (
              <div key={`${s}-${t}-${sz}`} style={{ marginBottom: 16 }}>
                {sublabel(`${s} / ${t} / ${sz}`)}
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
                  {COUNTS.map(count => (
                    <div key={count}>
                      <div style={{ fontSize: 10, color: "#aaa", marginBottom: 2 }}>{count} tabs</div>
                      {dir === "horizontal" ? (
                        <TabGroup tabType={t}>
                          {Array.from({ length: count }, (_, i) => (
                            <TabCell key={i} tabType={t} tabStyle={s} size={sz} title={T}
                              isSelected={active === i} onClick={() => setActive(i)} />
                          ))}
                        </TabGroup>
                      ) : (
                        <TabGroup orientation="vertical" size={sz} tabType={t}>
                          {Array.from({ length: count }, (_, i) => (
                            <TabCell key={i} tabType={t} tabStyle={s} size={sz} title={T}
                              isSelected={active === i} onClick={() => setActive(i)} />
                          ))}
                        </TabGroup>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))))}
          </div>
        ))}
      </div>
    );
  },
};
