import React, { lazy } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import Vehicle from '../../stories/assets/bike.png';
import Jumbotron from '../../../../../packages/molecules/src/animatedJumbotron'

// Define the meta information for the component
const meta: Meta<typeof Jumbotron> = {
  title: 'Test/Jumbotron',
  component: Jumbotron,
  tags: ['autodocs'],
  argTypes: {
    dateHeading: { control: 'text' },
    date: { control: 'text' },
    header: { control: 'object' },
    backgroundColor: { control: 'color' },
    trailColor: { control: 'color' },
    textColor: { control: 'color' },
    ObjectImage:{}
  },
};

export default meta;

// Define the default story
type Story = StoryObj<typeof Jumbotron>;

export const Default: Story = {
  args: {
    dateHeading: 'Event Date',
    date: 'October 31, 2147',
    backgroundColor: 'bg-blue-500', // A shade of blue
    trailColor: 'blue-500', // Another shade of blue
    textColor: 'text-white', // White text
  },
};

export const CustomHeader: Story = {
  args: {
    dateHeading: 'Launch Day',
    date: 'November 15, 2147',
    header: <h1 className="text-2xl font-bold">Welcome to Neo-Lumina</h1>,
    backgroundColor: '#000000', // Black background
    trailColor: '#FF0000', // Red trail
    textColor: '#00FF00', // Green text
  },
};

export const WithCustomImage: Story = {
  args: {
    dateHeading: 'Cityscape',
    date: 'December 25, 2147',
    backgroundColor: '#000033', // Dark blue background
    trailColor: '#ED4136', // Cyan trail
    textColor: '#FFFFFF', // White text
    ObjectImage:Vehicle
  },
  
};