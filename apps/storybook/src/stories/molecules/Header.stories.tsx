import React, {lazy, Suspense} from "react";
import {Meta, StoryObj} from "@storybook/react-vite";

const Header = lazy(() => import('component-library/Header')
  .catch(err => {
    console.error('Error loading Header component:', err);
    return { default: () => <div className="error-fallback">Failed to load Header component</div> };
  })
);
// Wrapper component to handle loading and error states
const HeaderWrapper = (props: any) => (
  <Suspense fallback={<div>Loading header component...</div>}>
    <Header {...props} />
  </Suspense>
);

// Define the meta information for the component
const meta: Meta<typeof Header> = {
  title: "Molecule/Header",
  component: HeaderWrapper,
  tags: ["autodocs"],
  argTypes: {
    showProfileAvatar: {control: "boolean"},
    headerJSON: {control: "object"}, // Allow changing the headerJSON configuration
    hasMarquee: {control: "boolean"},
  },
};

export default meta;

// Define the default story
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    showProfileAvatar: false,
    hasMarquee: false
  },
};

// Custom Header Configuration
export const CustomHeaderConfig = {
  args: {
    showProfileAvatar: false,
    headerJSON: [
      {
        title: "Custom Services",
        icon: <img src="/path/to/custom-icon.svg" alt="Custom Services" />,
        subTitles: [
          {
            text: "Custom Express Parcel",
            url: "/custom-services/express-parcel",
            icon: (
              <img src="/path/to/custom-icon.svg" alt="Custom Express Parcel" />
            ),
          },
          {
            text: "Custom Warehousing",
            url: "/custom-services/warehousing",
            icon: (
              <img src="/path/to/custom-icon.svg" alt="Custom Warehousing" />
            ),
          },
        ],
      },
      {
        title: "Custom Solutions",
        icon: <img src="/path/to/custom-icon.svg" alt="Custom Solutions" />,
        subTitles: [
          {
            text: "Custom D2C Brands",
            url: "/custom-solutions/d2c-brands",
            icon: (
              <img src="/path/to/custom-icon.svg" alt="Custom D2C Brands" />
            ),
          },
        ],
      },
    ],
    hasMarquee: false
  },
};

// Header with Marquee Banner
export const WithMarqueeBanner = {
  args: {
    showProfileAvatar: false,
    headerJSON: [
      {
        title: "Custom Services",
        icon: <img src="/path/to/custom-icon.svg" alt="Custom Services" />,
        subTitles: [
          {
            text: "Custom Express Parcel",
            url: "/custom-services/express-parcel",
            icon: (
              <img src="/path/to/custom-icon.svg" alt="Custom Express Parcel" />
            ),
          },
          {
            text: "Custom Warehousing",
            url: "/custom-services/warehousing",
            icon: (
              <img src="/path/to/custom-icon.svg" alt="Custom Warehousing" />
            ),
          },
        ],
      },
    ],
    hasMarquee: true
  },
};
