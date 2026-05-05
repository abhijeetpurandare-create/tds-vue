import React, {useState} from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import Collapse from "../../../../../packages/atoms/src/components/Collapse";
import type {
  CollapseProps,
  CollapsePanelProps,
} from "../../../../../packages/atoms/src/components/Collapse";
// Button component removed due to type issues - using HTML button instead

// Icon components for the collapse panels - matching Figma design
const BadgeCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM7 11.5L4.5 9l1-1L7 9.5l3.5-3.5 1 1L7 11.5z" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
  </svg>
);

// Mock data for stories - matching Figma design
const basicPanelsData: CollapsePanelProps[] = [
  {
    key: "1",
    title: (
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <BadgeCheckIcon />
        <span>Activate your account</span>
      </div>
    ),
    content: (
      <p>
        It's a quick step to unlock all our features. Click the activate button
        to get started with your account setup.
      </p>
    ),
  },
  {
    key: "2",
    title: (
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <UserIcon />
        <span>Complete your profile</span>
      </div>
    ),
    content: (
      <div>
        <p>Add your personal information to complete your profile:</p>
        <ul style={{marginLeft: "20px", marginTop: "10px"}}>
          <li>Full name and contact details</li>
          <li>Profile picture</li>
          <li>Bio and preferences</li>
        </ul>
      </div>
    ),
  },
  {
    key: "3",
    title: (
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <SettingsIcon />
        <span>Configure settings</span>
      </div>
    ),
    content: (
      <p>
        Customize your experience by configuring notification preferences,
        privacy settings, and other options to suit your needs.
      </p>
    ),
  },
];

const expandedPanelsData: CollapsePanelProps[] = [
  {
    key: "1",
    title: (
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <BadgeCheckIcon />
        <span>Activate your account</span>
      </div>
    ),
    extra: (
      <button style={{
        padding: "8px 16px",
        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}>
        Activate
      </button>
    ),
    content: (
      <div>
        <p>Follow these steps to activate your account:</p>
        <ol style={{marginLeft: "20px", marginTop: "8px"}}>
          <li>Verify your email address</li>
          <li>Set up two-factor authentication</li>
          <li>Complete your profile information</li>
          <li>Accept terms and conditions</li>
        </ol>
      </div>
    ),
  },
];

// Header-only panels data
const headerOnlyPanelsData: CollapsePanelProps[] = [
  {
    key: "1",
    title: (
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <BadgeCheckIcon />
        <span>Quick Action Item</span>
      </div>
    ),
    extra: (
      <button style={{
        padding: "6px 12px",
        backgroundColor: "#10b981",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px"
      }}>
        Execute
      </button>
    ),
    headerOnly: true,
  },
  {
    key: "2",
    title: (
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <UserIcon />
        <span>Profile Status</span>
      </div>
    ),
    extra: (
      <span style={{
        padding: "4px 8px",
        backgroundColor: "#f59e0b",
        color: "white",
        borderRadius: "12px",
        fontSize: "12px"
      }}>
        Pending
      </span>
    ),
    headerOnly: true,
  },
  {
    key: "3",
    title: (
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <SettingsIcon />
        <span>System Settings</span>
      </div>
    ),
    extra: (
      <button style={{
        padding: "6px 12px",
        backgroundColor: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px"
      }}>
        Configure
      </button>
    ),
    headerOnly: true,
  },
];

const meta: Meta<typeof Collapse> = {
  title: "Atoms/Collapse",
  component: Collapse,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A Collapse component for creating collapsible content panels. Supports accordion mode, custom icons, different sizes, and comprehensive theming options. Based on ant-design API with enhanced styling capabilities.",
      },
    },
  },
  // argTypes removed due to type conflicts
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapse>;

// Interactive Collapse component for stories
const InteractiveCollapse: React.FC<CollapseProps> = (props) => {
  const [activeKey, setActiveKey] = useState<string | string[]>(
    props.defaultActiveKey || []
  );

  const handleChange = (key: string | string[]) => {
    setActiveKey(key);
    if (props.onChange) {
      props.onChange(key);
    }
  };

  return <Collapse {...props} activeKey={activeKey} onChange={handleChange} />;
};

// Basic Collapse Examples
export const Default: Story = {
  render: () => (
    <InteractiveCollapse
      items={[
        {
          key: "1",
          title: "Default Panel",
          content: <div className="flex align-ite justify-between"><span>This is a simple default panel.</span><button style={{padding: "8px 16px", backgroundColor: "black", color: "white", border: "none", borderRadius: "4px", cursor: "pointer"}}>Activate</button></div>,
        },
      ]}
      defaultActiveKey={["1"]}
    />
  ),
};

export const Accordion: Story = {
  render: () => (
    <InteractiveCollapse
      items={basicPanelsData}
      accordion={true}
      defaultActiveKey="1"
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <InteractiveCollapse
          items={[
            {
              key: "1",
              title: "Activate your account",
              content: <p>It's a quick step to unlock all our features</p>,
            },
          ]}
          size="small"
          defaultActiveKey={["1"]}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Size (Default)</h3>
        <InteractiveCollapse
          items={[
            {
              key: "1",
              title: "Activate your account",
              content: <p>It's a quick step to unlock all our features</p>,
            },
          ]}
          size="medium"
          defaultActiveKey={["1"]}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size</h3>
        <InteractiveCollapse
          items={[
            {
              key: "1",
              title: "Activate your account",
              content: <p>It's a quick step to unlock all our features</p>,
            },
          ]}
          size="large"
          defaultActiveKey={["1"]}
        />
      </div>
    </div>
  ),
};

export const ExpandIconPosition: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Icon at Start</h3>
        <InteractiveCollapse
          items={basicPanelsData}
          expandIconPosition="start"
          defaultActiveKey={["1"]}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Icon at End (Default)</h3>
        <InteractiveCollapse
          items={basicPanelsData}
          expandIconPosition="end"
          defaultActiveKey={["1"]}
        />
      </div>
    </div>
  ),
};

export const CollapsibleBehavior: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Header Collapsible (Default)
        </h3>
        <InteractiveCollapse
          items={basicPanelsData}
          collapsible="header"
          defaultActiveKey={["1"]}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Only Collapsible</h3>
        <InteractiveCollapse
          items={basicPanelsData}
          collapsible="icon"
          defaultActiveKey={["1"]}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Disabled Collapsible (cursor: not-allowed)</h3>
        <InteractiveCollapse
          items={basicPanelsData}
          collapsible="disabled"
          defaultActiveKey={["1"]}
        />
      </div>
    </div>
  ),
};

export const WithExtraContent: Story = {
  render: () => (
    <InteractiveCollapse
      items={expandedPanelsData}
      defaultActiveKey={["1"]}
    />
  ),
};

export const Borderless: Story = {
  render: () => (
    <InteractiveCollapse
      items={basicPanelsData}
      bordered={false}
      defaultActiveKey={["1"]}
    />
  ),
};

export const Ghost: Story = {
  render: () => (
    <InteractiveCollapse
      items={basicPanelsData}
      ghost={true}
      defaultActiveKey={["1"]}
    />
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "8px" }}>
      <h3 style={{ marginBottom: "16px", color: "#1e293b" }}>Vibrant Custom Styling</h3>
      <InteractiveCollapse
        items={basicPanelsData}
        defaultActiveKey={["1"]}
        bgColor="#fef3c7"
        bordered={true}
        style={{
          border: "2px solid #f59e0b",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
      />
    </div>
  ),
};

export const NoArrows: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: "16px" }}>Collapse without arrows</h3>
      <InteractiveCollapse
        items={basicPanelsData}
        defaultActiveKey={["1"]}
        expandIcon={null}
      />
    </div>
  ),
};

export const CustomExpandIcon: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: "16px" }}>Custom expand icon (blue arrow)</h3>
      <InteractiveCollapse
        items={basicPanelsData}
        defaultActiveKey={["1"]}
        expandIcon={
          <span style={{ fontSize: "16px", color: "#1890ff" }}>
            ▶
          </span>
        }
      />
    </div>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: "16px", color: "#1e293b" }}>Header-Only Panels (No Dropdown Content)</h3>
      <p style={{ marginBottom: "16px", color: "#64748b", fontSize: "14px" }}>
        These panels only show headers with icons that change state and action buttons. No content dropdown appears.
      </p>
      <InteractiveCollapse
        items={headerOnlyPanelsData}
        defaultActiveKey={["1", "2"]}
      />
    </div>
  ),
};

export const NestedCollapse: Story = {
  render: () => (
    <InteractiveCollapse
      items={[
        {
          key: "1",
          title: "Parent Panel 1",
          content: (
            <div>
              <p style={{marginBottom: "16px"}}>
                This panel contains a nested collapse:
              </p>
              <InteractiveCollapse
                items={[
                  {
                    key: "nested-1",
                    title: "Nested Panel 1",
                    content: <p>Nested content 1</p>,
                  },
                  {
                    key: "nested-2",
                    title: "Nested Panel 2",
                    content: <p>Nested content 2</p>,
                  },
                ]}
                size="small"
                bordered={false}
              />
            </div>
          ),
        },
        {
          key: "2",
          title: "Parent Panel 2",
          content: <p>Regular panel content</p>,
        },
      ]}
      defaultActiveKey={["1"]}
    />
  ),
};

// Theme Examples
export const LightTheme: Story = {
  render: () => (
    <InteractiveCollapse
      items={basicPanelsData}
      defaultActiveKey={["1"]}
      bgColor="#FFFFFF"
    />
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div style={{ 
      backgroundColor: "#0f172a", 
      padding: "24px", 
      borderRadius: "12px",
      border: "1px solid #334155"
    }}>
      <h3 style={{ 
        color: "#f1f5f9", 
        marginBottom: "16px",
        fontSize: "18px",
        fontWeight: "600"
      }}>
        Dark Theme Collapse
      </h3>
      <div style={{
        backgroundColor: "#1e293b",
        borderRadius: "8px",
        border: "1px solid #475569"
      }}>
        <InteractiveCollapse
          items={basicPanelsData.map(item => ({
            ...item,
                         title: (
               <div style={{display: 'flex', alignItems: 'center', gap: 8, color: "#f1f5f9"}}>
                 {item.title as React.ReactNode}
               </div>
             ),
             content: (
               <div style={{color: "#cbd5e1"}}>
                 {item.content as React.ReactNode}
               </div>
             )
          }))}
          defaultActiveKey={["1"]}
          bgColor="#1e293b"
          bordered={false}
          style={{
            color: "#f1f5f9"
          }}
        />
      </div>
    </div>
  ),
};

// Children API Support (like Ant Design)
export const WithChildren: Story = {
  render: () => (
    <InteractiveCollapse defaultActiveKey={["1"]}>
      <div key="1" title="Panel 1">
        <p>Content of Panel 1</p>
      </div>
      <div key="2" title="Panel 2">
        <p>Content of Panel 2</p>
      </div>
      <div key="3" title="Panel 3">
        <p>Content of Panel 3</p>
      </div>
    </InteractiveCollapse>
  ),
};

// How to Use Documentation
export const HowToUse: Story = {
  render: () => (
    <div style={{padding: 24}}>
      <h2 style={{fontWeight: 700, fontSize: 24, marginBottom: 12}}>How to Use Collapse Component</h2>
      <p style={{color: '#555', marginBottom: 16}}>
        The Collapse component provides a way to create collapsible content panels with extensive customization options.
      </p>
      
      <h3 style={{fontWeight: 600, fontSize: 20, marginBottom: 8}}>Basic Usage</h3>
      <pre style={{background: '#f5f5f5', padding: 12, borderRadius: 6, marginBottom: 12}}>
{`import { Collapse } from '@delhivery/tarmac';

const items = [
  {
    key: '1',
    title: 'Panel 1',
    content: <p>Panel content 1</p>,
  },
  {
    key: '2',
    title: 'Panel 2',
    content: <p>Panel content 2</p>,
  },
];

<Collapse items={items} defaultActiveKey={['1']} />`}
      </pre>
      <InteractiveCollapse
        items={[
          {
            key: "1",
            title: "Panel 1",
            content: <p>Panel content 1</p>,
          },
        ]}
        defaultActiveKey={["1"]}
      />
      <h3 style={{fontWeight: 600, fontSize: 20, margin: '24px 0 8px'}}>Using Children (Ant Design Style)</h3>
      <pre style={{background: '#f5f5f5', padding: 12, borderRadius: 6, marginBottom: 12}}>
{`<Collapse defaultActiveKey={['1']}>
  <div key="1" title="Panel 1">
    <p>Content of Panel 1</p>
  </div>
  <div key="2" title="Panel 2">
    <p>Content of Panel 2</p>
  </div>
</Collapse>`}
      </pre>
      <InteractiveCollapse defaultActiveKey={["1"]}>
        <div key="1" title="Panel 1">
          <p>Content of Panel 1</p>
        </div>
        <div key="2" title="Panel 2">
          <p>Content of Panel 2</p>
        </div>
      </InteractiveCollapse>
      
      <h3 style={{fontWeight: 600, fontSize: 20, margin: '24px 0 8px'}}>Header-Only Panels</h3>
      <pre style={{background: '#f5f5f5', padding: 12, borderRadius: 6, marginBottom: 12}}>
{`const items = [
  {
    key: '1',
    title: 'Quick Action',
    extra: <button>Execute</button>,
    headerOnly: true, // No content dropdown
  },
];`}
      </pre>
      <InteractiveCollapse
        items={[
          {
            key: "1",
            title: "Quick Action Item",
            extra: <button style={{padding: "6px 12px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px"}}>Execute</button>,
            headerOnly: true,
          },
        ]}
        defaultActiveKey={["1"]}
      />
      
      <h3 style={{fontWeight: 600, fontSize: 20, margin: '24px 0 8px'}}>Features</h3>
      <ul style={{marginLeft: 20, marginBottom: 16}}>
        <li>Flexible <strong>title</strong> and <strong>content</strong>: Pass any ReactNode (text, div, icon, etc.)</li>
        <li>Custom <strong>extra</strong> content (e.g., buttons) in the header</li>
        <li>Accordion and multi-panel support</li>
        <li>Children API support like Ant Design</li>
        <li><strong>Header-only</strong> panels for action items without content</li>
        <li>Customizable styling and theming</li>
      </ul>
      
      <h3 style={{fontWeight: 600, fontSize: 20, marginBottom: 8}}>Example with Icon and Button</h3>
      <InteractiveCollapse
        items={[
          {
            key: "1",
            title: (
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <BadgeCheckIcon />
                <span>Account Setup</span>
              </div>
            ),
            extra: <button style={{padding: "8px 16px", backgroundColor: "black", color: "white", border: "none", borderRadius: "4px", cursor: "pointer"}}>Activate</button>,
            content: <p>Complete your account setup to unlock all features.</p>,
          },
        ]}
        defaultActiveKey={["1"]}
      />
      
      <h3 style={{fontWeight: 600, fontSize: 20, margin: '24px 0 8px'}}>API Highlights</h3>
      <ul style={{marginLeft: 20, marginBottom: 16}}>
        <li><strong>items</strong>: <code>CollapsePanelProps[]</code> - Array of panel configs</li>
        <li><strong>children</strong>: <code>ReactNode</code> - Child elements (alternative to items)</li>
        <li><strong>title</strong>: <code>ReactNode</code> - Panel header (text, icon, div, etc.)</li>
        <li><strong>content</strong>: <code>ReactNode</code> - Panel content (text, div, etc.)</li>
        <li><strong>extra</strong>: <code>ReactNode</code> - Extra content in header (e.g., button)</li>
        <li><strong>headerOnly</strong>: <code>boolean</code> - Show only header without content dropdown</li>
        <li><strong>expandIcon</strong>: <code>ReactNode</code> - Custom expand/collapse icon</li>
      </ul>
    </div>
  ),
};

// Removed DefaultSingle story as requested
