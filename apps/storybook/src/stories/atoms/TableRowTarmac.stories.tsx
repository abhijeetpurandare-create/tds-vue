import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ThemeProvider,
  TableRow,
  TableTextCell,
  TableCellAddons,
  TableCellBadgePills,
  Button,
} from "@delhivery/tarmac";
import type { TableRowProps } from "@delhivery/tarmac";

/* ─── ThemeProvider wrappers ─── */
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
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>
      {children}
    </div>
  </ThemeProvider>
);

/* ─── Meta ─── */
const meta: Meta<TableRowProps> = {
  title: "Tarmac TDS/Table/Table Row",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<TableRowProps>;

/* ─── Reusable icon SVGs ─── */
const MoreHorizIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="4" cy="10" r="1.5" fill="#2b2b2b" />
    <circle cx="10" cy="10" r="1.5" fill="#2b2b2b" />
    <circle cx="16" cy="10" r="1.5" fill="#2b2b2b" />
  </svg>
);

const PrintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="4" y="2" width="12" height="5" rx="1" stroke="#2396fb" strokeWidth="1.2" />
    <rect x="2" y="7" width="16" height="8" rx="1" stroke="#2396fb" strokeWidth="1.2" />
    <rect x="5" y="12" width="10" height="5" rx="1" stroke="#2396fb" strokeWidth="1.2" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6z" stroke="#2396fb" strokeWidth="1.2" fill="none" />
    <circle cx="10" cy="10" r="3" stroke="#2396fb" strokeWidth="1.2" fill="none" />
  </svg>
);

const ShopifyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="2" width="16" height="16" rx="4" fill="#96BF48" />
    <text x="10" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S</text>
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 3h7v7M13 3L6 10" stroke="#2b2b2b" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/* ============================================
   Story 1 — Playground
   ============================================ */
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "padded" },
  argTypes: {
    style: { control: "select", options: ["type1", "type2", "type3", "ghost"] },
    showFooter: { control: "boolean" },
  },
  args: {
    style: "type1",
    showFooter: true,
  },
  render: (args) => (
    <TableRow
      {...args}
      cells={
        <>
          <TableCellAddons
            type="checkbox-title-subtext"
            title="9023857"
            subtext="78986398757"
          />
          <TableTextCell title="Blue T-Shirt (+2 items)" subtextBottom="₹ 2,200" showSubtextBottom />
          <TableTextCell title="Prepaid" />
          <TableTextCell title="Consignee Unavailable" />
          <TableTextCell title="2 attempts" />
          <TableTextCell title="8 Jan | 12:40PM" />
        </>
      }
      footerSlot={<span style={{ fontWeight: 600, fontSize: 14, color: "#2b2b2b" }}>Proofs</span>}
      footerActions={
        <>
          <Button variant="black" buttonStyle="secondary" size="sm" text="Re-attempt" />
          <Button variant="black" buttonStyle="primary" size="sm" text="Return" />
          <Button variant="black" buttonStyle="secondary" buttonType="iconButton" size="sm" leadingIcon={<MoreHorizIcon />} />
        </>
      }
    />
  ),
};

/* ============================================
   Story 2 — Type 1 (NDR-style with proofs footer)
   ============================================ */
export const Type1: Story = {
  name: "Type 1 (NDR Row)",
  render: () => (
    <TableRow
      style="type1"
      cells={
        <>
          <TableCellAddons
            type="checkbox-title-subtext"
            title="9023857"
            subtext="78986398757"
          />
          <TableTextCell title="Blue T-Shirt (+2 items)" subtextBottom="₹ 2,200" showSubtextBottom />
          <TableTextCell title="Prepaid" />
          <TableTextCell title="Consignee Unavailable" />
          <TableTextCell title="2 attempts" />
          <TableTextCell title="8 Jan | 12:40PM" />
        </>
      }
      footerSlot={
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: "#2b2b2b" }}>Proofs</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Whatsapp", "Call Recording", "Geofence"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 8px",
                  border: "0.5px solid #e6e6e6",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#2b2b2b",
                  backgroundColor: "#fff",
                }}
              >
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(160deg, #a8b1b0, rgba(0,0,0,0.91))", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ width: 16, height: 16, display: "inline-block", backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 4 }} />
                </span>
                {label}
                <LinkIcon />
              </div>
            ))}
          </div>
        </div>
      }
      footerActions={
        <>
          <Button variant="black" buttonStyle="secondary" size="sm" text="Re-attempt" />
          <Button variant="black" buttonStyle="primary" size="sm" text="Return" />
          <Button variant="black" buttonStyle="secondary" buttonType="iconButton" size="sm" leadingIcon={<MoreHorizIcon />} />
        </>
      }
    />
  ),
};

/* ============================================
   Story 3 — Type 2 (Order row with RTO score footer)
   ============================================ */
export const Type2: Story = {
  name: "Type 2 (Order Row + RTO Score)",
  render: () => (
    <TableRow
      style="type2"
      cells={
        <>
          <TableCellAddons
            type="checkbox-2-line-icon"
            title="SO - 4658"
            subtext="Subtext here"
            trailingIcon={<ShopifyIcon />}
            leadingIcon={<LinkIcon />}
          />
          <TableTextCell title="Pavan Gupta" subtextBottom="Bhopal" showSubtextBottom />
          <TableTextCell title="Blue T-Shirt (+2 items)" subtextBottom="₹ 2,200 | Prepaid" showSubtextBottom />
          <TableTextCell title="2552411" subtextBottom="Today | 2PM to 4PM" showSubtextBottom />
          <TableCellBadgePills variant="pills" items={[{ label: "Out for Pickup" }]} />
        </>
      }
      footerSlot={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* RTO Score widget */}
          <div style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FEF1F3",
            borderRadius: 8,
            overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 12px", height: 38 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#2b2b2b" }}>RTO score:</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#ED1B36" }}>88</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 12px",
              backgroundColor: "#fff",
              border: "1px solid #e6e6e6",
              borderRadius: 8,
            }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#2b2b2b" }}>Act now</span>
            </div>
          </div>
          {/* Last deliveries badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            backgroundColor: "#F7F7F7",
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 500,
            color: "#3D445C",
          }}>
            Last{" "}
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              backgroundColor: "#FDE8EB",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 500,
              color: "#ED1B36",
            }}>4</span>
            /5 deliveries failed
          </div>
        </div>
      }
      footerActions={
        <>
          <Button variant="info" buttonStyle="secondary" size="sm" text="Print Label" leadingIcon={<PrintIcon />} />
          <Button variant="black" buttonStyle="secondary" buttonType="iconButton" size="sm" leadingIcon={<MoreHorizIcon />} />
        </>
      }
    />
  ),
};

/* ============================================
   Story 4 — Type 3 (Delivery row with View POD)
   ============================================ */
export const Type3: Story = {
  name: "Type 3 (Delivery Row + View POD)",
  render: () => (
    <TableRow
      style="type3"
      cells={
        <>
          <TableCellAddons
            type="checkbox-2-line-icon"
            title="SO - 4658"
            subtext="Subtext here"
            trailingIcon={<ShopifyIcon />}
            leadingIcon={<LinkIcon />}
          />
          <TableTextCell title="3 May, 2025" />
          <TableTextCell title="Pavan Gupta" subtextBottom="Bhopal" showSubtextBottom />
          <TableTextCell title="Blue T-Shirt (+2 items)" subtextBottom="₹ 2,200 | Prepaid" showSubtextBottom />
          <TableTextCell
            variant="textsIcons"
            title="550 gm"
            subtextBottom="1 day"
            showSubtextBottom
            trailingSubtextIcon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 12L8 4l6 8" stroke="#2b2b2b" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            }
          />
        </>
      }
      footerActions={
        <>
          <Button variant="info" buttonStyle="tertiary" size="sm" text="View POD" leadingIcon={<EyeIcon />} />
          <Button variant="black" buttonStyle="secondary" buttonType="iconButton" size="sm" leadingIcon={<MoreHorizIcon />} />
        </>
      }
    />
  ),
};

/* ============================================
   Story 5 — Ghost (Loading skeleton)
   ============================================ */
export const Ghost: Story = {
  name: "Ghost (Loading)",
  render: () => <TableRow style="ghost" />,
};

/* ============================================
   Story 6 — No Footer
   ============================================ */
export const NoFooter: Story = {
  name: "No Footer",
  render: () => (
    <TableRow
      style="type1"
      showFooter={false}
      cells={
        <>
          <TableCellAddons
            type="checkbox-title-subtext"
            title="9023857"
            subtext="78986398757"
          />
          <TableTextCell title="Blue T-Shirt (+2 items)" subtextBottom="₹ 2,200" showSubtextBottom />
          <TableTextCell title="Prepaid" />
          <TableTextCell title="Consignee Unavailable" />
          <TableTextCell title="2 attempts" />
          <TableTextCell title="8 Jan | 12:40PM" />
        </>
      }
    />
  ),
};

/* ============================================
   Story 7 — Multiple Rows Stacked
   ============================================ */
export const MultipleRows: Story = {
  name: "Multiple Rows Stacked",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <TableRow
        style="type2"
        cells={
          <>
            <TableCellAddons type="checkbox-2-line-icon" title="SO - 4658" subtext="Subtext here" trailingIcon={<ShopifyIcon />} leadingIcon={<LinkIcon />} />
            <TableTextCell title="Pavan Gupta" subtextBottom="Bhopal" showSubtextBottom />
            <TableTextCell title="Blue T-Shirt (+2 items)" subtextBottom="₹ 2,200 | Prepaid" showSubtextBottom />
            <TableTextCell title="2552411" subtextBottom="Today | 2PM to 4PM" showSubtextBottom />
            <TableCellBadgePills variant="pills" items={[{ label: "Out for Pickup" }]} />
          </>
        }
        footerActions={
          <>
            <Button variant="info" buttonStyle="secondary" size="sm" text="Print Label" leadingIcon={<PrintIcon />} />
            <Button variant="black" buttonStyle="secondary" buttonType="iconButton" size="sm" leadingIcon={<MoreHorizIcon />} />
          </>
        }
      />
      <TableRow
        style="type2"
        cells={
          <>
            <TableCellAddons type="checkbox-2-line-icon" title="SO - 4659" subtext="Another order" trailingIcon={<ShopifyIcon />} leadingIcon={<LinkIcon />} />
            <TableTextCell title="Rahul Sharma" subtextBottom="Delhi" showSubtextBottom />
            <TableTextCell title="Red Jacket" subtextBottom="₹ 3,500 | COD" showSubtextBottom />
            <TableTextCell title="2552412" subtextBottom="Tomorrow | 10AM to 12PM" showSubtextBottom />
            <TableCellBadgePills variant="pills" items={[{ label: "Scheduled" }]} />
          </>
        }
        footerActions={
          <>
            <Button variant="info" buttonStyle="secondary" size="sm" text="Print Label" leadingIcon={<PrintIcon />} />
            <Button variant="black" buttonStyle="secondary" buttonType="iconButton" size="sm" leadingIcon={<MoreHorizIcon />} />
          </>
        }
      />
      <TableRow style="ghost" />
    </div>
  ),
};

/* ============================================
   Story 8 — Light vs Dark Mode
   ============================================ */
export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  decorators: [],
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 8, fontSize: 12, color: "#808080" }}>Light</h4>
        <Wrap>
          <TableRow
            style="type1"
            cells={
              <>
                <TableCellAddons type="checkbox-title-subtext" title="9023857" subtext="78986398757" />
                <TableTextCell title="Blue T-Shirt" subtextBottom="₹ 2,200" showSubtextBottom />
                <TableTextCell title="Prepaid" />
                <TableTextCell title="2 attempts" />
              </>
            }
            footerActions={
              <>
                <Button variant="black" buttonStyle="secondary" size="sm" text="Re-attempt" />
                <Button variant="black" buttonStyle="primary" size="sm" text="Return" />
              </>
            }
          />
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 8, fontSize: 12, color: "#808080" }}>Dark</h4>
        <DarkWrap>
          <TableRow
            style="type1"
            cells={
              <>
                <TableCellAddons type="checkbox-title-subtext" title="9023857" subtext="78986398757" />
                <TableTextCell title="Blue T-Shirt" subtextBottom="₹ 2,200" showSubtextBottom />
                <TableTextCell title="Prepaid" />
                <TableTextCell title="2 attempts" />
              </>
            }
            footerActions={
              <>
                <Button variant="black" buttonStyle="secondary" size="sm" text="Re-attempt" />
                <Button variant="black" buttonStyle="primary" size="sm" text="Return" />
              </>
            }
          />
        </DarkWrap>
      </div>
    </div>
  ),
};

/* ============================================
   Story 9 — Full Matrix (all styles)
   ============================================ */
export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => {
    const sharedCells = (
      <>
        <TableCellAddons type="checkbox-title-subtext" title="9023857" subtext="78986398757" />
        <TableTextCell title="Blue T-Shirt (+2 items)" subtextBottom="₹ 2,200" showSubtextBottom />
        <TableTextCell title="Prepaid" />
        <TableTextCell title="Consignee Unavailable" />
        <TableTextCell title="2 attempts" />
        <TableTextCell title="8 Jan | 12:40PM" />
      </>
    );
    const sharedFooterActions = (
      <>
        <Button variant="black" buttonStyle="secondary" size="sm" text="Re-attempt" />
        <Button variant="black" buttonStyle="primary" size="sm" text="Return" />
        <Button variant="black" buttonStyle="secondary" buttonType="iconButton" size="sm" leadingIcon={<MoreHorizIcon />} />
      </>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h4 style={{ marginBottom: 8, fontSize: 12, color: "#808080" }}>Type 1</h4>
          <TableRow style="type1" cells={sharedCells} footerActions={sharedFooterActions} />
        </div>
        <div>
          <h4 style={{ marginBottom: 8, fontSize: 12, color: "#808080" }}>Type 2</h4>
          <TableRow
            style="type2"
            cells={
              <>
                <TableCellAddons type="checkbox-2-line-icon" title="SO - 4658" subtext="Subtext here" trailingIcon={<ShopifyIcon />} leadingIcon={<LinkIcon />} />
                <TableTextCell title="Pavan Gupta" subtextBottom="Bhopal" showSubtextBottom />
                <TableTextCell title="Blue T-Shirt (+2 items)" subtextBottom="₹ 2,200 | Prepaid" showSubtextBottom />
                <TableTextCell title="2552411" subtextBottom="Today | 2PM to 4PM" showSubtextBottom />
                <TableCellBadgePills variant="pills" items={[{ label: "Out for Pickup" }]} />
              </>
            }
            footerActions={
              <>
                <Button variant="info" buttonStyle="secondary" size="sm" text="Print Label" leadingIcon={<PrintIcon />} />
                <Button variant="black" buttonStyle="secondary" buttonType="iconButton" size="sm" leadingIcon={<MoreHorizIcon />} />
              </>
            }
          />
        </div>
        <div>
          <h4 style={{ marginBottom: 8, fontSize: 12, color: "#808080" }}>Type 3</h4>
          <TableRow
            style="type3"
            cells={
              <>
                <TableCellAddons type="checkbox-2-line-icon" title="SO - 4658" subtext="Subtext here" trailingIcon={<ShopifyIcon />} leadingIcon={<LinkIcon />} />
                <TableTextCell title="3 May, 2025" />
                <TableTextCell title="Pavan Gupta" subtextBottom="Bhopal" showSubtextBottom />
                <TableTextCell title="Blue T-Shirt (+2 items)" subtextBottom="₹ 2,200 | Prepaid" showSubtextBottom />
                <TableTextCell title="550 gm" subtextBottom="1 day" showSubtextBottom />
              </>
            }
            footerActions={
              <>
                <Button variant="info" buttonStyle="tertiary" size="sm" text="View POD" leadingIcon={<EyeIcon />} />
                <Button variant="black" buttonStyle="secondary" buttonType="iconButton" size="sm" leadingIcon={<MoreHorizIcon />} />
              </>
            }
          />
        </div>
        <div>
          <h4 style={{ marginBottom: 8, fontSize: 12, color: "#808080" }}>Ghost</h4>
          <TableRow style="ghost" />
        </div>
      </div>
    );
  },
};
