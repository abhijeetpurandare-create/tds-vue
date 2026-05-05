import React, {lazy, Suspense} from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import { mockTrackingData, mockTrackingDataCancelled, mockTrackingDataOutForDelivery } from "../../utils/trackMockData";

const BuildTimeLine = lazy(() =>
  import("component-library/waybillTimeline").catch((err) => {
    console.error("Error loading waybillTimeline component:", err);
    return {
      default: () => (
        <div className="error-fallback">
          Failed to load waybillTimeline component
        </div>
      ),
    };
  })
);

// Wrapper component to handle loading and error states
const BuildTimeLineWrapper = (props: any) => (
  <Suspense fallback={<div>Loading timeline component...</div>}>
    <BuildTimeLine {...props} />
  </Suspense>
);


// Mock function for onCallFeBtnClick
const onCallFeBtnClick = () => {
  alert("Call Executive button clicked!");
};


export default {
  title: "Molecule/VerticalTimeline",
  component: BuildTimeLineWrapper,
  argTypes: {
    trackingData: {control: "object"}, // Allow object input for trackingData
    onCallFeBtnClick: {action: "clicked"}, // Hide from controls (function)
    callFeButtonLoading: {control: "boolean"}, // Allow toggle for loading state
  },
};

const Template = (args) => <BuildTimeLine {...args} />;

export const Default = Template.bind({});
Default.args = {
  trackingData: mockTrackingData,
  onCallFeBtnClick: onCallFeBtnClick,
  callFeButtonLoading: false
};

export const OUT_FOR_DELIVERY = Template.bind({});
OUT_FOR_DELIVERY.args = {
  trackingData: mockTrackingDataOutForDelivery,
};

export const CANCELLED = Template.bind({});
CANCELLED.args = {
  trackingData: mockTrackingDataCancelled,
};
