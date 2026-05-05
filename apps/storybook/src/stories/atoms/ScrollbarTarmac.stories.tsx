import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TdsScrollbar } from "@delhivery/tarmac";
import type { TdsScrollbarProps } from "@delhivery/tarmac";
import { css } from "@emotion/css";

const VARIANTS = ["grey", "black", "coal"] as const;
const SIZES = ["large", "small"] as const;

const sampleItems = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

const lightBox = css({
  border: "1px solid #e6e6e6",
  borderRadius: "8px",
  backgroundColor: "#fff",
  maxHeight: 200,
  width: 200,
  overflow: "auto",
});

const darkBox = css({
  border: "1px solid #444",
  borderRadius: "8px",
  backgroundColor: "#1a1a2e",
  maxHeight: 200,
  width: 200,
  overflow: "auto",
  color: "#e6e6e6",
});

const itemStyle = css({
  padding: "8px 12px",
  borderBottom: "1px solid #f0f0f0",
  fontSize: "13px",
});

const darkItemStyle = css({
  padding: "8px 12px",
  borderBottom: "1px solid #333",
  fontSize: "13px",
});

const label = css({ fontSize: "12px", color: "#666", marginBottom: "4px" });
const sectionTitle = css({ fontSize: "14px", fontWeight: 500, marginBottom: "8px", color: "#333" });

const ScrollList: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div className={dark ? darkBox : lightBox}>
    {sampleItems.map((t) => (
      <div key={t} className={dark ? darkItemStyle : itemStyle}>{t}</div>
    ))}
  </div>
);

const HorizontalList: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div
    className={dark ? darkBox : lightBox}
    style={{ maxHeight: "none", height: "auto", overflowX: "auto", overflowY: "hidden" }}
  >
    <div style={{ display: "flex", width: "max-content" }}>
      {sampleItems.map((t) => (
        <div
          key={t}
          className={dark ? darkItemStyle : itemStyle}
          style={{ minWidth: 120, borderBottom: "none", borderRight: dark ? "1px solid #333" : "1px solid #f0f0f0" }}
        >
          {t}
        </div>
      ))}
    </div>
  </div>
);

/* ─── Meta ────────────────────────────────────────────────────────────────── */
const meta: Meta<TdsScrollbarProps> = {
  title: "Tarmac TDS/Scrollbar",
  component: TdsScrollbar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<TdsScrollbarProps>;

/* ─── Playground ──────────────────────────────────────────────────────────── */
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: { variant: "grey", size: "small" },
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    size: { control: "select", options: [...SIZES] },
  },
  render: (args) => (
    <TdsScrollbar {...args}>
      <ScrollList dark={args.variant === "black"} />
    </TdsScrollbar>
  ),
};

/* ─── Full Matrix ─────────────────────────────────────────────────────────── */
export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
      {VARIANTS.map((v) => (
        <div key={v}>
          <div className={sectionTitle} style={{ textTransform: "capitalize" }}>{v}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SIZES.map((sz) => (
              <div key={sz}>
                <div className={label}>Size: {sz}</div>
                <TdsScrollbar variant={v} size={sz}>
                  <ScrollList dark={v === "black"} />
                </TdsScrollbar>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ─── Grey ────────────────────────────────────────────────────────────────── */
export const Grey: Story = {
  name: "Grey",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24 }}>
      {SIZES.map((sz) => (
        <div key={sz}>
          <div className={label}>Size: {sz}</div>
          <TdsScrollbar variant="grey" size={sz}>
            <ScrollList />
          </TdsScrollbar>
        </div>
      ))}
    </div>
  ),
};

/* ─── Black ───────────────────────────────────────────────────────────────── */
export const Black: Story = {
  name: "Black",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24 }}>
      {SIZES.map((sz) => (
        <div key={sz}>
          <div className={label}>Size: {sz}</div>
          <TdsScrollbar variant="black" size={sz}>
            <ScrollList dark />
          </TdsScrollbar>
        </div>
      ))}
    </div>
  ),
};

/* ─── Coal ────────────────────────────────────────────────────────────────── */
export const Coal: Story = {
  name: "Coal",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24 }}>
      {SIZES.map((sz) => (
        <div key={sz}>
          <div className={label}>Size: {sz}</div>
          <TdsScrollbar variant="coal" size={sz}>
            <ScrollList />
          </TdsScrollbar>
        </div>
      ))}
    </div>
  ),
};

/* ─── Horizontal ──────────────────────────────────────────────────────────── */
export const Horizontal: Story = {
  name: "Horizontal",
  render: () => (
    <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
      {VARIANTS.map((v) => (
        <div key={v}>
          <div className={sectionTitle} style={{ textTransform: "capitalize" }}>{v}</div>
          {SIZES.map((sz) => (
            <div key={sz} style={{ marginBottom: 16 }}>
              <div className={label}>Size: {sz}</div>
              <TdsScrollbar variant={v} size={sz}>
                <HorizontalList dark={v === "black"} />
              </TdsScrollbar>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/* ─── App-Level Wrapper Demo ──────────────────────────────────────────────── */
export const AppLevelWrapper: Story = {
  name: "App-Level Wrapper",
  render: () => (
    <TdsScrollbar variant="grey" size="small">
      <div style={{ padding: 24 }}>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>
          All scrollable containers inside this wrapper inherit the TDS scrollbar styles.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          <div>
            <div className={label}>Vertical list</div>
            <ScrollList />
          </div>
          <div>
            <div className={label}>Horizontal list</div>
            <HorizontalList />
          </div>
          <div>
            <div className={label}>Nested container</div>
            <div className={lightBox} style={{ padding: 8 }}>
              <div style={{ maxHeight: 120, overflow: "auto", border: "1px solid #eee", borderRadius: 4 }}>
                {sampleItems.map((t) => (
                  <div key={t} className={itemStyle}>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TdsScrollbar>
  ),
};
