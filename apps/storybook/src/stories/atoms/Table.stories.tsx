import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Table, ColumnType } from "@delhivery/tarmac";
import { fn } from "storybook/test";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateRight,
  faReply,
  faEllipsis,
  faComment,
  faPhone,
  faLocationDot,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof Table> = {
  title: "Atoms/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the table",
      defaultValue: "medium",
    },
    bordered: {
      control: "boolean",
      description: "Whether the table has borders",
      defaultValue: false,
    },
    striped: {
      control: "boolean",
      description: "Whether rows are striped",
      defaultValue: false,
    },
    hoverable: {
      control: "boolean",
      description: "Whether rows have hover effect",
      defaultValue: true,
    },
    showHeader: {
      control: "boolean",
      description: "Whether to show table header",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Sample data
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const basicColumns: ColumnType<DataType>[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: true,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const basicData: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
    tags: ["developer"],
  },
];

// Basic Table
export const Basic: Story = {
  args: {
    columns: basicColumns,
    dataSource: basicData,
    size: "medium",
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Table with Borders
export const Bordered: Story = {
  args: {
    columns: basicColumns,
    dataSource: basicData,
    bordered: true,
    size: "medium",
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Table Sizes
export const Sizes: Story = {
  args: {
    columns: basicColumns,
    dataSource: basicData,
    onRow: fn(),
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h3 className="mb-2">Small</h3>
        <Table {...args} size="small" />
      </div>
      <div>
        <h3 className="mb-2">Medium</h3>
        <Table {...args} size="medium" />
      </div>
      <div>
        <h3 className="mb-2">Large</h3>
        <Table {...args} size="large" />
      </div>
    </div>
  ),
};

// Striped Table
export const Striped: Story = {
  args: {
    columns: basicColumns,
    dataSource: basicData,
    striped: true,
    size: "medium",
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Table with Selection
export const WithSelection: Story = {
  args: {
    columns: basicColumns,
    dataSource: basicData,
    size: "medium",
    rowSelection: {
      type: "checkbox",
    },
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Table with Radio Selection
export const WithRadioSelection: Story = {
  args: {
    columns: basicColumns,
    dataSource: basicData,
    size: "medium",
    rowSelection: {
      type: "radio",
    },
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Table with Sorting
export const WithSorting: Story = {
  args: {
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        sorter: true,
      },
    ],
    dataSource: basicData,
    size: "medium",
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Table with Pagination
export const WithPagination: Story = {
  args: {
    columns: basicColumns,
    dataSource: Array.from({ length: 50 }, (_, i) => ({
      key: String(i + 1),
      name: `User ${i + 1}`,
      age: 20 + (i % 30),
      address: `Address ${i + 1}`,
      tags: ["tag1"],
    })),
    size: "medium",
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Table with Custom Render
export const WithCustomRender: Story = {
  args: {
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <strong>{text}</strong>,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        render: (age) => (
          <span style={{ color: age > 35 ? "red" : "green" }}>{age}</span>
        ),
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        render: (tags: string[]) => (
          <div>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  marginRight: "8px",
                  padding: "2px 8px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        ),
      },
    ],
    dataSource: basicData,
    size: "medium",
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Table with Loading
export const WithLoading: Story = {
  args: {
    columns: basicColumns,
    dataSource: basicData,
    size: "medium",
    loading: true,
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Table with Empty State
export const Empty: Story = {
  args: {
    columns: basicColumns,
    dataSource: [],
    size: "medium",
    locale: {
      emptyText: "No data available",
    },
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Table with Title and Footer
export const WithTitleAndFooter: Story = {
  args: {
    columns: basicColumns,
    dataSource: basicData,
    size: "medium",
    title: (data) => (
      <div style={{ fontWeight: "bold" }}>Total: {data.length} records</div>
    ),
    footer: (data) => (
      <div style={{ textAlign: "right" }}>Footer: {data.length} records</div>
    ),
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// Complex Table Example
export const ComplexExample: Story = {
  args: {
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
    ],
    dataSource: Array.from({ length: 25 }, (_, i) => ({
      key: String(i + 1),
      name: `User ${i + 1}`,
      age: 20 + (i % 30),
      address: `Address ${i + 1}`,
      tags: ["tag1"],
    })),
    size: "medium",
    bordered: true,
    striped: true,
    hoverable: true,
    rowSelection: {
      type: "checkbox",
    },
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
    onRow: fn(),
  },
  render: (args) => (
    <div className="w-full">
      <Table {...args} />
    </div>
  ),
};

// ============================================
// Row Footer Stories
// ============================================



const rowFooterColumns: ColumnType<any>[] = [
  {
    title: "ORDER ID & AWB NO.",
    key: "orderId",
    render: (_, record) => (
      <div className="flex flex-col">
        <span className="text-primary font-medium text-sm leading-5 cursor-pointer">
          {record.orderId}
        </span>
        <span className="text-black text-sm leading-6">
          {record.awbNo}
        </span>
      </div>
    ),
    width: 207,
  },
  {
    title: "PRODUCT DETAILS",
    key: "product",
    render: (_, record) => (
      <div className="flex flex-col gap-0.5">
        <div className="flex gap-1 items-center">
          <span className="font-medium text-sm leading-5 text-default_black">
            {record.productName}
          </span>
          {record.extraItems > 0 && (
            <span className="italic text-sm leading-5 text-descriptions_placeholder">
              (+{record.extraItems} items)
            </span>
          )}
        </div>
        <span className="text-sm leading-5 text-descriptions_placeholder">
          {record.price}
        </span>
      </div>
    ),
    width: 217,
  },
  {
    title: "PAYMENT MODE",
    dataIndex: "paymentMode",
    key: "paymentMode",
    width: 173,
  },
  {
    title: "NDR TYPE",
    dataIndex: "ndrType",
    key: "ndrType",
    width: 150,
  },
  {
    title: "ATTEMPT COUNT",
    key: "attemptCount",
    render: (_, record) => (
      <span className="text-labels text-sm leading-5">
        {record.attemptCount} attempts
      </span>
    ),
    width: 135,
  },
  {
    title: "LAST UPDATED",
    dataIndex: "lastUpdated",
    key: "lastUpdated",
    width: 164,
  },
  {
    key: "proofs",
    dataIndex: "proofs",
    rowFooter: true,
    cardStyles: "border-t border-dashed border-border-default px-4 py-3 bg-white",
    render: (_value, record) => {
      const row = record as any;
      const hasProofs = row.proofs && row.proofs.length > 0;
      const hasActions = row.actions && row.actions.length > 0;

      if (!hasProofs && !hasActions) return null;

      return (
        <div className="flex items-center justify-between w-full">
          {hasProofs ? (
            <div className="flex items-center gap-4">
              <span className="font-medium text-sm leading-5 text-default_black">
                Proofs
              </span>
              <div className="flex gap-2">
                {row.proofs!.map(
                  (proof: { label: string; type: string }) => (
                    <ProofBadge
                      key={proof.type}
                      label={proof.label}
                      type={proof.type}
                    />
                  )
                )}
              </div>
            </div>
          ) : (
            <div />
          )}
          {hasActions && (
            <div className="flex gap-2 items-center">
              {row.actions!.map((action) =>
                action.iconOnly ? (
                  <Button
                    key={action.type}
                    variant={action.variant || "outline"}
                    size="sm"
                    className="!h-[38px] !w-[38px] !min-w-[38px] !p-0"
                    icon={action.icon}
                    borderColor={action.borderColor}
                    backgroundColor={action.backgroundColor}
                    textColor={action.textColor}
                    radius="8px"
                    onClick={action.onClick}
                  />
                ) : (
                  <Button
                    key={action.type}
                    variant={action.variant || "primary"}
                    size="sm"
                    className="!h-[38px] !py-[9px] !px-4"
                    icon={action.icon}
                    iconPosition="left"
                    backgroundColor={action.backgroundColor}
                    borderColor={action.borderColor}
                    textColor={action.textColor}
                    radius="6px"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      );
    },
  },
];

const ReattemptIcon = () => (
  <FontAwesomeIcon icon={faRotateRight} className="w-4 h-4 text-white" />
);

const ReturnIcon = () => (
  <FontAwesomeIcon icon={faReply} className="w-4 h-4 text-default_black" />
);

const MoreIcon = () => (
  <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4 text-default_black" />
);

const rowFooterData: any[] = [
  {
    key: "1",
    orderId: "9023018",
    awbNo: "892342014124012",
    productName: "Blue T-shirt",
    extraItems: 2,
    price: "\u20B9 2,200",
    paymentMode: "Prepaid",
    ndrType: "Consignee Unavailable",
    attemptCount: 2,
    lastUpdated: "8 Jan | 12:40 PM",
    proofs: [
      { label: "Whatsapp", type: "whatsapp" },
      { label: "Call Recording", type: "call" },
      { label: "Geofence", type: "geofence" },
    ],
    actions: [
      {
        type: "reattempt",
        label: "Reattempt",
        icon: <ReattemptIcon />,
        variant: "primary",
        backgroundColor: "#1F222E",
      },
      {
        type: "return",
        label: "Return",
        icon: <ReturnIcon />,
        variant: "outline",
        borderColor: "#E0E3EB",
        textColor: "#3D445C",
      },
      {
        type: "more",
        icon: <MoreIcon />,
        variant: "outline",
        borderColor: "#E0E3EB",
        iconOnly: true,
      },
    ],
  },
  {
    key: "2",
    orderId: "9023019",
    awbNo: "892342014124013",
    productName: "Red Hoodie",
    extraItems: 1,
    price: "\u20B9 3,500",
    paymentMode: "COD",
    ndrType: "Address Issue",
    attemptCount: 1,
    lastUpdated: "9 Jan | 10:15 AM",
    proofs: [
      { label: "Whatsapp", type: "whatsapp" },
      { label: "Geofence", type: "geofence" },
    ],
    actions: [
      {
        type: "reattempt",
        label: "Reattempt",
        icon: <ReattemptIcon />,
        variant: "primary",
        backgroundColor: "#1F222E",
      },
      {
        type: "more",
        icon: <MoreIcon />,
        variant: "outline",
        borderColor: "#E0E3EB",
        iconOnly: true,
      },
    ],
  },
  {
    key: "3",
    orderId: "9023020",
    awbNo: "892342014124014",
    productName: "Black Jeans",
    extraItems: 0,
    price: "\u20B9 1,800",
    paymentMode: "Prepaid",
    ndrType: "Customer Refused",
    attemptCount: 3,
    lastUpdated: "10 Jan | 3:25 PM",
    proofs: [{ label: "Call Recording", type: "call" }],
  },
];

const proofFaIcons = {
  whatsapp: faComment,
  call: faPhone,
  geofence: faLocationDot,
};

const ProofBadge = ({ label, type }: { label: string; type: string }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      radius="14px"
      borderColor="#9d9d9d"
      textColor="#474747"
      backgroundColor="#fff"
      className="!h-7 !p-0 !pr-2 !gap-1 !justify-start !text-xs !font-medium !border-[0.5px] !overflow-hidden"
    >
      <span className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 bg-proof-icon">
        <FontAwesomeIcon
          icon={proofFaIcons[type as keyof typeof proofFaIcons] || faComment}
          className="w-3 h-3"
        />
      </span>
      <span className="text-xs font-medium leading-4 text-proof_text">
        {label}
      </span>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className="w-3 h-3 text-proof_text"
      />
    </Button>
  );
};

// ============================================
// Card Variant Stories
// ============================================

// NDR Card Style — full NDR design with proofs footer, rendered as cards
export const WithRowFooter: Story = {
  render: () => (
    <div className="bg-default_background p-4">
      <Table<any>
        variant="card"
        columns={rowFooterColumns}
        dataSource={rowFooterData}
        size="medium"
        pagination={false}
        rowSelection={{ type: "checkbox" }}
      />
    </div>
  ),
};
