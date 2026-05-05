import React, { useState, useEffect, useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Upload, type UploadProps, type UploadFile, type UploadChangeParam, type UploadV2Props, UploadFileStatus } from "@delhivery/tarmac";


// Mock data for stories
const mockFiles: UploadFile[] = [
  {
    uid: "1",
    name: "Company.png",
    size: 11534336, // 11 MB
    type: "image/png",
    status: UploadFileStatus.DONE,
    url: "https://via.placeholder.com/150x150/5B80F7/FFFFFF?text=IMG",
    thumbUrl: "https://via.placeholder.com/60x60/5B80F7/FFFFFF?text=IMG",
  },
  {
    uid: "2",
    name: "Document.pdf",
    size: 2048000, // 2 MB
    type: "application/pdf",
    status: UploadFileStatus.DONE,
  },
];

const singleMockFile: UploadFile[] = [
  {
    uid: "1",
    name: "Logo.png",
    size: 1024000, // 1 MB
    type: "image/png",
    status: UploadFileStatus.DONE,
    url: "https://via.placeholder.com/150x150/5B80F7/FFFFFF?text=LOGO",
    thumbUrl: "https://via.placeholder.com/60x60/5B80F7/FFFFFF?text=LOGO",
  },
];

// Custom Upload Icon
const CustomUploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 4C16.5523 4 17 4.44772 17 5V13.5858L20.2929 10.2929C20.6834 9.90237 21.3166 9.90237 21.7071 10.2929C22.0976 10.6834 22.0976 11.3166 21.7071 11.7071L16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L10.2929 11.7071C9.90237 11.3166 9.90237 10.6834 10.2929 10.2929C10.6834 9.90237 11.3166 9.90237 11.7071 10.2929L15 13.5858V5C15 4.44772 15.4477 4 16 4Z" />
    <path d="M7 16C7.55228 16 8 16.4477 8 17V22C8 23.1046 8.89543 24 10 24H22C23.1046 24 24 23.1046 24 22V17C24 16.4477 24.4477 16 25 16C25.5523 16 26 16.4477 26 17V22C26 24.2091 24.2091 26 22 26H10C7.79086 26 6 24.2091 6 22V17C6 16.4477 6.44772 16 7 16Z" />
  </svg>
);

const meta: Meta<any> = {
  title: "Atoms/Upload",
  component: Upload as any,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A modern, accessible Upload component with two versions: V2 (default) - simplified API with built-in validation and error handling, perfect for single file uploads. V1 (legacy) - full-featured component with file list management, multiple file support, and advanced customization. Both versions support click-to-select and drag-and-drop file uploads with comprehensive theming.",
      },
    },
  },
  args: {
    version: "v2", // V2 is now the default
  },
  argTypes: {
    // Version selection
    version: {
      control: { type: "select" },
      options: ["v1", "v2"],
      description: "Component version - 'v2' is the default (new design with built-in validation), 'v1' is the legacy version",
      table: {
        defaultValue: { summary: "v2" },
        category: "Version",
      },
    },
    // ─── V1 Specific Props ────────────────────────────────────────────────
    // Core functionality (V1)
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "[V1] Visual size of the upload component - affects padding, text size, and icon dimensions",
      table: {
        defaultValue: { summary: "medium" },
        category: "V1 Props",
      },
    },
    layout: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
      description: "[V1] Layout direction - 'vertical' for stacked icon and text, 'horizontal' for side-by-side layout matching Figma designs",
      table: {
        defaultValue: { summary: "vertical" },
        category: "V1 Props",
      },
    },
    hasError: {
      control: { type: "boolean" },
      description: "[V1] Shows error state with red border and text colors",
      table: {
        defaultValue: { summary: "false" },
        category: "V1 Props",
      },
    },
    uploadType: {
      control: { type: "select" },
      options: ["select", "drag"],
      description: "[V1] Upload interaction method - 'select' for click-to-upload, 'drag' for drag-and-drop support",
      table: {
        defaultValue: { summary: "select" },
        category: "V1 Props",
      },
    },
    multiple: {
      control: { type: "boolean" },
      description: "[V1] Allows selecting multiple files at once in the file dialog",
      table: {
        defaultValue: { summary: "false" },
        category: "V1 Props",
      },
    },
    maxCount: {
      control: { type: "number", min: 0, max: 10 },
      description: "[V1] Maximum number of files that can be uploaded. Set to 1 for single file mode",
      table: {
        category: "V1 Props",
      },
    },
    showUploadList: {
      control: { type: "boolean" },
      description: "[V1] Show the list of uploaded files below the upload area",
      table: {
        defaultValue: { summary: "true" },
        category: "V1 Props",
      },
    },
    listType: {
      control: { type: "select" },
      options: ["text", "picture", "picture-card"],
      description: "[V1] Display style for the uploaded file list",
      table: {
        defaultValue: { summary: "text" },
        category: "V1 Props",
      },
    },
    openFileDialogOnClick: {
      control: { type: "boolean" },
      description: "[V1] Whether clicking the upload area opens the file dialog",
      table: {
        defaultValue: { summary: "true" },
        category: "V1 Props",
      },
    },
    dragTitle: {
      control: { type: "text" },
      description: "[V1] Title text specifically for drag-and-drop mode (overrides 'title' when uploadType is 'drag')",
      table: {
        category: "V1 Props",
      },
    },
    dragDescription: {
      control: { type: "text" },
      description: "[V1] Description text specifically for drag-and-drop mode",
      table: {
        category: "V1 Props",
      },
    },
    dragIcon: {
      control: { type: "object" },
      description: "[V1] Custom icon specifically for drag-and-drop mode",
      table: {
        category: "V1 Props",
      },
    },

    // Event handlers (V1)
    onChange: {
      action: "onChange",
      description: "[V1] Callback fired when the file list changes (files added/removed)",
      table: {
        category: "V1 Props",
      },
    },
    onPreview: {
      action: "onPreview",
      description: "[V1] Callback fired when the preview button is clicked for a file",
      table: {
        category: "V1 Props",
      },
    },
    onRemove: {
      action: "onRemove",
      description: "[V1] Callback fired when the remove button is clicked. Return false to prevent removal",
      table: {
        category: "V1 Props",
      },
    },
    onDownload: {
      action: "onDownload",
      description: "[V1] Callback fired when the download button is clicked for a file",
      table: {
        category: "V1 Props",
      },
    },
    beforeUpload: {
      action: "beforeUpload",
      description: "[V1] Callback fired before uploading. Return false to prevent upload",
      table: {
        category: "V1 Props",
      },
    },

    // ─── Shared Props (V1 & V2) ──────────────────────────────────────────
    disabled: {
      control: { type: "boolean" },
      description: "Disables the upload component, preventing all interactions and file selection",
      table: {
        defaultValue: { summary: "false" },
        category: "Shared Props",
      },
    },
    accept: {
      control: { type: "text" },
      description: "File types to accept (e.g., '.png,.jpg,.jpeg' or 'image/*')",
      table: {
        category: "Shared Props",
      },
    },
    title: {
      control: { type: "text" },
      description: "Main text displayed in the upload area",
      table: {
        category: "Shared Props",
      },
    },
    description: {
      control: { type: "text" },
      description: "Secondary text displayed below the title for additional context",
      table: {
        category: "Shared Props",
      },
    },
    icon: {
      control: { type: "object" },
      description: "Custom icon to display in the upload area (React element)",
      table: {
        category: "Shared Props",
      },
    },
    backgroundColor: {
      control: { type: "color" },
      description: "Background color of the upload area (overrides theme default)",
      table: {
        category: "Shared Props",
      },
    },
    borderColor: {
      control: { type: "color" },
      description: "Border color of the upload area (overrides theme default)",
      table: {
        category: "Shared Props",
      },
    },
    cornerRadius: {
      control: { type: "text" },
      description: "Border radius for rounded corners (e.g., '8px', '12px'). Uses theme default if not specified",
      table: {
        category: "Shared Props",
      },
    },
    textColor: {
      control: { type: "color" },
      description: "Color of the title and description text",
      table: {
        category: "Shared Props",
      },
    },
    textSize: {
      control: { type: "text" },
      description: "Font size for the title text (e.g., '16px', '1.2rem'). Uses size-appropriate default if not specified",
      table: {
        category: "Shared Props",
      },
    },
    textWeight: {
      control: { type: "text" },
      description: "Font weight for the title text (e.g., '500', 'bold')",
      table: {
        category: "Shared Props",
      },
    },
    textFont: {
      control: { type: "text" },
      description: "Font family for all text in the component",
      table: {
        category: "Shared Props",
      },
    },
    spacing: {
      control: { type: "text" },
      description: "Internal spacing and padding (e.g., '16px', '1rem'). Uses size-appropriate default if not specified",
      table: {
        category: "Shared Props",
      },
    },
    hoverBackgroundColor: {
      control: { type: "color" },
      description: "Background color when hovering over the upload area",
      table: {
        category: "Shared Props",
      },
    },
    hoverBorderColor: {
      control: { type: "color" },
      description: "Border color when hovering over the upload area",
      table: {
        category: "Shared Props",
      },
    },

    // ─── V2 Specific Props ────────────────────────────────────────────────
    // File management (V2)
    file: {
      control: false,
      description: "[V2] Currently selected file. Use null to clear selection",
      table: {
        category: "V2 Props",
      },
    },
    onFileChange: {
      action: "onFileChange",
      description: "[V2] Callback fired when file is selected or removed",
      table: {
        category: "V2 Props",
      },
    },
    maxFileSize: {
      control: { type: "number", min: 0, step: 1000 },
      description: "[V2] Maximum file size in bytes. Files exceeding this will show validation error",
      table: {
        category: "V2 Props",
      },
    },
    uploadError: {
      control: { type: "text" },
      description: "[V2] Server-side error message to display alongside selected file",
      table: {
        category: "V2 Props",
      },
    },

    // Content customization (V2)
    uploadButtonText: {
      control: { type: "text" },
      description: "[V2] Text for the upload button in empty state",
      table: {
        defaultValue: { summary: "Upload File" },
        category: "V2 Props",
      },
    },
    tryAgainButtonText: {
      control: { type: "text" },
      description: "[V2] Text for the 'Try Again' button in error state",
      table: {
        defaultValue: { summary: "Try Again" },
        category: "V2 Props",
      },
    },
    errorIcon: {
      control: false,
      description: "[V2] Custom React element for error state icon",
      table: {
        category: "V2 Props",
      },
    },
    deleteIcon: {
      control: false,
      description: "[V2] Custom React element for delete button icon",
      table: {
        category: "V2 Props",
      },
    },
    uploadButtonIcon: {
      control: false,
      description: "[V2] Custom React element for upload button icon",
      table: {
        category: "V2 Props",
      },
    },

    // Validation messages (V2)
    fileSizeErrorMessage: {
      control: { type: "text" },
      description: "[V2] Custom error message when file size exceeds maxFileSize",
      table: {
        defaultValue: { summary: "File size exceeds the limit." },
        category: "V2 Props",
      },
    },
    fileTypeErrorMessage: {
      control: { type: "text" },
      description: "[V2] Custom error message when file type is invalid",
      table: {
        defaultValue: { summary: "Invalid file type." },
        category: "V2 Props",
      },
    },

    // Styling overrides (V2)
    className: {
      control: { type: "text" },
      description: "[V2] Additional CSS class for root element",
      table: {
        category: "V2 Props",
      },
    },
    style: {
      control: false,
      description: "[V2] Inline styles for root element",
      table: {
        category: "V2 Props",
      },
    },
    classNames: {
      control: false,
      description: "[V2] Granular className overrides for sub-elements (root, uploadZone, fileInfo, etc.)",
      table: {
        category: "V2 Props",
      },
    },
    styles: {
      control: false,
      description: "[V2] Granular style overrides for sub-elements",
      table: {
        category: "V2 Props",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Upload>;

// Interactive Upload component for stories - handles both V1 and V2 dynamically
// Properly reacts to prop changes from Storybook controls by using key prop
const InteractiveUpload: React.FC<any> = (props) => {
  const { version = "v2", file: propFile, defaultFileList, onChange, title, description, accept, ...restProps } = props;
  
  // V2 props handling (default)
  if (version === 'v2') {
    const [file, setFile] = useState<File | null>(propFile || null);
    
    // Sync with prop changes from Storybook controls
    useEffect(() => {
      setFile(propFile || null);
    }, [propFile]);
    
    // Create a key from important props to force re-render when they change
    // Only use simple props that are commonly changed in Storybook controls
    const keyProps = {
      title: typeof title === 'string' ? title : String(title),
      description: typeof description === 'string' ? description : String(description),
      accept,
      maxFileSize: restProps.maxFileSize,
      disabled: restProps.disabled,
      uploadButtonText: restProps.uploadButtonText,
    };
    const componentKey = `v2-${version}-${Object.values(keyProps).join('-')}`;
    
    return (
      <Upload
        key={componentKey}
        version="v2"
        file={file}
        onFileChange={setFile}
        {...restProps}
      />
    );
  }
  
  // V1 props handling
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  // Sync with prop changes from Storybook controls
  useEffect(() => {
    if (defaultFileList !== undefined) {
      setFileList(defaultFileList);
    }
  }, [defaultFileList]);

  const handleChange = (info: UploadChangeParam) => {
    setFileList(info.fileList);
    onChange?.(info);
  };

  // Create a key from important props to force re-render when they change
  // Only use simple props that are commonly changed in Storybook controls
  const keyProps = {
    title: typeof title === 'string' ? title : String(title),
    description: typeof description === 'string' ? description : String(description),
    accept,
    size: restProps.size,
    disabled: restProps.disabled,
  };
  const componentKey = `v1-${version}-${Object.values(keyProps).join('-')}`;

  return (
    <Upload
      key={componentKey}
      version="v1"
      {...restProps}
      fileList={fileList}
      onChange={handleChange}
    />
  );
};

// Basic Upload - V2 default (new design)
export const Default: Story = {
  args: {
    version: "v2",
    title: "Drag and drop upto 5000 AWBs (.CSV)",
    description: "Max 1MB",
    accept: ".csv",
    maxFileSize: 1048576,
    uploadButtonText: "Upload File",
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Basic Upload V1 - Medium size (legacy design)
export const DefaultV1: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    title: "Upload logo",
    accept: ".png,.jpg,.jpeg",
    showUploadList: true,
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Small Size Upload V1
export const Small: Story = {
  args: {
    version: "v1",
    size: "small",
    uploadType: "select",
    title: "Upload file",
    description: "PNG, JPEG up to 5MB",
    accept: ".png,.jpg,.jpeg",
    showUploadList: true,
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Large Size Upload V1
export const Large: Story = {
  args: {
    version: "v1",
    size: "large",
    uploadType: "select",
    title: "Upload documents",
    description: "Drag and drop or click to select files",
    accept: ".pdf,.doc,.docx",
    multiple: true,
    showUploadList: true,
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Drag and Drop Upload V1
export const DragAndDrop: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "drag",
    dragTitle: "Drag files here to upload",
    dragDescription: "Or click to select files",
    accept: ".png,.jpg,.jpeg,.pdf",
    multiple: true,
    showUploadList: true,
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Upload with existing files V1
export const WithFiles: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    title: "Upload additional files",
    accept: ".png,.jpg,.jpeg,.pdf",
    multiple: true,
    showUploadList: true,
    defaultFileList: singleMockFile,
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Picture Card Layout V1
export const PictureCard: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    title: "Upload images",
    description: "Picture card layout",
    accept: ".png,.jpg,.jpeg",
    multiple: true,
    listType: "picture-card",
    showUploadList: true,
    defaultFileList: [
      {
        uid: "1",
        name: "Image1.png",
        size: 1024000,
        type: "image/png",
        status: UploadFileStatus.DONE,
        url: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=IMG1",
        thumbUrl: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=IMG1",
      },
      {
        uid: "2",
        name: "Image2.jpg",
        size: 2048000,
        type: "image/jpeg",
        status: UploadFileStatus.DONE,
        url: "https://via.placeholder.com/150x150/4ECDC4/FFFFFF?text=IMG2",
        thumbUrl: "https://via.placeholder.com/150x150/4ECDC4/FFFFFF?text=IMG2",
      },
    ],
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Multiple files upload V1
export const MultipleFiles: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    title: "Upload multiple files",
    description: "Select up to 5 files",
    accept: ".png,.jpg,.jpeg,.pdf,.doc,.docx",
    multiple: true,
    maxCount: 5,
    showUploadList: true,
    defaultFileList: mockFiles,
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Disabled Upload V1
export const Disabled: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    title: "Upload disabled",
    description: "This upload is currently disabled",
    disabled: true,
    showUploadList: true,
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Custom Styling V1
export const CustomStyling: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    title: "Custom styled upload",
    description: "With custom colors and styling",
    backgroundColor: "#f0f8ff",
    borderColor: "#4169e1",
    hoverBackgroundColor: "#e6f3ff",
    hoverBorderColor: "#0000cd",
    textColor: "#191970",
    cornerRadius: "12px",
    textSize: "18px",
    textWeight: "600",
    showUploadList: true,
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Custom Icon V1
export const CustomIcon: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    title: "Upload with custom icon",
    description: "Using a custom upload icon",
    icon: <CustomUploadIcon />,
    showUploadList: true,
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Max Count Limit V1
export const MaxCountLimit: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    title: "Single file upload",
    description: "Only one file allowed",
    maxCount: 1,
    accept: ".png,.jpg,.jpeg",
    showUploadList: true,
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// Size Comparison
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}>Small</h3>
        <InteractiveUpload
          version="v1"
          size="small"
          title="Small upload"
          description="Compact size"
          showUploadList={true}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}>Medium</h3>
        <InteractiveUpload
          version="v1"
          size="medium"
          title="Medium upload"
          description="Default size"
          showUploadList={true}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}>Large</h3>
        <InteractiveUpload
          version="v1"
          size="large"
          title="Large upload"
          description="Spacious size"
          showUploadList={true}
        />
      </div>
    </div>
  ),
};

// Theme Variations
export const ThemeVariations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "500" }}>Default Theme</h3>
        <InteractiveUpload
          version="v1"
          size="medium"
          title="Default upload"
          description="Standard theme colors"
          showUploadList={true}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "500" }}>Success Theme</h3>
        <InteractiveUpload
          version="v1"
          size="medium"
          title="Success upload"
          description="Green theme variation"
          backgroundColor="#f6ffed"
          borderColor="#52c41a"
          hoverBackgroundColor="#f0f9e8"
          hoverBorderColor="#389e0d"
          textColor="#389e0d"
          showUploadList={true}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "500" }}>Warning Theme</h3>
        <InteractiveUpload
          version="v1"
          size="medium"
          title="Warning upload"
          description="Orange theme variation"
          backgroundColor="#fff7e6"
          borderColor="#fa8c16"
          hoverBackgroundColor="#ffefd6"
          hoverBorderColor="#d46b08"
          textColor="#d46b08"
          showUploadList={true}
        />
      </div>
    </div>
  ),
};

// Horizontal Layout Stories V1
export const HorizontalLayout: Story = {
  args: {
    version: "v1",
    layout: "horizontal",
    title: "Upload logo",
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal layout with icon and text side-by-side, matching Figma designs. Perfect for inline upload areas.",
      },
    },
  },
  render: (args) => <InteractiveUpload {...args} />,
};

export const HorizontalWithError: Story = {
  args: {
    version: "v1",
    layout: "horizontal",
    title: "Upload logo",
    size: "medium",
    hasError: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal layout in error state with red border and text colors.",
      },
    },
  },
  render: (args) => <InteractiveUpload {...args} />,
};

export const PictureCardList: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    title: "Upload images",
    description: "Select image files",
    accept: ".png,.jpg,.jpeg",
    multiple: true,
    listType: "picture-card",
    showUploadList: {
      showEditIcon: true,
      showRemoveIcon: false,
    },
    defaultFileList: [
      {
        uid: "1",
        name: "Company.png",
        size: 11534336, // 11 MB
        type: "image/png",
        status: UploadFileStatus.DONE,
        url: "https://via.placeholder.com/150x150/5B80F7/FFFFFF?text=IMG",
        thumbUrl: "https://via.placeholder.com/93x93/5B80F7/FFFFFF?text=IMG",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Picture card layout showing uploaded files as cards with preview images and edit functionality, matching the Figma design for uploaded state.",
      },
    },
  },
  render: (args) => <InteractiveUpload {...args} />,
};

export const LayoutComparison: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "500" }}>Vertical Layout (Default)</h3>
        <InteractiveUpload
          version="v1"
          size="medium"
          layout="vertical"
          title="Upload logo"
          description="Standard vertical layout"
          showUploadList={true}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "500" }}>Horizontal Layout</h3>
        <InteractiveUpload
          version="v1"
          size="medium"
          layout="horizontal"
          title="Upload logo"
          showUploadList={true}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "500" }}>Horizontal with Error</h3>
        <InteractiveUpload
          version="v1"
          size="medium"
          layout="horizontal"
          title="Upload logo"
          hasError={true}
          showUploadList={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of different layout options including error states.",
      },
    },
  },
};

// How to Use Documentation
export const HowToUse: Story = {
  render: () => (
    <div style={{ maxWidth: "800px", padding: "20px" }}>
      <h2 style={{ marginBottom: "16px", fontSize: "24px", fontWeight: "600" }}>How to Use Upload Component</h2>
      
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ marginBottom: "12px", fontSize: "18px", fontWeight: "500" }}>Basic Usage</h3>
        <p style={{ marginBottom: "16px", lineHeight: "1.6", color: "#666" }}>
          The Upload component supports both controlled and uncontrolled modes. For most use cases, 
          you'll want to manage the file list state in your parent component.
        </p>
        <InteractiveUpload
          version="v1"
          size="medium"
          title="Basic upload"
          description="Click to select files"
          showUploadList={true}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ marginBottom: "12px", fontSize: "18px", fontWeight: "500" }}>Drag and Drop</h3>
        <p style={{ marginBottom: "16px", lineHeight: "1.6", color: "#666" }}>
          Enable drag and drop by setting <code>uploadType="drag"</code>. You can customize the 
          drag-specific text and icon separately from the default content.
        </p>
        <InteractiveUpload
          version="v1"
          size="medium"
          uploadType="drag"
          dragTitle="Drag files here"
          dragDescription="Or click to browse"
          multiple={true}
          showUploadList={true}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ marginBottom: "12px", fontSize: "18px", fontWeight: "500" }}>File Validation</h3>
        <p style={{ marginBottom: "16px", lineHeight: "1.6", color: "#666" }}>
          Control file types with the <code>accept</code> prop and limit quantities with <code>maxCount</code>. 
          Use <code>beforeUpload</code> for custom validation logic.
        </p>
        <InteractiveUpload
          version="v1"
          size="medium"
          title="Image upload only"
          description="PNG, JPG, JPEG up to 5MB"
          accept=".png,.jpg,.jpeg"
          maxCount={3}
          multiple={true}
          showUploadList={true}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ marginBottom: "12px", fontSize: "18px", fontWeight: "500" }}>Customization</h3>
        <p style={{ marginBottom: "16px", lineHeight: "1.6", color: "#666" }}>
          Customize appearance with styling props or provide your own icon. The component automatically 
          scales the default icon based on the size prop.
        </p>
        <InteractiveUpload
          version="v1"
          size="medium"
          title="Custom styled upload"
          description="With brand colors"
          backgroundColor="#f0f8ff"
          borderColor="#1890ff"
          textColor="#1890ff"
          cornerRadius="8px"
          icon={<CustomUploadIcon />}
          showUploadList={true}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ marginBottom: "12px", fontSize: "18px", fontWeight: "500" }}>Event Handling</h3>
        <p style={{ marginBottom: "16px", lineHeight: "1.6", color: "#666" }}>
          Handle file changes with <code>onChange</code>, prevent uploads with <code>beforeUpload</code>, 
          and manage file actions with <code>onPreview</code>, <code>onRemove</code>, and <code>onDownload</code>.
        </p>
        <InteractiveUpload
          version="v1"
          size="medium"
          title="Event handling demo"
          description="Check the Actions panel"
          showUploadList={true}
          onChange={(info) => console.log('File list changed:', info)}
          beforeUpload={(file) => {
            console.log('Before upload:', file.name);
            return true;
          }}
          onPreview={(file) => console.log('Preview:', file.name)}
          onRemove={(file) => {
            console.log('Remove:', file.name);
            return true;
          }}
        />
      </div>
    </div>
  ),
};

// Interactive Playground V1
export const Playground: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    title: "Upload files",
    description: "Drag and drop or click to select",
    accept: ".png,.jpg,.jpeg,.pdf,.doc,.docx",
    multiple: true,
    maxCount: 5,
    disabled: false,
    showUploadList: true,
    backgroundColor: "#ffffff",
    borderColor: "#d9d9d9",
    textColor: "#000000",
    cornerRadius: "8px",
    textSize: "16px",
    textWeight: "500",
    spacing: "24px",
  },
  render: (args) => <InteractiveUpload {...args} />,
}; 

export const WithImagePreview: Story = {
  args: {
    version: "v1",
    size: "medium",
    uploadType: "select",
    listType: "picture-card",
    title: "+ Upload",
    description: "",
    showIcon: false,
    multiple: true,
    maxCount: 6,
    defaultFileList: [
      {
        uid: "-1",
        name: "sample-image-1.jpg",
        status: UploadFileStatus.DONE,
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        thumbUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        type: "image/jpeg",
      },
      {
        uid: "-2",
        name: "sample-image-2.jpg",
        status: UploadFileStatus.DONE,
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
        thumbUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
        type: "image/jpeg",
      },
      {
        uid: "-3",
        name: "sample-image-3.jpg",
        status: UploadFileStatus.DONE,
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
        thumbUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
        type: "image/jpeg",
      },
      {
        uid: "-4",
        name: "document.pdf",
        status: UploadFileStatus.DONE,
        type: "application/pdf",
      },
    ],
    showUploadList: {
      showRemoveIcon: true,
      showPreviewIcon: true,
      showDownloadIcon: false,
      showEditIcon: true,
    },
    onPreview: (file) => {
      console.log('Preview file:', file);
      // In a real app, you would open a modal or new window to preview the image
      if (file.url || file.thumbUrl) {
        window.open(file.url || file.thumbUrl, '_blank');
      }
    },
    onEdit: (file) => {
      console.log('Edit file:', file);
      // In a real app, you would open an editor for the file
    },
  },
  render: (args) => <InteractiveUpload {...args} />,
};

// ─── Upload V2 Stories ─────────────────────────────────────────────

const InteractiveUploadV2: React.FC<Omit<UploadV2Props, 'file' | 'onFileChange'> & { initialFile?: File | null }> = ({ initialFile = null, ...props }) => {
  const [file, setFile] = useState<File | null>(initialFile);

  return (
    <Upload
      version="v2"
      file={file}
      onFileChange={setFile}
      {...props}
    />
  );
};

export const V2Default: Story = {
  render: () => (
    <InteractiveUploadV2
      title="Drag and drop upto 5000 AWBs (.CSV)"
      accept=".csv"
      maxFileSize={1048576}
      uploadButtonText="Upload File"
      fileSizeErrorMessage="Your file exceeds the 1MB limit. Please compress your CSV or split the data to continue."
      fileTypeErrorMessage="Invalid Format"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "V2 Upload component with drag-and-drop, built-in validation, and inline error state. Designed for CSV file uploads with a file size limit.",
      },
    },
  },
};

export const V2WithFileSelected: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(
      new File(["test,data\n1,2\n3,4"], "sample-data.csv", { type: "text/csv" })
    );

    return (
      <Upload
        version="v2"
        file={file}
        onFileChange={setFile}
        title="Drag and drop upto 5000 AWBs (.CSV)"
        accept=".csv"
        maxFileSize={1048576}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "V2 Upload component with a file already selected, showing the file name, size, and delete button.",
      },
    },
  },
};

export const V2WithUploadError: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(
      new File(["test"], "bad-file.csv", { type: "text/csv" })
    );

    return (
      <Upload
        version="v2"
        file={file}
        onFileChange={setFile}
        title="Drag and drop upto 5000 AWBs (.CSV)"
        accept=".csv"
        uploadError="Server error: could not process file"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "V2 Upload component with a server-side upload error displayed below the file info.",
      },
    },
  },
};

export const V2Disabled: Story = {
  render: () => (
    <InteractiveUploadV2
      title="Drag and drop upto 5000 AWBs (.CSV)"
      accept=".csv"
      disabled
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "V2 Upload component in disabled state.",
      },
    },
  },
};

export const V2AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "600px" }}>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "500" }}>Default (Empty)</h3>
        <InteractiveUploadV2
          title="Drag and drop upto 5000 AWBs (.CSV)"
          accept=".csv"
          maxFileSize={1048576}
          uploadButtonText="Upload File"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "500" }}>File Selected</h3>
        <Upload
          version="v2"
          file={new File(["test,data"], "exceptions-report.csv", { type: "text/csv" })}
          onFileChange={() => {}}
          title="Drag and drop upto 5000 AWBs (.CSV)"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "500" }}>Upload Error</h3>
        <Upload
          version="v2"
          file={new File(["test"], "bad.csv", { type: "text/csv" })}
          onFileChange={() => {}}
          title="Drag and drop upto 5000 AWBs (.CSV)"
          uploadError="Failed to process file"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "500" }}>Disabled</h3>
        <InteractiveUploadV2
          title="Drag and drop upto 5000 AWBs (.CSV)"
          accept=".csv"
          disabled
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All V2 Upload states side by side for comparison.",
      },
    },
  },
};