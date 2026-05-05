/// <reference types="react" />
/// <reference types="react-dom" />

// In pnpm monorepos the hoisted storybook types may not resolve
// automatically. Declare the minimal types we use from @storybook/react-vite.
declare module '@storybook/react-vite' {
  import type { ComponentType } from 'react';

  export interface Meta<T extends ComponentType<any> = ComponentType<any>> {
    title?: string;
    component?: T;
    parameters?: Record<string, any>;
    tags?: string[];
    argTypes?: Record<string, any>;
    args?: Record<string, any>;
    decorators?: any[];
  }

  export interface StoryObj<T extends ComponentType<any> = ComponentType<any>> {
    name?: string;
    args?: Record<string, any>;
    parameters?: Record<string, any>;
    render?: (...args: any[]) => any;
    play?: (...args: any[]) => any;
  }
}
