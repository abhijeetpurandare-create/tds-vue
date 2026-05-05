import React, {forwardRef, useEffect, useState} from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {Sidebar, ThemeProvider} from "@delhivery/tarmac";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faChevronRight, faChevronLeft, faHamburger, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import delhiveryLogo from '../../../public/delhiveryLogo.gif';

const navigation = [
  {
    name: "Dashboard",
    // icon: {name: "gauge-simple", pack: "fas"},
    to: "/dashboard",
    count: 7,
  },
  {
    name: "Team",
    // icon: {name: "user", pack: "fas"},
    children: [
      {name: "Overview", to: "/teams/overview", count: 2},
      {name: "Members", to: "/teams/members", count: 1, hidden: true},
      {name: "Calendar", to: "/teams/calendar"},
      {name: "Settings", to: "/teams/settings"},
    ],
  },
  {
    name: "Projects",
    icon: {name: "folder", pack: "fas"},
    children: [
      {name: "Overview", to: "/projects/overview"},
      {name: "Members", to: "/projects/members"},
      {name: "Calendar", to: "/projects/calendar"},
      {name: "Settings", to: "/projects/settings"},
    ],
  },
  {
    name: "Calendar",
    // icon: {name: "calendar", pack: "fas"},
    children: [
      {name: "Overview", to: "/calendar/overview"},
      {name: "Members", to: "/calendar/members"},
      {name: "Calendar", to: "/calendar"},
      {name: "Settings", to: "/calendar/settings"},
    ],
  },
  {
    name: "Documents",
    // icon: {name: "inbox", pack: "fas"},
    children: [
      {name: "Overview", to: "/documents/overview"},
      {name: "Members", to: "/documents/members"},
      {name: "Calendar", to: "/documents/calendar"},
      {name: "Settings", to: "/documents/settings"},
    ],
  },
  {
    name: "Reports",
    // icon: {name: "chart-line", pack: "fas"},
    children: [
      {name: "Overview", to: "/reports/overview", count: 5},
      {name: "Members", to: "/reports/members", count: 3},
      {name: "Calendar", to: "/reports/calendar"},
      {name: "Settings", to: "/reports/settings"},
    ],
  },
];

// this wrapper will keep Sidebar hidden until after its mount‐effects have run
const SidebarNoFlicker = forwardRef<any, any>((args, ref) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // run after first paint
    setReady(true);
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        visibility: ready ? "visible" : "hidden",
      }}
    >
      {/* @ts-expect-error forwardRef component type */}
      <Sidebar {...args} ref={ref} />
    </div>
  );
});

const meta: Meta = {
  title: "Atoms/Sidebar",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["light", "dark", "dark-plus"],
      defaultValue: "light",
    },
    expandable: {
      control: "boolean",
      defaultValue: false,
    },
    openByDefault: {
      control: "boolean",
      defaultValue: false, // flip default to false to avoid that mount‐toggle
    },
    position: {
      control: "select",
      options: ["left", "right"],
      defaultValue: "left",
    },
    width: {
      control: "text",
      defaultValue: "240px",
    },
    value: {
      control: "text",
      defaultValue: "/dashboard",
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    routes: navigation,
    value: "/dashboard",
    variant: "dark-plus",
    width: "240px",
    expandable: true,
    openByDefault: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "/dashboard");
    return (
      <ThemeProvider activeTheme="light">
        <div style={{height: "100vh", display: "flex"}}>
          <Sidebar
            {...args}
            routes={args.routes || navigation}
            value={value}
            onRouteActive={(item) => setValue(item.to)}
            collapseIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            expandIcon={<FontAwesomeIcon icon={faChevronRight} />}
          />
        </div>
      </ThemeProvider>
    );
  },
};

export const DarkVariant: Story = {
  args: {
    routes: navigation,
    value: "/dashboard",
    variant: "dark",
    width: "240px",
    expandable: true,
    openByDefault: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "/dashboard");
    return (
      <ThemeProvider activeTheme="dark">
        <div style={{height: "100vh", display: "flex"}}>
          <Sidebar
            {...args}
            routes={args.routes || navigation}
            value={value}
            onRouteActive={(item) => setValue(item.to)}
            collapseIcon={<FontAwesomeIcon icon={faHamburger} />}
            expandIcon={<FontAwesomeIcon icon={faMoneyCheckDollar} />}
          />
        </div>
      </ThemeProvider>
    );
  },
};

export const Expandable: Story = {
  args: {
    routes: navigation,
    value: "/dashboard",
    variant: "light",
    width: "240px",
    expandable: true,
    openByDefault: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "/dashboard");
    return (
      <ThemeProvider activeTheme="light">
        <div style={{height: "100vh", display: "flex"}}>
          <Sidebar
            {...args}
            routes={args.routes || navigation}
            value={value}
            onRouteActive={(item) => setValue(item.to)}
          />
        </div>
      </ThemeProvider>
    );
  },
};

export const WithBgImage: Story = {
  args: {
    routes: navigation,
    value: "/dashboard",
    variant: "light",
    width: "240px",
    expandable: true,
    openByDefault: false,
    bgImage: '/assets/sidebar-bg.png',
    topIcon: <img src={delhiveryLogo} alt="Logo" style={{height: 32}} />,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "/dashboard");
    return (
      <ThemeProvider activeTheme="light">
        <div style={{height: "100vh", display: "flex"}}>
          <Sidebar
            {...args}
            routes={args.routes || navigation}
            value={value}
            onRouteActive={(item) => setValue(item.to)}
          />
        </div>
      </ThemeProvider>
    );
  },
};

export const WithCustomIcons: Story = {
  args: {
    routes: navigation,
    value: "/dashboard",
    variant: "light",
    width: "240px",
    expandable: true,
    openByDefault: false,
    expandIcon: <FontAwesomeIcon icon={faChevronRight} />,
    collapseIcon: <FontAwesomeIcon icon={faChevronLeft} />,
    topIcon: <FontAwesomeIcon icon={faGear} size="2x" />,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "/dashboard");
    return (
      <ThemeProvider activeTheme="light">
        <div style={{height: "100vh", display: "flex"}}>
          <Sidebar
            {...args}
            routes={args.routes || navigation}
            value={value}
            onRouteActive={(item) => setValue(item.to)}
          />
        </div>
      </ThemeProvider>
    );
  },
};

export const WithInvalidIconFallback: Story = {
  args: {
    routes: [
      { name: "Broken Icon", icon: "not-a-real-icon", to: "/broken" },
      ...navigation
    ],
    value: "/broken",
    variant: "light",
    width: "240px",
    expandable: true,
    openByDefault: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "/broken");
    return (
      <ThemeProvider activeTheme="light">
        <div style={{height: "100vh", display: "flex"}}>
          <Sidebar
            {...args}
            routes={args.routes || [
              { name: "Broken Icon", icon: "not-a-real-icon", to: "/broken" },
              ...navigation
            ]}
            value={value}
            onRouteActive={(item) => setValue(item.to)}
          />
        </div>
      </ThemeProvider>
    );
  },
};

export const HiddenSidebar: Story = {
  args: {
    routes: navigation,
    value: "/dashboard",
    variant: "light",
    width: "240px",
    expandable: true,
    openByDefault: false,
    hidden: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "/dashboard");
    return (
      <ThemeProvider activeTheme="light">
        <div style={{height: "100vh", display: "flex"}}>
          <Sidebar
            {...args}
            routes={args.routes || navigation}
            value={value}
            onRouteActive={(item) => setValue(item.to)}
          />
        </div>
      </ThemeProvider>
    );
  },
};