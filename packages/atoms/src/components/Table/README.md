# Table Component

A fully-featured, themeable table component for displaying structured data with support for sorting, pagination, row selection, row footers, and a card-style layout variant.

---

## Quick Start

```tsx
import { Table } from "@delhivery/tarmac";

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age", sorter: true },
  { title: "City", dataIndex: "city", key: "city" },
];

const data = [
  { key: "1", name: "Alice", age: 28, city: "Delhi" },
  { key: "2", name: "Bob", age: 34, city: "Mumbai" },
];

<Table columns={columns} dataSource={data} />;
```

---

## Props

### Data

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `RecordType[]` | `[]` | Array of row objects |
| `columns` | `ColumnType[]` | `[]` | Column definitions (see below) |
| `rowKey` | `string \| (record, index) => Key` | `"key"` | Unique key accessor for each row |

### Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "card"` | `"default"` | `"card"` renders each row as a rounded card with gaps |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Controls padding and font sizes |
| `bordered` | `boolean` | `false` | Show cell borders |
| `striped` | `boolean` | `false` | Alternate row background colors |
| `hoverable` | `boolean` | `true` | Highlight rows on hover |
| `showHeader` | `boolean` | `true` | Show the header row |
| `bgColor` | `string` | — | Override body background color |
| `headerBgColor` | `string` | — | Override header background color |
| `className` | `string` | — | Additional CSS class on the container |
| `style` | `CSSProperties` | — | Inline styles on the container |
| `rowClassName` | `string \| (record, index) => string` | — | Class applied to each body row |

### Features

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rowSelection` | `RowSelection` | — | Enable checkbox or radio row selection |
| `pagination` | `PaginationConfig \| false` | — | Pagination settings, or `false` to disable |
| `scroll` | `{ x?, y? }` | — | Fixed header / horizontal scroll |
| `expandable` | `ExpandableConfig` | — | Row expansion settings |
| `rowFooter` | `RowFooterConfig \| function` | — | Global row footer (alternative to column-level `rowFooter`) |
| `loading` | `boolean \| { spinning, indicator, tip }` | `false` | Show loading overlay |
| `locale` | `{ emptyText? }` | — | Custom empty state text |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onChange` | `(pagination, filters, sorter, extra) => void` | Fires on pagination, sort, or filter change |
| `onRow` | `(record, index) => props` | Return extra props/handlers for each `<tr>` |
| `onHeaderRow` | `(columns, index) => props` | Return extra props/handlers for the header `<tr>` |

### Advanced

| Prop | Type | Description |
|------|------|-------------|
| `title` | `(data) => ReactNode` | Render content above the table |
| `footer` | `(data) => ReactNode` | Render content below the table |
| `summary` | `(data) => ReactNode` | Summary row |
| `components` | `{ table?, header?, body? }` | Override internal table sub-components |
| `sticky` | `boolean \| { offsetHeader?, offsetScroll? }` | Sticky header |
| `virtual` | `boolean` | Enable virtual scrolling for large datasets |

---

## Column Definition

Each object in the `columns` array can have:

```tsx
{
  key: "name",
  title: "Name",
  dataIndex: "name",           // or ["nested", "path"]
  render: (value, record, index) => <strong>{value}</strong>,
  width: 200,
  align: "left" | "center" | "right",
  sorter: true,                // or (a, b) => a.age - b.age
  ellipsis: true,
  fixed: "left" | "right",
  className: "custom-cell",
  hidden: false,

  // Column-level row footer (see next section)
  rowFooter: true,
  cardStyles: "border-t border-dashed border-border-default px-4 py-3 bg-white",
}
```

---

## Row Footer

A row footer renders additional content below each data row, spanning all columns. This is useful for proofs, action buttons, metadata, etc.

### Column-level row footer

Set `rowFooter: true` on any column definition. The column's `render` function provides the footer content. Only the **first** column with `rowFooter: true` is used; it is excluded from regular table cells.

```tsx
const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  {
    key: "actions",
    dataIndex: "actions",
    rowFooter: true,
    cardStyles: "border-t border-dashed border-border-default px-4 py-3 bg-white",
    render: (value, record, index) => (
      <div>Footer for {record.name}</div>
    ),
  },
];
```

### Row footer column options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rowFooter` | `boolean` | `false` | When `true`, this column's `render` output becomes the row footer |
| `render` | `(value, record, index) => ReactNode` | — | Footer content. Return `null` to hide footer for that row |
| `cardStyles` | `string` | — | Tailwind class names applied to the footer `<td>`. When provided, replaces the default Emotion-generated styles (border, padding, background) |

**Styling behaviour:**
- When `cardStyles` is **provided**, only the Tailwind classes are applied to the footer cell — no Emotion styles are generated. This gives full control via utility classes.
- When `cardStyles` is **omitted**, the footer cell uses the theme's `rowFooter` tokens (`borderStyle`, `borderColor`, `padding`, `backgroundColor`) via Emotion CSS.

---

## Row Selection

```tsx
<Table
  rowSelection={{
    type: "checkbox",        // or "radio"
    selectedRowKeys: [...],  // controlled
    onChange: (keys, rows, info) => {},
    getCheckboxProps: (record) => ({ disabled: record.locked }),
  }}
  ...
/>
```

---

## Sorting

```tsx
const columns = [
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.age - b.age,
    defaultSortOrder: "ascend",
  },
];
```

Pass `sorter: true` for default string-based sorting, or a comparator function for custom logic.

---

## Pagination

```tsx
<Table
  pagination={{
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
  }}
  ...
/>
```

Set `pagination={false}` to show all rows without pagination.

---

## Card Variant

The `"card"` variant renders each row (plus its optional footer) as a visually separate card with rounded corners, borders, and gaps between rows.

```tsx
<div className="bg-bg-surface p-4">
  <Table
    variant="card"
    columns={columns}
    dataSource={data}
    rowSelection={{ type: "checkbox" }}
    pagination={false}
  />
</div>
```

In card mode:

- Each row group (data row + footer) is wrapped in its own `<tbody>`, enabling full-card hover and selection highlights.
- Hover and selection colors match the default variant's theme tokens, so they stay consistent.
- The header background becomes transparent to blend with the surrounding container.

---

## Static Properties

The Table component exposes helper constants:

```tsx
Table.SELECTION_COLUMN;   // Insert the selection column at a specific position
Table.EXPAND_COLUMN;      // Insert the expand column at a specific position
Table.SELECTION_ALL;
Table.SELECTION_INVERT;
Table.SELECTION_NONE;
Table.Column;             // JSX-style column definition
Table.ColumnGroup;        // Grouped header columns
Table.Summary;
Table.Summary.Row;
Table.Summary.Cell;
```

---

## Theme Configuration

The Table reads its styles from the `ThemeProvider` context. If no theme is provided, it falls back to `defaultThemeConfig` defined in `packages/atoms/src/config/config.ts`.

### Providing a custom theme

Wrap your app (or a subtree) with `ThemeProvider` and pass a theme JSON that includes a `components.table` key:

```tsx
import ThemeProvider from "@delhivery/tarmac/ThemeProvider";

const customTheme = {
  components: {
    table: {
      body: {
        hoverBackgroundColor: "#f0f4ff",
      },
      states: {
        selected: {
          backgroundColor: "#dbeafe",
        },
      },
    },
  },
};

<ThemeProvider theme={customTheme}>
  <Table columns={columns} dataSource={data} />
</ThemeProvider>;
```

Any token you omit will fall back to the default value.

### Full token reference

Below is every token the Table component reads, along with its default value.

#### `base`

| Token | Default | Description |
|-------|---------|-------------|
| `fontFamily` | `"IBM Plex Sans, sans-serif"` | Font family |
| `transition` | `"all 0.2s ease"` | CSS transition |
| `radius` | `"8px"` | Container border-radius |
| `borderColor` | `"#f0f0f0"` | Default border color |
| `backgroundColor` | `"#FFFFFF"` | Container background |

#### `sizes` (keyed by `small`, `medium`, `large`)

| Token | medium default | Description |
|-------|---------------|-------------|
| `headerPadding` | `"12px 16px"` | Header cell padding |
| `cellPadding` | `"12px 16px"` | Body cell padding |
| `fontSize` | `"14px"` | Body font size |
| `headerFontSize` | `"14px"` | Header font size |

#### `header`

| Token | Default | Description |
|-------|---------|-------------|
| `backgroundColor` | `"#fafafa"` | Header row background |
| `textColor` | `"#000000d9"` | Header text color |
| `fontWeight` | `"600"` | Header font weight |
| `hoverBackgroundColor` | `"#f0f0f0"` | Header hover background |

#### `body`

| Token | Default | Description |
|-------|---------|-------------|
| `backgroundColor` | `"#FFFFFF"` | Row background |
| `textColor` | `"#000000d9"` | Body text color |
| `hoverBackgroundColor` | `"#fafafa"` | Row hover background |
| `stripedBackgroundColor` | `"#fafafa"` | Alternate-row background (when `striped` is enabled) |

#### `states`

| Token | Default | Description |
|-------|---------|-------------|
| `selected.backgroundColor` | `"#e6f4ff"` | Selected row background |
| `disabled.cursor` | `"not-allowed"` | Disabled row cursor |

#### `selection`

| Token | Default | Description |
|-------|---------|-------------|
| `width` | `"48px"` | Selection column width |
| `checkedColor` | `"#1677ff"` | Checkbox / radio active color |
| `borderColor` | `"#d9d9d9"` | Checkbox border |
| `disabledBorderColor` | `"#d9d9d9"` | Disabled checkbox border |
| `disabledBackgroundColor` | `"#f5f5f5"` | Disabled checkbox background |

#### `sorter`

| Token | Default | Description |
|-------|---------|-------------|
| `activeColor` | `"#1677ff"` | Active sort icon color |
| `inactiveColor` | `"#bfbfbf"` | Inactive sort icon color |
| `iconSize` | `"10px"` | Sort icon size |
| `gap` | `"2px"` | Gap between sort arrows |

#### `pagination`

| Token | Default | Description |
|-------|---------|-------------|
| `gap` | `"16px"` | Space between pagination elements |
| `fontSize` | `"14px"` | Pagination font size |
| `buttonMinWidth` | `"32px"` | Page button min width |
| `buttonHeight` | `"32px"` | Page button height |
| `buttonPadding` | `"0 8px"` | Page button padding |
| `buttonBorderColor` | `"#d9d9d9"` | Page button border |
| `buttonBackgroundColor` | `"#FFFFFF"` | Page button background |
| `buttonRadius` | `"6px"` | Page button border-radius |
| `activeColor` | `"#1677ff"` | Active page color |
| `activeFontWeight` | `"500"` | Active page font weight |
| `disabledTextColor` | `"#d9d9d9"` | Disabled page text color |
| `disabledBackgroundColor` | `"#f5f5f5"` | Disabled page background |
| `inputWidth` | `"50px"` | Quick-jumper input width |

#### `rowFooter`

| Token | Default | Description |
|-------|---------|-------------|
| `borderStyle` | `"dashed"` | Separator border style |
| `borderColor` | `"#E0E3EB"` | Separator border color |
| `padding` | `"12px 16px"` | Footer cell padding |
| `backgroundColor` | `"transparent"` | Footer row background |

#### `variants`

Variant-specific style tokens, keyed by variant name (`"default"`, `"card"`). Each variant can override container, table, row, cell, and header styles. This follows the same pattern as the Input component's `variants` config.

**`variants.default`**

| Token | Default | Description |
|-------|---------|-------------|
| `container.backgroundColor` | `"#FFFFFF"` | Container background |
| `container.borderRadius` | `"8px"` | Container border-radius |
| `container.overflow` | `"hidden"` | Container overflow |
| `container.border` | `"1px solid #f0f0f0"` | Container border |
| `table.borderCollapse` | `"collapse"` | Table border-collapse |
| `table.borderSpacing` | `"0"` | Table border-spacing |
| `row.backgroundColor` | `"#FFFFFF"` | Row background |
| `row.borderRadius` | `"0"` | Row border-radius |
| `row.borderColor` | `"#f0f0f0"` | Row border color |
| `cell.borderBottom` | `"1px solid #f0f0f0"` | Cell bottom border |
| `header.backgroundColor` | `"#fafafa"` | Header background |
| `states.hover.backgroundColor` | `"#fafafa"` | Row hover background |
| `states.selected.backgroundColor` | `"#e6f4ff"` | Selected row background |
| `states.striped.backgroundColor` | `"#fafafa"` | Alternate row background |
| `states.disabled.cursor` | `"not-allowed"` | Disabled row cursor |

**`variants.card`**

| Token | Default | Description |
|-------|---------|-------------|
| `container.backgroundColor` | `"transparent"` | No container background |
| `container.borderRadius` | `"0"` | No container rounding |
| `container.overflow` | `"visible"` | Visible overflow for cards |
| `container.border` | `"none"` | No container border |
| `table.borderCollapse` | `"separate"` | Separate for card gaps |
| `table.borderSpacing` | `"0 6px"` | Vertical gap between cards |
| `row.backgroundColor` | `"#fff"` | Card surface color |
| `row.borderRadius` | `"8px"` | Card corner radius |
| `row.borderColor` | `"#E0E3EB"` | Card border color |
| `cell.borderBottom` | `"none"` | No cell border in cards |
| `header.backgroundColor` | `"transparent"` | Transparent header |
| `states.hover.backgroundColor` | `"#fafafa"` | Card hover background |
| `states.selected.backgroundColor` | `"#e6f4ff"` | Card selected background |
| `states.striped.backgroundColor` | `"#fafafa"` | Card striped background |
| `states.disabled.cursor` | `"not-allowed"` | Disabled card cursor |

#### `empty`

| Token | Default | Description |
|-------|---------|-------------|
| `padding` | `"48px 16px"` | Empty state padding |
| `textColor` | `"#00000040"` | Empty state text color |

#### `loading`

| Token | Default | Description |
|-------|---------|-------------|
| `overlayBackground` | `"rgba(255, 255, 255, 0.7)"` | Loading overlay color |
| `spinnerColor` | `"#1677ff"` | Spinner color |
| `trackColor` | `"#e6e6e6"` | Spinner track color |
| `spinnerSize` | `"24"` | Spinner size |

### Example: customising hover, selection, and variant styles

```json
{
  "components": {
    "table": {
      "body": {
        "hoverBackgroundColor": "#EFF6FF"
      },
      "states": {
        "selected": {
          "backgroundColor": "#DBEAFE"
        }
      },
      "variants": {
        "card": {
          "container": {
            "backgroundColor": "#F8FAFC"
          },
          "row": {
            "borderColor": "#CBD5E1",
            "borderRadius": "12px"
          },
          "table": {
            "borderSpacing": "0 8px"
          }
        }
      }
    }
  }
}
```

Save this as a JSON file and load it via `ThemeProvider`, or pass the object directly. Only the tokens you specify are overridden; everything else keeps its default.

---

## Tailwind Color Tokens

Tailwind utility classes used alongside the Table are defined in `packages/atoms/tailwind.config.js` under a structured `colors` section:

```js
colors: {
  text: {
    primary: "#5B80F7",    // links, highlighted text
    heading: "#3D445C",    // headings, primary content
    body: "#525B7A",       // body text, labels
    muted: "#A3AAC2",      // placeholders, descriptions
    badge: "#474747",      // proof badge text
  },
  bg: {
    surface: "#F9F9FB",    // page / section background
    dark: "#1F222E",       // dark button backgrounds
  },
  border: {
    default: "#E0E3EB",    // default borders & dividers
    badge: "#9d9d9d",      // proof badge border
  },
}
```

Usage examples:
- `text-text-primary` — link color
- `bg-bg-surface` — section background
- `border-border-default` — divider border
