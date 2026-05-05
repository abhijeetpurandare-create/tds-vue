import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
// Import directly from local source
import Pagination from '../../../../../packages/atoms/src/components/Pagination';

const meta: Meta<typeof Pagination> = {
  title: "Atoms/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "small"],
      description: "The size of the pagination",
      defaultValue: "default",
    },
    disabled: {
      control: "boolean",
      description: "Whether the pagination is disabled",
      defaultValue: false,
    },
    showSizeChanger: {
      control: "boolean",
      description: "Whether to show page size changer",
      defaultValue: false,
    },
    showQuickJumper: {
      control: "boolean",
      description: "Whether to show quick jumper",
      defaultValue: false,
    },
    showTotal: {
      control: "boolean",
      description: "Whether to show total count",
      defaultValue: false,
    },
    simple: {
      control: "boolean",
      description: "Whether to use simple mode",
      defaultValue: false,
    },
    hideOnSinglePage: {
      control: "boolean",
      description: "Whether to hide pagination on single page",
      defaultValue: false,
    },
    cursorBased: {
      control: "boolean",
      description: "Whether to use cursor-based pagination",
      defaultValue: false,
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment of pagination",
      defaultValue: "end",
    },
    total: {
      control: "number",
      description: "Total number of items",
      defaultValue: 100,
    },
    pageSize: {
      control: "number",
      description: "Number of items per page",
      defaultValue: 10,
    },
    current: {
      control: "number",
      description: "Current page number",
      defaultValue: 1,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Basic Pagination Examples
export const Basic: Story = {
  args: {
    total: 100,
    pageSize: 10,
    current: 1,
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <div className="flex flex-col gap-4">
          <Pagination 
            {...args} 
            current={current}
            onChange={(page) => setCurrent(page || 1)}
            size="default"
          />
          <Pagination 
            {...args} 
            current={current}
            onChange={(page) => setCurrent(page || 1)}
            size="small"
          />
        </div>
      </div>
    );
  },
};

// Pagination with Total
export const WithTotal: Story = {
  args: {
    total: 100,
    pageSize: 10,
    current: 1,
    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          onChange={(page) => setCurrent(page || 1)}
        />
      </div>
    );
  },
};

// Pagination with Size Changer
export const WithSizeChanger: Story = {
  args: {
    total: 100,
    pageSize: 10,
    current: 1,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrent(page || 1);
            if (size) setPageSize(size);
          }}
          onShowSizeChange={(current, size) => {
            setCurrent(current);
            setPageSize(size);
          }}
        />
      </div>
    );
  },
};

// Pagination with Total and Size Changer
export const WithTotalAndSizeChanger: Story = {
  args: {
    total: 100,
    pageSize: 10,
    current: 1,
    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrent(page || 1);
            if (size) setPageSize(size);
          }}
          onShowSizeChange={(current, size) => {
            setCurrent(current);
            setPageSize(size);
          }}
        />
      </div>
    );
  },
};

// Pagination with Quick Jumper
export const WithQuickJumper: Story = {
  args: {
    total: 100,
    pageSize: 10,
    current: 1,
    showQuickJumper: true,
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          onChange={(page) => setCurrent(page || 1)}
        />
      </div>
    );
  },
};

// Simple Mode Pagination
export const SimpleMode: Story = {
  args: {
    total: 100,
    pageSize: 10,
    current: 1,
    simple: true,
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          onChange={(page) => setCurrent(page || 1)}
        />
      </div>
    );
  },
};

// Cursor-Based Pagination
export const CursorBased: Story = {
  args: {
    current: 1,
    cursorBased: true,
    hasNextPage: true,
    hasPreviousPage: false,
    showTotal: (total, range) => `Page ${range[0]} of ${total} items`,
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onNext={() => {
            setCurrent(current + 1);
            setHasNextPage(current + 1 < 5);
            setHasPreviousPage(true);
          }}
          onPrevious={() => {
            setCurrent(current - 1);
            setHasPreviousPage(current - 1 > 1);
            setHasNextPage(true);
          }}
          showTotal={(total, range) => `Page ${current}`}
        />
      </div>
    );
  },
};

// Cursor-Based with Size Changer
export const CursorBasedWithSizeChanger: Story = {
  args: {
    current: 1,
    cursorBased: true,
    hasNextPage: true,
    hasPreviousPage: false,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          pageSize={pageSize}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onNext={() => {
            setCurrent(current + 1);
            setHasNextPage(current + 1 < 5);
            setHasPreviousPage(true);
          }}
          onPrevious={() => {
            setCurrent(current - 1);
            setHasPreviousPage(current - 1 > 1);
            setHasNextPage(true);
          }}
          onShowSizeChange={(current, size) => {
            setPageSize(size);
          }}
        />
      </div>
    );
  },
};

// Pagination States
export const States: Story = {
  args: {
    total: 100,
    pageSize: 10,
    current: 1,
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          onChange={(page) => setCurrent(page || 1)}
        />
        <Pagination 
          {...args} 
          current={current}
          onChange={(page) => setCurrent(page || 1)}
          disabled
        />
      </div>
    );
  },
};

// Pagination Alignment
export const Alignment: Story = {
  args: {
    total: 100,
    pageSize: 10,
    current: 1,
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          onChange={(page) => setCurrent(page || 1)}
          align="start"
        />
        <Pagination 
          {...args} 
          current={current}
          onChange={(page) => setCurrent(page || 1)}
          align="center"
        />
        <Pagination 
          {...args} 
          current={current}
          onChange={(page) => setCurrent(page || 1)}
          align="end"
        />
      </div>
    );
  },
};

// Large Dataset Pagination
export const LargeDataset: Story = {
  args: {
    total: 1000,
    pageSize: 20,
    current: 1,
    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100, 200],
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrent(page || 1);
            if (size) setPageSize(size);
          }}
          onShowSizeChange={(current, size) => {
            setCurrent(current);
            setPageSize(size);
          }}
        />
      </div>
    );
  },
};

// All Features Combined
export const AllFeatures: Story = {
  args: {
    total: 500,
    pageSize: 10,
    current: 1,
    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [10, 20, 50, 100],
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrent(page || 1);
            if (size) setPageSize(size);
          }}
          onShowSizeChange={(current, size) => {
            setCurrent(current);
            setPageSize(size);
          }}
        />
      </div>
    );
  },
};

// Hide on Single Page
export const HideOnSinglePage: Story = {
  args: {
    total: 5,
    pageSize: 10,
    current: 1,
    hideOnSinglePage: true,
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <p className="text-sm text-gray-600">
          Pagination is hidden when total items is less than page size
        </p>
        <Pagination 
          {...args} 
          current={current}
          onChange={(page) => setCurrent(page || 1)}
        />
      </div>
    );
  },
};

// Small Size with All Features
export const SmallSize: Story = {
  args: {
    total: 100,
    pageSize: 10,
    current: 1,
    size: "small",
    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [10, 20, 50, 100],
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <Pagination 
          {...args} 
          current={current}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrent(page || 1);
            if (size) setPageSize(size);
          }}
          onShowSizeChange={(current, size) => {
            setCurrent(current);
            setPageSize(size);
          }}
        />
      </div>
    );
  },
};
