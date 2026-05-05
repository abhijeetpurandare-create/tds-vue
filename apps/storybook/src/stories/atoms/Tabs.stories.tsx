import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabPane } from "@delhivery/tarmac";

const meta: Meta<typeof Tabs> = {
  title: "Atoms/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["line", "card", "editable-card"],
      description: "The type of tabs",
      defaultValue: "line",
    },
    tabPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "The position of tabs",
      defaultValue: "top",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of tabs",
      defaultValue: "md",
    },
    centered: {
      control: "boolean",
      description: "Whether tabs are centered",
      defaultValue: false,
    },
    animated: {
      control: "boolean",
      description: "Whether to animate tab transitions",
      defaultValue: true,
    },
    hideAdd: {
      control: "boolean",
      description: "Whether to hide add button in editable-card type",
      defaultValue: false,
    },
    destroyInactiveTabPane: {
      control: "boolean",
      description: "Whether to destroy inactive tab panes",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Basic Tabs Examples
export const Basic: Story = {
  args: {
    type: "line",
    size: "md",
    items: [
      {
        key: "1",
        label: "Tab 1",
        children: <div className="p-4">Content of Tab Pane 1</div>,
      },
      {
        key: "2",
        label: "Tab 2",
        children: <div className="p-4">Content of Tab Pane 2</div>,
      },
      {
        key: "3",
        label: "Tab 3",
        children: <div className="p-4">Content of Tab Pane 3</div>,
      },
    ],
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <Tabs {...args} />
    </div>
  ),
};

// Tabs Types
export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Line Type</h3>
        <Tabs
          type="line"
          items={[
            {
              key: "1",
              label: "Tab 1",
              children: <div className="p-4">Content of Line Tab 1</div>,
            },
            {
              key: "2",
              label: "Tab 2",
              children: <div className="p-4">Content of Line Tab 2</div>,
            },
            {
              key: "3",
              label: "Tab 3",
              children: <div className="p-4">Content of Line Tab 3</div>,
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Card Type</h3>
        <Tabs
          type="card"
          items={[
            {
              key: "1",
              label: "Tab 1",
              children: <div className="p-4">Content of Card Tab 1</div>,
            },
            {
              key: "2",
              label: "Tab 2",
              children: <div className="p-4">Content of Card Tab 2</div>,
            },
            {
              key: "3",
              label: "Tab 3",
              children: <div className="p-4">Content of Card Tab 3</div>,
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Editable Card Type
        </h3>
        <Tabs
          type="editable-card"
          items={[
            {
              key: "1",
              label: "Tab 1",
              children: <div className="p-4">Content of Editable Tab 1</div>,
            },
            {
              key: "2",
              label: "Tab 2",
              children: <div className="p-4">Content of Editable Tab 2</div>,
            },
            {
              key: "3",
              label: "Tab 3",
              children: <div className="p-4">Content of Editable Tab 3</div>,
            },
          ]}
          onEdit={(targetKey, action) => {
            console.log("Edit action:", action, "Target key:", targetKey);
          }}
        />
      </div>
    </div>
  ),
};

// Tabs Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Small Size</h3>
        <Tabs
          size="sm"
          items={[
            {
              key: "1",
              label: "Tab 1",
              children: <div className="p-4">Small Tab Content 1</div>,
            },
            {
              key: "2",
              label: "Tab 2",
              children: <div className="p-4">Small Tab Content 2</div>,
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Medium Size</h3>
        <Tabs
          size="md"
          items={[
            {
              key: "1",
              label: "Tab 1",
              children: <div className="p-4">Medium Tab Content 1</div>,
            },
            {
              key: "2",
              label: "Tab 2",
              children: <div className="p-4">Medium Tab Content 2</div>,
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Large Size</h3>
        <Tabs
          size="lg"
          items={[
            {
              key: "1",
              label: "Tab 1",
              children: <div className="p-4">Large Tab Content 1</div>,
            },
            {
              key: "2",
              label: "Tab 2",
              children: <div className="p-4">Large Tab Content 2</div>,
            },
          ]}
        />
      </div>
    </div>
  ),
};

// Tab Positions
export const Positions: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Top Position</h3>
        <Tabs
          tabPosition="top"
          items={[
            {
              key: "1",
              label: "Tab 1",
              children: <div className="p-4">Top Position Content 1</div>,
            },
            {
              key: "2",
              label: "Tab 2",
              children: <div className="p-4">Top Position Content 2</div>,
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Bottom Position
        </h3>
        <Tabs
          tabPosition="bottom"
          items={[
            {
              key: "1",
              label: "Tab 1",
              children: <div className="p-4">Bottom Position Content 1</div>,
            },
            {
              key: "2",
              label: "Tab 2",
              children: <div className="p-4">Bottom Position Content 2</div>,
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Left Position</h3>
        <div className="h-64">
          <Tabs
            tabPosition="left"
            items={[
              {
                key: "1",
                label: "Tab 1",
                children: <div className="p-4">Left Position Content 1</div>,
              },
              {
                key: "2",
                label: "Tab 2",
                children: <div className="p-4">Left Position Content 2</div>,
              },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Right Position</h3>
        <div className="h-64">
          <Tabs
            tabPosition="right"
            items={[
              {
                key: "1",
                label: "Tab 1",
                children: <div className="p-4">Right Position Content 1</div>,
              },
              {
                key: "2",
                label: "Tab 2",
                children: <div className="p-4">Right Position Content 2</div>,
              },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

// Tabs with Icons
export const WithIcons: Story = {
  render: () => {
    const HomeIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );

    const UserIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );

    const SettingsIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" />
      </svg>
    );

    return (
      <div className="w-full max-w-4xl">
        <Tabs
          items={[
            {
              key: "1",
              label: "Home",
              icon: <HomeIcon />,
              children: <div className="p-4">Home Content</div>,
            },
            {
              key: "2",
              label: "Profile",
              icon: <UserIcon />,
              children: <div className="p-4">Profile Content</div>,
            },
            {
              key: "3",
              label: "Settings",
              icon: <SettingsIcon />,
              children: <div className="p-4">Settings Content</div>,
            },
          ]}
        />
      </div>
    );
  },
};

// Disabled Tabs
export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs
        items={[
          {
            key: "1",
            label: "Tab 1",
            children: <div className="p-4">Content of Tab 1</div>,
          },
          {
            key: "2",
            label: "Tab 2 (Disabled)",
            disabled: true,
            children: <div className="p-4">This tab is disabled</div>,
          },
          {
            key: "3",
            label: "Tab 3",
            children: <div className="p-4">Content of Tab 3</div>,
          },
        ]}
      />
    </div>
  ),
};

// Editable Tabs with Add/Remove
export const Editable: Story = {
  render: () => {
    const [items, setItems] = useState([
      {
        key: "1",
        label: "Tab 1",
        children: <div className="p-4">Content of Tab 1</div>,
      },
      {
        key: "2",
        label: "Tab 2",
        children: <div className="p-4">Content of Tab 2</div>,
      },
      {
        key: "3",
        label: "Tab 3",
        children: <div className="p-4">Content of Tab 3</div>,
      },
    ]);

    const handleEdit = (
      targetKey: string | number | React.MouseEvent | React.KeyboardEvent,
      action: "add" | "remove"
    ) => {
      if (action === "add") {
        const newKey = String(items.length + 1);
        setItems([
          ...items,
          {
            key: newKey,
            label: `Tab ${newKey}`,
            children: <div className="p-4">Content of Tab {newKey}</div>,
          },
        ]);
      } else if (action === "remove") {
        setItems(items.filter((item) => item.key !== targetKey));
      }
    };

    return (
      <div className="w-full max-w-4xl">
        <Tabs
          type="editable-card"
          items={items}
          onEdit={handleEdit}
          onChange={(key) => console.log("Active tab:", key)}
        />
      </div>
    );
  },
};

// Centered Tabs
export const Centered: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs
        centered
        items={[
          {
            key: "1",
            label: "Tab 1",
            children: <div className="p-4">Centered Tab Content 1</div>,
          },
          {
            key: "2",
            label: "Tab 2",
            children: <div className="p-4">Centered Tab Content 2</div>,
          },
          {
            key: "3",
            label: "Tab 3",
            children: <div className="p-4">Centered Tab Content 3</div>,
          },
        ]}
      />
    </div>
  ),
};

// Tabs with Extra Content
export const WithExtraContent: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs
        tabBarExtraContent={
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Extra Action
          </button>
        }
        items={[
          {
            key: "1",
            label: "Tab 1",
            children: <div className="p-4">Content of Tab 1</div>,
          },
          {
            key: "2",
            label: "Tab 2",
            children: <div className="p-4">Content of Tab 2</div>,
          },
        ]}
      />
    </div>
  ),
};

// Tabs with Left and Right Extra Content
export const WithLeftRightExtraContent: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs
        tabBarExtraContent={{
          left: <span className="text-sm text-gray-500">Left Content</span>,
          right: (
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Right Action
            </button>
          ),
        }}
        items={[
          {
            key: "1",
            label: "Tab 1",
            children: <div className="p-4">Content of Tab 1</div>,
          },
          {
            key: "2",
            label: "Tab 2",
            children: <div className="p-4">Content of Tab 2</div>,
          },
        ]}
      />
    </div>
  ),
};

// Tabs with TabPane (Children API)
export const WithTabPane: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs defaultActiveKey="1">
        <TabPane tabKey="1" tab="Tab 1">
          <div className="p-4">Content of TabPane 1</div>
        </TabPane>
        <TabPane tabKey="2" tab="Tab 2">
          <div className="p-4">Content of TabPane 2</div>
        </TabPane>
        <TabPane tabKey="3" tab="Tab 3">
          <div className="p-4">Content of TabPane 3</div>
        </TabPane>
      </Tabs>
    </div>
  ),
};

// Scrollable Tabs
export const Scrollable: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs
        items={Array.from({ length: 10 }, (_, i) => ({
          key: String(i + 1),
          label: `Tab ${i + 1}`,
          children: <div className="p-4">Content of Tab {i + 1}</div>,
        }))}
      />
    </div>
  ),
};

// Controlled Tabs
export const Controlled: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState("1");

    return (
      <div className="w-full max-w-4xl">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Active Tab: {activeKey}
          </p>
          <button
            onClick={() => setActiveKey("2")}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Switch to Tab 2
          </button>
        </div>
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={[
            {
              key: "1",
              label: "Tab 1",
              children: <div className="p-4">Controlled Tab Content 1</div>,
            },
            {
              key: "2",
              label: "Tab 2",
              children: <div className="p-4">Controlled Tab Content 2</div>,
            },
            {
              key: "3",
              label: "Tab 3",
              children: <div className="p-4">Controlled Tab Content 3</div>,
            },
          ]}
        />
      </div>
    );
  },
};

// Tabs with Force Render
export const WithForceRender: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs
        items={[
          {
            key: "1",
            label: "Tab 1",
            forceRender: true,
            children: <div className="p-4">This tab is force rendered</div>,
          },
          {
            key: "2",
            label: "Tab 2",
            children: <div className="p-4">Normal tab content</div>,
          },
        ]}
      />
    </div>
  ),
};

// Tabs with Destroy Inactive Tab Pane
export const DestroyInactive: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs
        destroyInactiveTabPane
        items={[
          {
            key: "1",
            label: "Tab 1",
            children: <div className="p-4">Content 1 (will be destroyed when inactive)</div>,
          },
          {
            key: "2",
            label: "Tab 2",
            children: <div className="p-4">Content 2 (will be destroyed when inactive)</div>,
          },
        ]}
      />
    </div>
  ),
};
