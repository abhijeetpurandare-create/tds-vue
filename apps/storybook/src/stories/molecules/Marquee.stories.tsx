import React, { lazy, Suspense } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

const MarqueeBanner = lazy(() => import('component-library/marqueeBanner')
  .catch(err => {
    console.error('Error loading MarqueeBanner component:', err);
    return { default: () => <div className="error-fallback">Failed to load MarqueeBanner component</div> };
  })
);

const MarqueeWrapper = (props: any) => (
  <Suspense fallback={<div>Loading marquee component...</div>}>
    <MarqueeBanner {...props} />
  </Suspense>
);

export default {
  title: 'Molecule/MarqueeBanner',
  component: MarqueeWrapper,
  argTypes: {
    downtimeMessage: {
      control: 'array',
      description: 'Array of messages to display during downtime',
      defaultValue: [
        "Due to a planned upgrade activity on Wednesday, 3rd April, 8:00 pm to 10:00 pm, we will be temporarily unable to accept support requests from website or phone. Regret the inconvenience and request you to try later."
      ]
    },
    serviceUpdateMessage: {
      control: 'array',
      description: 'Array of messages to display during normal service',
      defaultValue: [
        "Please do not transfer money to payment links that are not shared from Delhivery's official accounts. Delhivery does not require OTP or credentials for address confirmation for your delivery. Our Customer Support team is reachable only from our website or app. Login with your phone number and raise your support request with us."
      ]
    },
    downtimeStart: {
      control: 'text',
      description: 'Start time of downtime (ISO format)',
      defaultValue: "Apr 03, 2024 19:30:00 GMT+5:30"
    },
    downtimeEnd: {
      control: 'text',
      description: 'End time of downtime (ISO format)',
      defaultValue: "Apr 03, 2024 22:00:00 GMT+5:30"
    },
    dotClassName: {
      control: 'text',
      description: 'Tailwind classes for the separator dots',
      defaultValue: "w-3 h-3 bg-red-500 mx-4 inline-block"
    },
    titleClassName: {
      control: 'text',
      description: 'Tailwind classes for the title container',
      defaultValue: "marquee-content inline-block animate-marqueeHeaderTwenty mr-24"
    },
    backgroundColor: {
      control: 'text',
      description: 'Tailwind background color class',
      defaultValue: "bg-red-100"
    },
    borderColor: {
      control: 'text',
      description: 'Tailwind border color class',
      defaultValue: "bg-red-800"
    },
    textColor: {
      control: 'text',
      description: 'Tailwind text color class',
      defaultValue: "text-gray-900"
    }
  }
};

const Template = (args) => <MarqueeBanner {...args} />;

// Default state (will show service updates unless current time is between downtime)
export const Default = Template.bind({});
Default.args = {
};

// Forced downtime display
export const DowntimeView = Template.bind({});
DowntimeView.args = {
  downtimeStart: "Jan 01, 2000 00:00:00 GMT+5:30",
  downtimeEnd: "Dec 31, 2099 23:59:59 GMT+5:30",
  backgroundColor: "bg-red-100",
  borderColor: "bg-yellow-800",
  textColor: "text-gray-800"
};

// Custom service updates
export const CustomServiceUpdates = Template.bind({});
CustomServiceUpdates.args = {
  serviceUpdateMessage: [
    "New feature alert: Track your shipments in real-time!",
    "Mobile app update available with dark mode support."
  ],
  downtimeStart: "Jan 01, 2000 00:00:00 GMT+5:30",
  downtimeEnd: "Dec 31, 2014 23:59:59 GMT+5:30",
  backgroundColor: "bg-blue-100",
  borderColor: "bg-blue-800",
  dotClassName: "w-4 h-4 bg-blue-600 mx-6 inline-block rounded-full"
};

// Emergency alert style
export const EmergencyAlert = Template.bind({});
EmergencyAlert.args = {
  downtimeMessage: [
    "EMERGENCY MAINTENANCE: Systems will be offline for critical security updates",
    "Expected downtime: 30 minutes. All in-progress transactions will be preserved."
  ],
  downtimeStart: "Jan 01, 2000 00:00:00 GMT+5:30",
  downtimeEnd: "Dec 31, 2099 23:59:59 GMT+5:30",
  backgroundColor: "bg-red-200",
  borderColor: "bg-red-900",
  textColor: "text-red-900",
  dotClassName: "w-3 h-3 bg-red-700 mx-4 inline-block animate-pulse"
};

// Minimal style
export const MinimalStyle = Template.bind({});
MinimalStyle.args = {
  titleClassName: "inline-block mr-12",
  backgroundColor: "bg-gray-100",
  borderColor: "bg-gray-300",
  textColor: "text-gray-700",
  dotClassName: "w-2 h-2 bg-gray-500 mx-3 inline-block"
};