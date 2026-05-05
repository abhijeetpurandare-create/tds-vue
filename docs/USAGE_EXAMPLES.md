# Orca18 Component Usage Examples

This document provides examples of how to use the updated Orca18 UI components in your React applications.

## Basic Import

```tsx
import { Button, FloatingButton, Modal, Pill, Spinner } from 'orca18';
```

## Theme Provider Setup

Wrap your application with the ThemeProvider to enable theme customization:

```tsx
import { ThemeProvider } from 'orca18';

const myTheme = {
  components: {
    button: {
      variants: {
        primary: {
          backgroundColor: '#3B82F6',
          textColor: 'white',
          hoverColor: '#2563EB',
        },
        // other variants...
      },
      // other configuration...
    },
    // other components...
  },
};

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <YourApplication />
    </ThemeProvider>
  );
}
```

## Button Examples

### Basic Button

```tsx
<Button variant="primary" size="md">
  Click Me
</Button>
```

### Button with Icon

```tsx
<Button 
  variant="secondary" 
  icon={<IconComponent />} 
  iconPosition="left"
>
  Share
</Button>
```

### Loading Button

```tsx
<Button 
  variant="primary" 
  isLoading={true}
  onClick={() => console.log('Button clicked')}
>
  Loading...
</Button>
```

### Custom Styled Button

```tsx
<Button 
  variant="outline"
  backgroundColor="#FFFFFF"
  borderColor="#6366F1"
  hoverColor="#EEF2FF"
  isRounded={true}
>
  Custom Button
</Button>
```

## Spinner Examples

### Basic Spinner

```tsx
<Spinner variant="primary" size="md" />
```

### Spinner with Custom Color

```tsx
<Spinner 
  variant="custom" 
  size="lg"
  color="#FF5733"
  trackColor="#FFE5D9"
/>
```

### Spinner in a Container

```tsx
<div className="flex items-center justify-center h-40 w-full bg-gray-100">
  <Spinner variant="primary" size="lg" />
</div>
```

## Modal Examples

### Basic Modal

```tsx
import { useState } from 'react';
import { Modal, Button } from 'orca18';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        footer={
          <Button onClick={() => setIsOpen(false)}>
            Close
          </Button>
        }
      >
        <p>This is the content of the modal.</p>
      </Modal>
    </>
  );
}
```

### Modal with Variants

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Success Message"
  variant="success"
  size="sm"
  centered={true}
>
  <p>Your changes have been saved successfully!</p>
</Modal>
```

### Responsive Modal

```tsx
<ResponsiveModalComponent
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Responsive Modal"
>
  <ResponsiveModalComponent.header>
    <h3>Custom Header Content</h3>
  </ResponsiveModalComponent.header>
  
  <ResponsiveModalComponent.body>
    <p>This modal adapts to screen size. On mobile devices, it will display as a bottom sheet.</p>
  </ResponsiveModalComponent.body>
  
  <ResponsiveModalComponent.footer>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSubmit}>
      Submit
    </Button>
  </ResponsiveModalComponent.footer>
</ResponsiveModalComponent>
```

## Pill Examples

### Basic Pill

```tsx
<Pill variant="default" size="md">
  New
</Pill>
```

### Closable Pill

```tsx
<Pill 
  variant="success" 
  closable={true} 
  onClose={() => console.log('Pill closed')}
>
  Feature
</Pill>
```

### Pill with Icon

```tsx
<Pill 
  variant="warning" 
  icon={<AlertIcon />} 
  text="Warning"
/>
```

### Custom Styled Pill

```tsx
<Pill 
  variant="custom"
  backgroundColor="#F9FAFB"
  color="#111827"
  borderColor="#D1D5DB"
  radius="full"
  bordered={true}
>
  Custom Pill
</Pill>
```

## FloatingButton Examples

### Basic FloatingButton

```tsx
<FloatingButton 
  variant="primary" 
  icon={<PlusIcon />} 
  position="bottom-right"
/>
```

### FloatingButton with Text

```tsx
<FloatingButton 
  variant="secondary" 
  icon={<ChatIcon />} 
  text="Chat"
  position="bottom-left"
/>
```

### Custom Positioned FloatingButton

```tsx
<FloatingButton 
  variant="outline"
  icon={<ArrowUpIcon />}
  bottom="5rem"
  right="2rem"
  shadow="shadow-xl"
  zIndex={20}
/>
```

## Combining Components

### Loading Form

```tsx
function LoadingForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async () => {
    setIsLoading(true);
    // API call or other async operation
    setTimeout(() => setIsLoading(false), 2000);
  };
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Submit Form</h3>
      
      {/* Form fields would go here */}
      
      <div className="flex justify-end mt-4">
        <Button 
          variant="primary" 
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <Spinner size="lg" variant="primary" />
            <p className="mt-3 text-center">Processing your request...</p>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Notification System

```tsx
function NotificationSystem() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'New message received' },
    { id: 2, type: 'success', message: 'Task completed successfully' },
  ]);
  
  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  return (
    <div className="fixed top-4 right-4 space-y-2 w-72">
      {notifications.map((notification) => (
        <Pill
          key={notification.id}
          variant={notification.type}
          closable={true}
          onClose={() => removeNotification(notification.id)}
          className="w-full py-2 px-3"
        >
          {notification.message}
        </Pill>
      ))}
      
      <FloatingButton
        variant="primary"
        icon={<BellIcon />}
        position="top-right"
        top="auto"
        right="auto"
        bottom="1rem"
        onClick={() => setNotifications([...notifications, { 
          id: Date.now(), 
          type: 'info', 
          message: 'New notification' 
        }])}
      />
    </div>
  );
}
```

## Advanced Theme Customization

### Component-Specific Theming

```tsx
const customTheme = {
  components: {
    button: {
      base: {
        className: 'font-semibold tracking-wide transition-all',
        radius: {
          default: 'rounded-md',
          rounded: 'rounded-full',
        },
        focusRingColor: 'rgba(99, 102, 241, 0.6)',
      },
      variants: {
        primary: {
          backgroundColor: '#6366F1', // Indigo-500
          textColor: 'white',
          hoverColor: '#4F46E5', // Indigo-600
          focusRingColor: 'rgba(99, 102, 241, 0.6)',
        },
        secondary: {
          backgroundColor: '#F3F4F6', // Gray-100
          textColor: '#1F2937', // Gray-800
          hoverColor: '#E5E7EB', // Gray-200
          focusRingColor: 'rgba(156, 163, 175, 0.6)',
        },
        outline: {
          backgroundColor: 'transparent',
          textColor: '#6366F1', // Indigo-500
          borderColor: '#6366F1', // Indigo-500
          hoverColor: '#EEF2FF', // Indigo-50
          focusRingColor: 'rgba(99, 102, 241, 0.6)',
        },
      },
      sizes: {
        sm: {
          className: 'text-xs py-1.5 px-3',
          iconSize: 'w-3.5 h-3.5',
        },
        md: {
          className: 'text-sm py-2 px-4',
          iconSize: 'w-4 h-4',
        },
        lg: {
          className: 'text-base py-2.5 px-5',
          iconSize: 'w-5 h-5',
        },
      },
      states: {
        disabled: {
          opacity: 0.65,
          backgroundColor: '#E5E7EB', // Gray-200
          textColor: '#9CA3AF', // Gray-400
        },
      },
    },
    // Other component configurations...
  },
};
```

This allows for detailed customization of each component while maintaining the consistent pattern of Tailwind for structure and Emotion for dynamic styling. 