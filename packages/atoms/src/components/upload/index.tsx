import React, { useState, useRef, useCallback, useMemo, CSSProperties } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';

// Enums
export enum UploadSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum UploadType {
  SELECT = 'select',
  DRAG = 'drag',
}

export enum UploadListType {
  TEXT = 'text',
  PICTURE = 'picture',
  PICTURE_CARD = 'picture-card',
}

export enum UploadFileStatus {
  UPLOADING = 'uploading',
  DONE = 'done',
  ERROR = 'error',
  REMOVED = 'removed',
}

export enum UploadLayout {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

// Interfaces
export interface UploadFile<T = any> {
  uid: string;
  name: string;
  fileName?: string;
  size?: number;
  type?: string;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  response?: T;
  error?: any;
  originFileObj?: File;
  preview?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
}

export interface UploadChangeParam<T = UploadFile> {
  file: T;
  fileList: T[];
  event?: { percent: number };
}

export interface ShowUploadListInterface<T = any> {
  showRemoveIcon?: boolean | ((file: UploadFile<T>) => boolean);
  showPreviewIcon?: boolean | ((file: UploadFile<T>) => boolean);
  showDownloadIcon?: boolean | ((file: UploadFile<T>) => boolean);
  showEditIcon?: boolean | ((file: UploadFile<T>) => boolean);
  removeIcon?: React.ReactNode | ((file: UploadFile<T>) => React.ReactNode);
  downloadIcon?: React.ReactNode | ((file: UploadFile<T>) => React.ReactNode);
  previewIcon?: React.ReactNode | ((file: UploadFile<T>) => React.ReactNode);
  editIcon?: React.ReactNode | ((file: UploadFile<T>) => React.ReactNode);
  extra?: React.ReactNode | ((file: UploadFile<T>) => React.ReactNode);
}

export interface UploadProps<T = any> {
  // Core functionality
  accept?: string;
  action?: string | ((file: File) => string) | ((file: File) => Promise<string>);
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  customRequest?: (options: any) => void;
  data?: Record<string, unknown> | ((file: UploadFile<T>) => Record<string, unknown>);
  defaultFileList?: Array<UploadFile<T>>;
  directory?: boolean;
  disabled?: boolean;
  fileList?: Array<UploadFile<T>>;
  headers?: Record<string, string>;
  listType?: UploadListType | 'text' | 'picture' | 'picture-card';
  maxCount?: number;
  method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
  multiple?: boolean;
  name?: string;
  openFileDialogOnClick?: boolean;
  previewFile?: (file: File | Blob) => Promise<string>;
  showUploadList?: boolean | ShowUploadListInterface;
  supportServerRender?: boolean;
  uploadType?: UploadType | 'select' | 'drag';
  withCredentials?: boolean;
  
  // Layout and state
  layout?: UploadLayout | 'vertical' | 'horizontal';
  hasError?: boolean;
  width?: string | number;  // New prop for width
  height?: string | number; // New prop for height
  
  // Events
  onChange?: (info: UploadChangeParam<UploadFile<T>>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onPreview?: (file: UploadFile<T>) => void;
  onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  onDownload?: (file: UploadFile<T>) => void;
  onEdit?: (file: UploadFile<T>) => void;
  
  // Styling props
  size?: UploadSize | 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
  rootClassName?: string;
  
  // Custom render props
  iconRender?: (file: UploadFile<T>, listType?: UploadListType) => React.ReactNode;
  itemRender?: (
    originNode: React.ReactElement,
    file: UploadFile<T>,
    fileList: Array<UploadFile<T>>,
    actions: {
      download: () => void;
      preview: () => void;
      remove: () => void;
      edit: () => void;
    }
  ) => React.ReactNode;
  
  // Content customization - supports both text and React elements (including divs)
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  dragTitle?: React.ReactNode;
  dragDescription?: React.ReactNode;
  dragIcon?: React.ReactNode;
  showIcon?: boolean; // Make icon optional
  
  // Advanced customization with better defaults
  backgroundColor?: string;
  borderColor?: string;
  cornerRadius?: string;
  borderStyle?: string;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  textColor?: string;
  textSize?: string;
  textWeight?: string;
  textFont?: string;
  spacing?: string;
  
  // Children for custom content
  children?: React.ReactNode;
}

// Utility functions
const generateUID = (): string => {
  return `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getFileFromEvent = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>): File[] => {
  if ('dataTransfer' in e) {
    return Array.from(e.dataTransfer.files);
  }
  if ('target' in e && e.target.files) {
    return Array.from(e.target.files);
  }
  return [];
};

const file2Obj = (file: File): UploadFile => ({
  uid: generateUID(),
  name: file.name,
  fileName: file.name,
  size: file.size,
  type: file.type,
  lastModified: file.lastModified,
  lastModifiedDate: new Date(file.lastModified),
  originFileObj: file,
  status: UploadFileStatus.DONE,
});

// Utility function to truncate file names
const truncateFileName = (fileName: string, maxLength: number = 20): string => {
  if (fileName.length <= maxLength) {
    return fileName;
  }
  
  const extension = fileName.split('.').pop();
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
  
  if (extension) {
    const truncatedName = nameWithoutExtension.substring(0, maxLength - extension.length - 4) + '...';
    return `${truncatedName}.${extension}`;
  }
  
  return fileName.substring(0, maxLength - 3) + '...';
};

// Legacy function - kept for compatibility but replaced by isImageUrl
const isImageFile = (file: UploadFile): boolean => {
  return isImageUrl(file);
};

// Default Upload Icon with size-based scaling
const DefaultUploadIcon: React.FC<{ size?: string }> = ({ size = 'medium' }) => {
  let iconSize = 28; // default medium size
  
  if (size === 'small') {
    iconSize = 20;
  } else if (size === 'large') {
    iconSize = 36;
  }
  
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="14 2 14 8 20 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="12"
        y1="18"
        x2="12"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="9 15 12 12 15 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// File Icon for uploaded files (inspired by antd design)
const FileIcon: React.FC<{ className?: string; size?: string }> = ({ className, size = '20px' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Close Icon
const CloseIcon: React.FC<{ className?: string; size?: string }> = ({ className, size = '16px' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
  </svg>
);

// SVG Icons
const EyeIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 3.17334C5.65885 3.17334 4.16667 4.66261 4.16667 6.50016C4.16667 8.33771 5.65964 9.82699 7.5 9.82699C9.33958 9.82699 10.8333 8.33719 10.8333 6.50276C10.8333 4.66521 9.34115 3.17334 7.5 3.17334ZM7.5 8.99528C6.12161 8.99528 5 7.87612 5 6.50016C5 5.12421 6.12161 4.00505 7.5 4.00505C8.87865 4.00505 10 5.12317 10 6.50042C10 7.87508 8.85677 8.99528 7.5 8.99528ZM14.9089 6.03493C13.4974 2.84845 10.7005 0.678223 7.5 0.678223C4.29948 0.678223 1.50234 2.85105 0.0903385 6.03493C0.0407031 6.17268 0 6.37021 0 6.50016C0 6.62952 0.0406771 6.82765 0.0903385 6.94279C1.50312 10.1519 4.29948 12.3221 7.5 12.3221C10.7005 12.3221 13.4974 10.1498 14.9089 6.9654C14.9583 6.82765 15 6.60673 15 6.50016C15 6.37021 14.9583 6.17268 14.9089 6.03493ZM14.1458 6.60932C12.8203 9.61906 10.2734 11.4904 7.5 11.4904C4.72656 11.4904 2.17969 9.61958 0.859375 6.62232C0.848437 6.59373 0.834635 6.52355 0.809896 6.50536C0.81132 6.47558 0.825154 6.40704 0.829935 6.39196C2.17917 3.35787 4.72656 1.50993 7.5 1.50993C10.2734 1.50993 12.8203 3.38075 14.1406 6.37801C14.1509 6.40608 14.1647 6.47451 14.1661 6.49348C14.1641 6.52355 14.151 6.59373 14.1458 6.60932Z"
      fill="currentColor"
    />
  </svg>
);

const DownloadIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.75 1C8.75 0.585786 8.41421 0.25 8 0.25C7.58579 0.25 7.25 0.585786 7.25 1V9.18934L4.96967 6.90901C4.67678 6.61612 4.20191 6.61612 3.90901 6.90901C3.61612 7.20191 3.61612 7.67678 3.90901 7.96967L7.46967 11.5303C7.76256 11.8232 8.23744 11.8232 8.53033 11.5303L12.091 7.96967C12.3839 7.67678 12.3839 7.20191 12.091 6.90901C11.7981 6.61612 11.3232 6.61612 11.0303 6.90901L8.75 9.18934V1Z"
      fill="currentColor"
    />
    <path
      d="M1 12.75C1.41421 12.75 1.75 13.0858 1.75 13.5V14.25H14.25V13.5C14.25 13.0858 14.5858 12.75 15 12.75C15.4142 12.75 15.75 13.0858 15.75 13.5V14.25C15.75 14.6642 15.4142 15 15 15H1C0.585786 15 0.25 14.6642 0.25 14.25V13.5C0.25 13.0858 0.585786 12.75 1 12.75Z"
      fill="currentColor"
    />
  </svg>
);

const EditIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.609zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354L12.427 2.487zM12.25 6.25L10.811 4.811 2.969 12.654a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064L12.25 6.25z"
      fill="currentColor"
    />
  </svg>
);

const DeleteIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3H6.5V1.75zm4.5 1.5V1.75a1.75 1.75 0 00-1.75-1.75h-2.5A1.75 1.75 0 005 1.75V3.25H2.75a.75.75 0 000 1.5h.75v7.5A1.75 1.75 0 005.25 14h5.5A1.75 1.75 0 0012.5 12.25v-7.5h.75a.75.75 0 000-1.5H11zM4.496 4.75L4.5 4.75v7.5a.25.25 0 00.25.25h5.5a.25.25 0 00.25-.25v-7.5h.004L10.496 4.75H4.496z"
      fill="currentColor"
    />
  </svg>
);

// Utility function to generate image preview (similar to antd's getBase64)
const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Utility function to check if file type is image
const isImageFileType = (type: string): boolean => {
  return type.startsWith('image/');
};

// Enhanced image URL check (similar to antd's isImageUrl)
const isImageUrl = (file: UploadFile): boolean => {
  if (file.type && !file.thumbUrl) {
    return isImageFileType(file.type);
  }
  const url = file.thumbUrl || file.url || '';
  if (/^data:image\//.test(url)) {
    return true;
  }
  const extension = url.split('.').pop()?.toLowerCase();
  if (extension && ['webp', 'svg', 'png', 'gif', 'jpg', 'jpeg', 'jfif', 'bmp', 'dpg', 'ico', 'heic', 'heif'].includes(extension)) {
    return true;
  }
  return false;
};

// Upload List Component with card-style support
const UploadList: React.FC<{
  items: UploadFile[];
  onRemove?: (file: UploadFile) => void;
  onPreview?: (file: UploadFile) => void;
  onDownload?: (file: UploadFile) => void;
  onEdit?: (file: UploadFile) => void;
  showUploadList?: boolean | ShowUploadListInterface;
  listType?: UploadListType;
  disabled?: boolean;
  size?: UploadSize;
  uploadProps: Partial<UploadProps>;
  previewFile?: (file: File | Blob) => Promise<string>;
}> = ({
  items,
  onRemove,
  onPreview,
  onDownload,
  onEdit,
  showUploadList = true,
  listType = UploadListType.TEXT,
  disabled = false,
  size = UploadSize.MEDIUM,
  uploadProps,
  previewFile,
}) => {
  const { theme } = useTheme();
  const uploadConfig = theme.components?.upload || defaultThemeConfig.components.upload;
  const sizeConfig = uploadConfig.sizes[size];
  const [, forceUpdate] = useState({});

  // Generate image previews for files
  React.useEffect(() => {
    if (!listType.includes('picture')) {
      return;
    }
    
    items.forEach(async (file) => {
      if (
        !file.originFileObj ||
        file.thumbUrl !== undefined
      ) {
        return;
      }
      
      file.thumbUrl = '';
      if (previewFile) {
        try {
          const previewDataUrl = await previewFile(file.originFileObj);
          file.thumbUrl = previewDataUrl || '';
          forceUpdate({});
        } catch (error) {
          console.warn('Failed to generate preview:', error);
        }
      } else if (file.originFileObj && isImageFileType(file.originFileObj.type || '')) {
        try {
          const previewDataUrl = await getBase64(file.originFileObj);
          file.thumbUrl = previewDataUrl || '';
          forceUpdate({});
        } catch (error) {
          console.warn('Failed to generate preview:', error);
        }
      }
    });
  }, [listType, items, previewFile]);

  if (!showUploadList || items.length === 0) {
    return null;
  }

  const showUploadListConfig = typeof showUploadList === 'object' ? showUploadList : {
    showRemoveIcon: true,
    showPreviewIcon: true,
    showDownloadIcon: false,
    showEditIcon: false,
  };

  // List container styles
  const listContainerStyles = css({
    marginTop: sizeConfig.listMarginTop,
    display: 'flex',
    flexDirection: listType === UploadListType.PICTURE_CARD ? 'row' : 'column',
    gap: listType === UploadListType.PICTURE_CARD ? '10px' : sizeConfig.listGap,
    flexWrap: listType === UploadListType.PICTURE_CARD ? 'wrap' : 'nowrap',
  });

  // Card-style item for picture-card type
  const getCardItemStyles = (file: UploadFile) => css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '149px',
    height: '149px',
    backgroundColor: uploadConfig.base.backgroundColor,
    border: `1px solid ${uploadConfig.base.borderColor}`,
    borderRadius: uploadProps.cornerRadius || uploadConfig.base.borderRadius,
    padding: '8px',
    gap: '8px',
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    ...(file.status === UploadFileStatus.ERROR && {
      borderColor: uploadConfig.variants.error.borderColor,
      backgroundColor: uploadConfig.variants.error.backgroundColor,
    }),
  });

  // Regular list item styles
  const getListItemStyles = (file: UploadFile) => css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: sizeConfig.listItemGap,
    padding: sizeConfig.listItemPadding,
    backgroundColor: uploadProps.backgroundColor || uploadConfig.base.backgroundColor,
    border: `1px ${uploadProps.borderStyle || uploadConfig.base.borderStyle} ${uploadProps.borderColor || uploadConfig.base.borderColor}`,
    borderRadius: uploadProps.cornerRadius || uploadConfig.base.borderRadius,
    fontSize: uploadProps.textSize || sizeConfig.fontSize,
    fontFamily: uploadProps.textFont || uploadConfig.base.fontFamily,
    color: uploadProps.textColor || uploadConfig.base.textColor,
    transition: 'all 0.2s ease-in-out',
    ...(file.status === UploadFileStatus.ERROR && {
      borderColor: uploadConfig.variants.error.borderColor,
      backgroundColor: uploadConfig.variants.error.backgroundColor,
    }),
  });

  // File preview styles for card view
  const filePreviewStyles = css({
    width: '93px',
    height: '93px',
    borderRadius: '14px',
    border: `1px solid ${uploadConfig.base.borderColor}`,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  });

  // File info styles
  const fileInfoStyles = css({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: 0, // Allow text truncation
    ...(listType === UploadListType.PICTURE_CARD && {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '4px',
    }),
  });

  // File name styles
  const fileNameStyles = css({
    fontSize: listType === UploadListType.PICTURE_CARD ? '14px' : (uploadProps.textSize || sizeConfig.fontSize),
    fontWeight: uploadProps.textWeight || uploadConfig.base.fontWeight,
    color: uploadProps.textColor || uploadConfig.base.textColor,
    margin: 0,
    lineHeight: '1.43',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: listType === UploadListType.PICTURE_CARD ? '120px' : '200px',
  });

  // File size styles
  const fileSizeStyles = css({
    fontSize: listType === UploadListType.PICTURE_CARD ? '10px' : sizeConfig.descriptionFontSize,
    color: uploadConfig.base.descriptionColor,
    margin: 0,
    lineHeight: '2',
  });

  // Actions styles
  const actionsStyles = css({
    display: 'flex',
    alignItems: 'center',
    gap: sizeConfig.actionGap,
    ...(listType === UploadListType.PICTURE_CARD && {
      marginTop: '8px',
    }),
  });

  // Action button styles with black color
  const actionButtonStyles = css({
    background: 'none',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000', // Changed to black as requested
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease-in-out',
    fontSize: listType === UploadListType.PICTURE_CARD ? '14px' : '12px',
    fontWeight: '500',
    '&:hover': !disabled ? {
      backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light gray hover for black buttons
    } : {},
  });

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const renderFileIcon = (file: UploadFile) => {
    if (uploadProps.iconRender) {
      return uploadProps.iconRender(file, listType);
    }
    
    // For picture-card type, show image preview if available
    if (listType === UploadListType.PICTURE_CARD) {
      if ((file.thumbUrl || file.url) && isImageUrl(file)) {
        return (
          <img
            src={file.thumbUrl || file.url}
            alt={file.name}
            className={css({
              width: '100%',
              height: '93px',
              objectFit: 'cover',
              borderRadius: '8px',
            })}
          />
        );
      }
      
      // Show file icon for non-image files in picture-card
      return (
        <div className={css({
          width: '100%',
          height: '93px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        })}>
          <FileIcon 
            size="32px"
            className={css({
              color: uploadConfig.base.iconColor,
            })}
          />
        </div>
      );
    }
    
    // For regular list type, show small icon
    return (
      <FileIcon 
        size={sizeConfig.iconSize}
        className={css({
          color: uploadConfig.base.iconColor,
          flexShrink: 0,
        })}
      />
    );
  };

  const handleRemove = (file: UploadFile) => {
    if (disabled) return;
    onRemove?.(file);
  };

  const handlePreview = (file: UploadFile) => {
    if (disabled) return;
    onPreview?.(file);
  };

  const handleDownload = (file: UploadFile) => {
    if (disabled) return;
    onDownload?.(file);
  };

  const handleEdit = (file: UploadFile) => {
    if (disabled) return;
    onEdit?.(file);
  };

  const renderCardItem = (file: UploadFile) => (
    <div key={file.uid} className={getCardItemStyles(file)}>
      {/* Image preview area */}
      <div className={css({
        width: '100%',
        height: '93px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}>
        {renderFileIcon(file)}
      </div>
      
      {/* File info */}
      <div className={fileInfoStyles}>
        <div className={fileNameStyles} title={file.name}>
          {truncateFileName(file.name, 15)}
        </div>
        <div className={fileSizeStyles}>
          {formatFileSize(file.size)}
        </div>
      </div>
      
      {/* Edit text on the right for picture-card as per Figma */}
      {showUploadListConfig.showEditIcon && (
        <div className={css({
          position: 'absolute',
          top: '8px',
          right: '8px',
          color: '#000000',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer',
          padding: '2px 6px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: '#ffffff',
          },
        })}>
          <button
            type="button"
            onClick={() => handleEdit(file)}
            className={css({
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#000000',
              fontSize: '12px',
              fontWeight: '500',
              padding: 0,
            })}
            title="Edit"
          >
            Edit
          </button>
        </div>
      )}
      
      {/* Remove button for all files - only this action button for picture-card */}
      {showUploadListConfig.showRemoveIcon && (
        <button
          type="button"
          onClick={() => handleRemove(file)}
          className={css({
            position: 'absolute',
            top: '4px',
            left: '4px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff4d4f',
            fontSize: '12px',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#ff7875',
            },
          })}
          title="Remove"
        >
          <DeleteIcon size={10} />
        </button>
      )}
    </div>
  );

  const renderListItem = (file: UploadFile) => (
    <div key={file.uid} className={getListItemStyles(file)}>
      {/* File info section */}
      <div className={fileInfoStyles}>
        {renderFileIcon(file)}
        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          minWidth: 0,
          flex: 1,
        })}>
          <div className={fileNameStyles} title={file.name}>
            {truncateFileName(file.name, 25)}
          </div>
          <div className={fileSizeStyles}>
            {formatFileSize(file.size)}
          </div>
        </div>
      </div>
      
      {/* Actions section - aligned to the right */}
      <div className={actionsStyles}>
        {showUploadListConfig.showPreviewIcon && (
          <button
            type="button"
            onClick={() => handlePreview(file)}
            className={actionButtonStyles}
            title="Preview"
          >
            <EyeIcon size={14} />
          </button>
        )}
        {showUploadListConfig.showDownloadIcon && (
          <button
            type="button"
            onClick={() => handleDownload(file)}
            className={actionButtonStyles}
            title="Download"
          >
            <DownloadIcon size={14} />
          </button>
        )}
        {showUploadListConfig.showEditIcon && (
          <button
            type="button"
            onClick={() => handleEdit(file)}
            className={actionButtonStyles}
            title="Edit"
          >
            <EditIcon size={12} />
          </button>
        )}
        {showUploadListConfig.showRemoveIcon !== false && (
          <button
            type="button"
            onClick={() => handleRemove(file)}
            className={actionButtonStyles}
            title="Remove"
          >
            <DeleteIcon size={12} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={listContainerStyles}>
      {items.map((file) => 
        listType === UploadListType.PICTURE_CARD 
          ? renderCardItem(file)
          : renderListItem(file)
      )}
    </div>
  );
};

// Main Upload Component
const UploadInternal: React.FC<UploadProps> = ({
  accept,
  action,
  beforeUpload,
  customRequest,
  data,
  defaultFileList = [],
  directory = false,
  disabled = false,
  fileList: propFileList,
  headers,
  listType = UploadListType.TEXT,
  maxCount,
  method = 'POST',
  multiple = false,
  name = 'file',
  openFileDialogOnClick = true,
  previewFile,
  showUploadList = true,
  supportServerRender = true,
  uploadType = UploadType.SELECT,
  withCredentials = false,
  layout = UploadLayout.VERTICAL,
  hasError = false,
  onChange,
  onDrop,
  onPreview,
  onRemove,
  onDownload,
  onEdit,
  size = UploadSize.MEDIUM,
  className = '',
  style = {},
  rootClassName = '',
  iconRender,
  itemRender,
  title,
  description,
  icon,
  dragTitle,
  dragDescription,
  dragIcon,
  showIcon = true, // Default to true, but can be disabled
  backgroundColor,
  borderColor,
  cornerRadius,
  borderStyle,
  hoverBackgroundColor,
  hoverBorderColor,
  textColor,
  textSize,
  textWeight,
  textFont,
  spacing,
  width,
  height,
  children,
  ...restProps
}) => {
  // Enforce maxCount=1 and multiple=false for picture-card
  const isPictureCard = listType === UploadListType.PICTURE_CARD;
  const effectiveMaxCount = isPictureCard ? 1 : maxCount;
  const effectiveMultiple = isPictureCard ? false : multiple;

  const { theme } = useTheme();
  const uploadConfig = theme.components?.upload || defaultThemeConfig.components.upload;
  const sizeConfig = uploadConfig.sizes[size];
  const variantConfig = hasError ? uploadConfig.variants.error : uploadConfig.variants.default;

  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(defaultFileList);
  const [dragState, setDragState] = useState<'drop' | 'drag'>('drop');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileList = propFileList !== undefined ? propFileList : internalFileList;

  // Upload area styles with layout support
  const uploadAreaStyles = css({
    display: 'flex',
    flexDirection: layout === UploadLayout.HORIZONTAL ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: layout === UploadLayout.HORIZONTAL ? 'flex-start' : 'center',
    gap: spacing || sizeConfig.gap,
    padding: spacing || sizeConfig.padding,
    backgroundColor: backgroundColor || variantConfig.backgroundColor,
    border: `2px ${borderStyle || variantConfig.borderStyle} ${borderColor || variantConfig.borderColor}`,
    borderRadius: cornerRadius || uploadConfig.base.borderRadius,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    fontFamily: textFont || uploadConfig.base.fontFamily,
    fontSize: textSize || sizeConfig.fontSize,
    color: textColor || uploadConfig.base.textColor,
    opacity: disabled ? 0.6 : 1,
    width: width || layout === UploadLayout.HORIZONTAL ? sizeConfig.width : sizeConfig.width,
    minHeight: height || layout === UploadLayout.HORIZONTAL ? 'auto' : sizeConfig.minHeight,
    ...(dragState === 'drag' && uploadType === UploadType.DRAG && {
      backgroundColor: hoverBackgroundColor || variantConfig.hoverBackgroundColor,
      borderColor: hoverBorderColor || variantConfig.hoverBorderColor,
    }),
    '&:hover': !disabled ? {
      backgroundColor: hoverBackgroundColor || variantConfig.hoverBackgroundColor,
      borderColor: hoverBorderColor || variantConfig.hoverBorderColor,
    } : {},
  });

  // Icon container styles - only show if showIcon is true
  const iconContainerStyles = css({
    display: showIcon ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: layout === UploadLayout.HORIZONTAL ? '32px' : sizeConfig.iconContainerSize,
    height: layout === UploadLayout.HORIZONTAL ? '32px' : sizeConfig.iconContainerSize,
    backgroundColor: layout === UploadLayout.HORIZONTAL ? '#FFFFFF' : uploadConfig.base.iconBackgroundColor,
    borderRadius: layout === UploadLayout.HORIZONTAL ? '2px' : '50%',
    color: hasError ? variantConfig.borderColor : uploadConfig.base.iconColor,
    padding: layout === UploadLayout.HORIZONTAL ? '2px' : '0',
    flexShrink: 0,
    ...(layout === UploadLayout.VERTICAL && {
      marginBottom: '8px',
    }),
  });

  // Text container styles
  const textContainerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: layout === UploadLayout.HORIZONTAL ? 'flex-start' : 'center',
    gap: '4px',
    textAlign: layout === UploadLayout.HORIZONTAL ? 'left' : 'center',
    flex: layout === UploadLayout.HORIZONTAL ? 1 : 'none',
  });

  // Title styles
  const titleStyles = css({
    fontSize: textSize || sizeConfig.fontSize,
    fontWeight: textWeight || uploadConfig.base.fontWeight,
    color: hasError ? variantConfig.borderColor : (textColor || uploadConfig.base.textColor),
    margin: 0,
    lineHeight: '1.43',
  });

  // Description styles
  const descriptionStyles = css({
    fontSize: sizeConfig.descriptionFontSize,
    color: uploadConfig.base.descriptionColor,
    margin: 0,
  });

  // Handle file selection
  const handleFileSelect = useCallback(async (files: File[]) => {
    if (disabled) return;

    let selectedFiles = [...files];

    // Apply maxCount limit
    if (effectiveMaxCount && effectiveMaxCount > 0) {
      if (effectiveMaxCount === 1) {
        selectedFiles = selectedFiles.slice(0, 1);
      } else {
        const remainingSlots = effectiveMaxCount - fileList.length;
        selectedFiles = selectedFiles.slice(0, remainingSlots);
      }
    }

    // Process files through beforeUpload
    const processedFiles: UploadFile[] = [];
    for (const file of selectedFiles) {
      if (beforeUpload) {
        const result = await beforeUpload(file, selectedFiles);
        if (result === false) continue;
      }
      processedFiles.push(file2Obj(file));
    }

    if (processedFiles.length === 0) return;

    // Update file list
    let newFileList: UploadFile[];
    if (effectiveMaxCount === 1) {
      newFileList = processedFiles;
    } else {
      newFileList = [...fileList, ...processedFiles];
    }

    if (propFileList === undefined) {
      setInternalFileList(newFileList);
    }

    // Trigger onChange
    processedFiles.forEach((file) => {
      onChange?.({
        file,
        fileList: newFileList,
      });
    });
  }, [disabled, effectiveMaxCount, fileList, beforeUpload, propFileList, onChange]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = getFileFromEvent(e);
    handleFileSelect(files);
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setDragState('drag');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setDragState('drop');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setDragState('drop');
    
    const files = getFileFromEvent(e);
    handleFileSelect(files);
    onDrop?.(e);
  };

  // Handle click
  const handleClick = () => {
    if (disabled || !openFileDialogOnClick) return;
    fileInputRef.current?.click();
  };

  // Handle file removal for picture-card
  const handleRemove = async (file: UploadFile) => {
    if (disabled) return;
    
    if (onRemove) {
      const result = await onRemove(file);
      if (result === false) return;
    }

    const newFileList = fileList.filter(f => f.uid !== file.uid);
    
    if (propFileList === undefined) {
      setInternalFileList(newFileList);
    }

    onChange?.({
      file: { ...file, status: UploadFileStatus.REMOVED },
      fileList: newFileList,
    });

    // For picture-card, trigger file input click after removal
    if (isPictureCard && fileInputRef.current && !disabled && openFileDialogOnClick) {
      fileInputRef.current.click();
    }
  };

  // Handle file edit
  const handleEdit = (file: UploadFile) => {
    if (disabled) return;
    onEdit?.(file);
  };

  // Render upload content
  const renderUploadContent = () => {
    if (children) {
      return children;
    }

    const currentTitle = uploadType === UploadType.DRAG ? (dragTitle || title) : title;
    const currentDescription = uploadType === UploadType.DRAG ? (dragDescription || description) : description;
    const currentIcon = uploadType === UploadType.DRAG ? (dragIcon || icon) : icon;

    return (
      <>
        {showIcon && (
          <div className={iconContainerStyles}>
            {currentIcon || <DefaultUploadIcon size={size as string} />}
          </div>
        )}
        <div className={textContainerStyles}>
          {currentTitle && (
            <div className={titleStyles}>
              {currentTitle}
            </div>
          )}
          {currentDescription && (
            <div className={descriptionStyles}>
              {currentDescription}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className={`upload-wrapper ${rootClassName}`} style={style}>
      {(!isPictureCard || fileList.length === 0) && (
        <div
          className={`upload-area ${className} ${uploadAreaStyles}`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          {...restProps}
        >
          {renderUploadContent()}
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={effectiveMultiple}
            disabled={disabled}
            onChange={handleInputChange}
            style={{ display: 'none' }}
            {...(directory && { webkitdirectory: true } as any)}
          />
        </div>
      )}
      
      {showUploadList && (
        <UploadList
          items={fileList}
          onRemove={handleRemove}
          onPreview={onPreview}
          onDownload={onDownload}
          onEdit={handleEdit}
          showUploadList={showUploadList}
          listType={listType as UploadListType}
          disabled={disabled}
          size={size as UploadSize}
          uploadProps={{
            size,
            layout,
            hasError,
            iconRender,
            width,
            height,
          }}
          previewFile={previewFile}
        />
      )}
    </div>
  );
};

// ─── Upload V2 ──────────────────────────────────────────────────────

export interface UploadV2Props {
  file: File | null
  onFileChange: (file: File | null) => void
  accept?: string
  maxFileSize?: number
  disabled?: boolean
  deleteDisabled?: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  uploadButtonText?: string
  tryAgainButtonText?: string
  icon?: React.ReactNode
  errorIcon?: React.ReactNode
  deleteIcon?: React.ReactNode
  uploadButtonIcon?: React.ReactNode
  uploadError?: string
  fileSizeErrorMessage?: string
  fileTypeErrorMessage?: string
  className?: string
  style?: CSSProperties
  classNames?: {
    root?: string
    uploadZone?: string
    fileInfo?: string
    errorState?: string
    icon?: string
    textContainer?: string
    title?: string
    description?: string
    button?: string
    deleteButton?: string
    fileName?: string
    fileSize?: string
    errorText?: string
  }
  styles?: {
    root?: CSSProperties
    uploadZone?: CSSProperties
    fileInfo?: CSSProperties
    errorState?: CSSProperties
    icon?: CSSProperties
    textContainer?: CSSProperties
    title?: CSSProperties
    description?: CSSProperties
    button?: CSSProperties
    deleteButton?: CSSProperties
    fileName?: CSSProperties
    fileSize?: CSSProperties
    errorText?: CSSProperties
  }
}

const DefaultUploadV2Icon: React.FC<{ width?: string; height?: string }> = ({
  width = '52',
  height = '60',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 52 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.3885 2.04791L1.78971 10.8319C0.854135 11.084 0.304603 12.0849 0.562294 13.0676L12.3839 58.1483C12.6416 59.131 13.6089 59.7232 14.5445 59.4711L47.1433 50.6871C48.0789 50.435 48.6284 49.4341 48.3707 48.4514L36.5491 3.37075C36.2914 2.38807 35.3241 1.79581 34.3885 2.04791Z"
      fill="#DCDCDC"
      fillOpacity="0.5"
    />
    <path
      d="M49.2865 18.7033C49.3075 18.7091 49.3201 18.7309 49.3147 18.752L39.2413 57.8061C38.941 58.9705 37.7584 59.653 36.6 59.3305L4.84383 50.4911C3.6854 50.1687 2.98978 48.9634 3.29011 47.799L15.0753 2.10825C15.3757 0.943897 16.5582 0.261398 17.7167 0.583848L42.9796 7.61584C42.982 7.61652 42.9835 7.61905 42.9828 7.6215C42.9825 7.62266 42.9827 7.6239 42.9833 7.62495L43.0662 7.77145L49.2624 18.6843C49.2677 18.6936 49.2764 18.7004 49.2865 18.7033Z"
      fill="white"
      stroke="#E6E6E6"
      strokeWidth="0.544314"
      strokeMiterlimit="10"
    />
    <path
      d="M48.7175 18.9385C48.915 19.3028 48.6607 19.7419 48.2522 19.7419L43.4013 19.7419C41.1653 19.7419 39.5608 17.5148 40.2607 15.3824L42.4488 8.71491C42.5495 8.40796 42.9603 8.36299 43.1332 8.63999L48.7175 18.9385Z"
      fill="#3D445C"
      fillOpacity="0.12"
    />
    <path
      d="M48.9345 18.1882C49.1762 18.6123 48.796 19.1118 48.3302 18.9822L43.5246 17.6445C41.787 17.1608 40.7435 15.3529 41.194 13.6064L42.7466 7.58702C42.7633 7.52251 42.8493 7.5121 42.8825 7.57058L48.9345 18.1882Z"
      fill="#D9D8D8"
      stroke="#E6E6E6"
      strokeWidth="0.544314"
      strokeMiterlimit="10"
    />
    <path d="M39.4185 24.5458L19.2157 18.7824C18.739 18.6464 18.2498 18.9247 18.1231 19.404C17.9964 19.8833 18.2802 20.382 18.7569 20.518L38.9597 26.2814C39.4364 26.4174 39.9256 26.1391 40.0523 25.6598C40.179 25.1806 39.8952 24.6818 39.4185 24.5458Z" fill="#D4D4D4" />
    <path d="M29.1369 16.713L20.4208 14.2265C19.9441 14.0905 19.4549 14.3688 19.3282 14.8481C19.2015 15.3273 19.4853 15.8261 19.962 15.9621L28.6781 18.4486C29.1548 18.5846 29.644 18.3063 29.7707 17.827C29.8974 17.3478 29.6136 16.849 29.1369 16.713Z" fill="#D4D4D4" />
    <path d="M34.5908 27.8352L18.0683 23.1217C17.5915 22.9857 17.1024 23.264 16.9757 23.7433C16.849 24.2226 17.1327 24.7214 17.6095 24.8574L34.132 29.5709C34.6087 29.7069 35.0979 29.4286 35.2246 28.9493C35.3513 28.47 35.0675 27.9712 34.5908 27.8352Z" fill="#D4D4D4" />
    <path d="M26.764 37.0386L15.2753 33.7611C14.7986 33.6251 14.3094 33.9034 14.1827 34.3827C14.056 34.862 14.3398 35.3608 14.8165 35.4968L26.3052 38.7743C26.7819 38.9103 27.2711 38.632 27.3978 38.1527C27.5245 37.6734 27.2407 37.1746 26.764 37.0386Z" fill="#D4D4D4" />
    <path d="M21.0469 30.508L16.4804 29.2052C16.0037 29.0692 15.5145 29.3475 15.3878 29.8268C15.2611 30.3061 15.5448 30.8049 16.0216 30.9409L20.5881 32.2436C21.0648 32.3796 21.554 32.1013 21.6807 31.622C21.8074 31.1427 21.5236 30.644 21.0469 30.508Z" fill="#D4D4D4" />
    <path d="M23.3997 40.7453L14.1288 38.1005C13.6521 37.9645 13.1629 38.2428 13.0362 38.7221C12.9095 39.2014 13.1933 39.7002 13.67 39.8362L22.9409 42.4809C23.4176 42.6169 23.9068 42.3386 24.0335 41.8594C24.1602 41.3801 23.8764 40.8813 23.3997 40.7453Z" fill="#D4D4D4" />
  </svg>
)

const DefaultUploadV2ErrorIcon: React.FC<{ width?: string; height?: string }> = ({
  width = '52',
  height = '60',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 52 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.3885 2.04791L1.78971 10.8319C0.854135 11.084 0.304603 12.0849 0.562294 13.0676L12.3839 58.1483C12.6416 59.131 13.6089 59.7232 14.5445 59.4711L47.1433 50.6871C48.0789 50.435 48.6284 49.4341 48.3707 48.4514L36.5491 3.37075C36.2914 2.38807 35.3241 1.79581 34.3885 2.04791Z"
      fill="#DCDCDC"
      fillOpacity="0.5"
    />
    <path
      d="M49.2865 18.7033C49.3075 18.7091 49.3201 18.7309 49.3147 18.752L39.2413 57.8061C38.941 58.9705 37.7584 59.653 36.6 59.3305L4.84383 50.4911C3.6854 50.1687 2.98978 48.9634 3.29011 47.799L15.0753 2.10825C15.3757 0.943897 16.5582 0.261398 17.7167 0.583848L42.9796 7.61584C42.982 7.61652 42.9835 7.61905 42.9828 7.6215C42.9825 7.62266 42.9827 7.6239 42.9833 7.62495L43.0662 7.77145L49.2624 18.6843C49.2677 18.6936 49.2764 18.7004 49.2865 18.7033Z"
      fill="white"
      stroke="#E6E6E6"
      strokeWidth="0.544314"
      strokeMiterlimit="10"
    />
    <path
      d="M48.7175 18.9385C48.915 19.3028 48.6607 19.7419 48.2522 19.7419L43.4013 19.7419C41.1653 19.7419 39.5608 17.5148 40.2607 15.3824L42.4488 8.71491C42.5495 8.40796 42.9603 8.36299 43.1332 8.63999L48.7175 18.9385Z"
      fill="#3D445C"
      fillOpacity="0.12"
    />
    <path
      d="M48.9345 18.1882C49.1762 18.6123 48.796 19.1118 48.3302 18.9822L43.5246 17.6445C41.787 17.1608 40.7435 15.3529 41.194 13.6064L42.7466 7.58702C42.7633 7.52251 42.8493 7.5121 42.8825 7.57058L48.9345 18.1882Z"
      fill="#D9D8D8"
      stroke="#E6E6E6"
      strokeWidth="0.544314"
      strokeMiterlimit="10"
    />
    <path d="M39.4185 24.5458L19.2157 18.7824C18.739 18.6464 18.2498 18.9247 18.1231 19.404C17.9964 19.8833 18.2802 20.382 18.7569 20.518L38.9597 26.2814C39.4364 26.4174 39.9256 26.1391 40.0523 25.6598C40.179 25.1806 39.8952 24.6818 39.4185 24.5458Z" fill="#D4D4D4" />
    <path d="M29.1369 16.713L20.4208 14.2265C19.9441 14.0905 19.4549 14.3688 19.3282 14.8481C19.2015 15.3273 19.4853 15.8261 19.962 15.9621L28.6781 18.4486C29.1548 18.5846 29.644 18.3063 29.7707 17.827C29.8974 17.3478 29.6136 16.849 29.1369 16.713Z" fill="#D4D4D4" />
    <path d="M34.5908 27.8352L18.0683 23.1217C17.5915 22.9857 17.1024 23.264 16.9757 23.7433C16.849 24.2226 17.1327 24.7214 17.6095 24.8574L34.132 29.5709C34.6087 29.7069 35.0979 29.4286 35.2246 28.9493C35.3513 28.47 35.0675 27.9712 34.5908 27.8352Z" fill="#D4D4D4" />
    <path d="M26.764 37.0386L15.2753 33.7611C14.7986 33.6251 14.3094 33.9034 14.1827 34.3827C14.056 34.862 14.3398 35.3608 14.8165 35.4968L26.3052 38.7743C26.7819 38.9103 27.2711 38.632 27.3978 38.1527C27.5245 37.6734 27.2407 37.1746 26.764 37.0386Z" fill="#D4D4D4" />
    <path d="M21.0469 30.508L16.4804 29.2052C16.0037 29.0692 15.5145 29.3475 15.3878 29.8268C15.2611 30.3061 15.5448 30.8049 16.0216 30.9409L20.5881 32.2436C21.0648 32.3796 21.554 32.1013 21.6807 31.622C21.8074 31.1427 21.5236 30.644 21.0469 30.508Z" fill="#D4D4D4" />
    <path d="M23.3997 40.7453L14.1288 38.1005C13.6521 37.9645 13.1629 38.2428 13.0362 38.7221C12.9095 39.2014 13.1933 39.7002 13.67 39.8362L22.9409 42.4809C23.4176 42.6169 23.9068 42.3386 24.0335 41.8594C24.1602 41.3801 23.8764 40.8813 23.3997 40.7453Z" fill="#D4D4D4" />
    <circle cx="44" cy="52" r="7" fill="#FA3A2E" />
    <path d="M41.5 49.5L46.5 54.5M46.5 49.5L41.5 54.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const DefaultDeleteV2Icon: React.FC<{ size?: string }> = ({ size = '24' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3V4H4V6H5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"
      fill="#e23b5d"
    />
  </svg>
)

const DefaultUploadButtonIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 16V4M12 4L8 8M12 4L16 8M4 18H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const UploadV2Internal: React.FC<UploadV2Props> = ({
  file,
  onFileChange,
  accept,
  maxFileSize,
  disabled = false,
  deleteDisabled = false,
  title,
  description,
  uploadButtonText = 'Upload File',
  tryAgainButtonText = 'Try Again',
  icon,
  errorIcon,
  deleteIcon,
  uploadButtonIcon,
  uploadError = '',
  fileSizeErrorMessage = 'File size exceeds the limit.',
  fileTypeErrorMessage = 'Invalid Format',
  className = '',
  style,
  classNames = {},
  styles = {},
}) => {
  const { theme } = useTheme()
  const config =
    theme.components?.uploadV2 || defaultThemeConfig.components.uploadV2

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [validationError, setValidationError] = useState('')

  const validateFile = useCallback(
    (selectedFile: File): string | null => {
      if (maxFileSize && selectedFile.size > maxFileSize) {
        return fileSizeErrorMessage
      }
      if (accept) {
        const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase())
        const fileName = selectedFile.name.toLowerCase()
        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileName.endsWith(type)
          }
          if (type.endsWith('/*')) {
            return selectedFile.type.startsWith(type.replace('/*', '/'))
          }
          return selectedFile.type === type
        })
        if (!isAccepted) {
          return fileTypeErrorMessage
        }
      }
      return null
    },
    [accept, maxFileSize, fileSizeErrorMessage, fileTypeErrorMessage]
  )

  const handleFile = useCallback(
    (selectedFile: File) => {
      const error = validateFile(selectedFile)
      if (error) {
        setValidationError(error)
        return
      }
      setValidationError('')
      onFileChange(selectedFile)
    },
    [onFileChange, validateFile]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
      if (disabled) return
      const droppedFile = e.dataTransfer.files?.[0]
      if (droppedFile) {
        handleFile(droppedFile)
      }
    },
    [disabled, handleFile]
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) setIsDragOver(true)
    },
    [disabled]
  )

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
    },
    []
  )

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
    e.target.value = ''
  }

  const handleRemoveFile = () => {
    if (deleteDisabled) return
    setValidationError('')
    onFileChange(null)
  }

  const handleTryAgain = () => {
    setValidationError('')
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1048576) {
      return `${(bytes / 1048576).toFixed(2)} MB`
    }
    if (bytes >= 1000) {
      return `${(bytes / 1000).toFixed(1)} KB`
    }
    return `${bytes} Bytes`
  }

  const renderIcon = useMemo(() => icon || <DefaultUploadV2Icon width={config.iconSize.width} height={config.iconSize.height} />, [icon, config.iconSize])
  const renderErrorIcon = useMemo(() => errorIcon || <DefaultUploadV2ErrorIcon width={config.iconSize.width} height={config.iconSize.height} />, [errorIcon, config.iconSize])
  const renderDeleteIcon = useMemo(() => deleteIcon || <DefaultDeleteV2Icon size={config.deleteButton.iconSize} />, [deleteIcon, config.deleteButton.iconSize])
  const renderUploadButtonIcon = useMemo(() => uploadButtonIcon || <DefaultUploadButtonIcon />, [uploadButtonIcon])

  const baseZoneStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: config.base.gap,
    padding: config.base.padding,
    borderRadius: config.base.borderRadius,
    fontFamily: config.base.fontFamily,
    transition: 'all 0.2s ease-in-out',
  })

  const buttonBaseStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    backgroundColor: config.button.backgroundColor,
    border: `${config.button.borderWidth} solid ${config.button.borderColor}`,
    borderRadius: config.button.borderRadius,
    paddingLeft: config.button.paddingX,
    paddingRight: config.button.paddingX,
    paddingTop: config.button.paddingY,
    paddingBottom: config.button.paddingY,
    fontSize: config.button.fontSize,
    fontWeight: config.button.fontWeight,
    color: config.button.textColor,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
    transition: 'background-color 0.15s ease',
    '&:hover': {
      backgroundColor: config.button.hoverBackgroundColor,
    },
  })

  const iconWrapperStyle = css({
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })

  const textContainerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  })

  const titleStyle = css({
    fontSize: config.base.titleFontSize,
    fontWeight: config.base.titleFontWeight,
    color: config.base.titleColor,
    lineHeight: '20px',
  })

  const descriptionStyle = css({
    fontSize: config.base.descriptionFontSize,
    color: config.base.descriptionColor,
    lineHeight: '16px',
  })

  const fileInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept={accept}
      onChange={handleInputChange}
      style={{ display: 'none' }}
    />
  )

  if (validationError) {
    const errorZoneStyle = css({
      backgroundColor: config.variants.error.backgroundColor,
      border: `${config.base.borderWidth} ${config.base.borderStyle} ${config.variants.error.borderColor}`,
    })

    const errorTextStyle = css({
      fontSize: config.base.descriptionFontSize,
      color: config.variants.error.errorTextColor,
      lineHeight: '16px',
      whiteSpace: 'pre-wrap' as const,
    })

    return (
      <div
        className={`upload-v2-root ${className} ${classNames.root || ''}`}
        style={{ ...style, ...styles.root }}
      >
        {fileInput}
        <div
          className={`${baseZoneStyle} ${errorZoneStyle} ${classNames.errorState || ''}`}
          style={styles.errorState}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', gap: config.base.gap, flex: 1 }}
          >
            <div className={`${iconWrapperStyle} ${classNames.icon || ''}`} style={styles.icon}>
              {renderErrorIcon}
            </div>
            <div className={`${textContainerStyle} ${classNames.textContainer || ''}`} style={styles.textContainer}>
              <span className={`${titleStyle} ${classNames.title || ''}`} style={styles.title}>
                {title}
              </span>
              <span className={`${errorTextStyle} ${classNames.errorText || ''}`} style={styles.errorText}>
                {validationError}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleTryAgain}
            className={`${buttonBaseStyle} ${classNames.button || ''}`}
            style={styles.button}
          >
            {tryAgainButtonText}
          </button>
        </div>
      </div>
    )
  }

  if (file) {
    const hasUploadError = !!uploadError
    const fileVariant = hasUploadError
      ? config.variants.fileSelectedError
      : config.variants.fileSelected

    const fileZoneStyle = css({
      backgroundColor: fileVariant.backgroundColor,
      border: `1px ${fileVariant.borderStyle} ${fileVariant.borderColor}`,
    })

    const fileNameStyle = css({
      fontSize: config.fileInfo.nameFontSize,
      fontWeight: config.fileInfo.nameFontWeight,
      color: config.fileInfo.nameColor,
      lineHeight: '20px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const,
    })

    const fileSizeStyle = css({
      fontSize: config.fileInfo.sizeFontSize,
      color: config.fileInfo.sizeColor,
      lineHeight: '16px',
    })

    const deleteButtonStyle = css({
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `${config.deleteButton.borderWidth} solid ${config.deleteButton.borderColor}`,
      borderRadius: config.deleteButton.borderRadius,
      backgroundColor: config.deleteButton.backgroundColor,
      padding: config.deleteButton.padding,
      cursor: deleteDisabled ? 'not-allowed' : 'pointer',
      opacity: deleteDisabled ? 0.5 : 1,
      transition: 'background-color 0.15s ease',
      '&:hover': deleteDisabled ? {} : {
        backgroundColor: config.deleteButton.hoverBackgroundColor,
      },
    })

    const errorMsgStyle = css({
      fontSize: config.base.descriptionFontSize,
      color: config.variants.error.errorTextColor,
      lineHeight: '16px',
      marginTop: '2px',
    })

    return (
      <div
        className={`upload-v2-root ${className} ${classNames.root || ''}`}
        style={{ ...style, ...styles.root }}
      >
        {fileInput}
        <div
          className={`${baseZoneStyle} ${fileZoneStyle} ${classNames.fileInfo || ''}`}
          style={styles.fileInfo}
        >
          <div className={`${iconWrapperStyle} ${classNames.icon || ''}`} style={styles.icon}>
            {hasUploadError ? renderErrorIcon : renderIcon}
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span className={`${fileNameStyle} ${classNames.fileName || ''}`} style={styles.fileName}>
              {file.name}
            </span>
            <span className={`${fileSizeStyle} ${classNames.fileSize || ''}`} style={styles.fileSize}>
              {formatFileSize(file.size)}
            </span>
            {hasUploadError && (
              <span className={errorMsgStyle}>
                {uploadError}
              </span>
            )}
          </div>
          <button
            type="button"
            className={`${deleteButtonStyle} ${classNames.deleteButton || ''}`}
            style={styles.deleteButton}
            onClick={handleRemoveFile}
            aria-label="Remove file"
            disabled={deleteDisabled}
          >
            {renderDeleteIcon}
          </button>
        </div>
      </div>
    )
  }

  const defaultZoneStyle = css({
    backgroundColor: isDragOver
      ? config.variants.drag.backgroundColor
      : config.variants.default.backgroundColor,
    border: `${config.base.borderWidth} ${config.base.borderStyle} ${
      isDragOver
        ? config.variants.drag.borderColor
        : config.variants.default.borderColor
    }`,
    cursor: disabled ? 'not-allowed' : 'default',
    opacity: disabled ? 0.5 : 1,
    '&:hover': !disabled
      ? {
          backgroundColor: config.variants.default.hoverBackgroundColor,
          borderColor: config.variants.default.hoverBorderColor,
        }
      : {},
  })

  return (
    <div
      className={`upload-v2-root ${className} ${classNames.root || ''}`}
      style={{ ...style, ...styles.root }}
    >
      {fileInput}
      <div
        className={`${baseZoneStyle} ${defaultZoneStyle} ${classNames.uploadZone || ''}`}
        style={styles.uploadZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: config.base.gap, flex: 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
          onClick={handleClick}
        >
          <div className={`${iconWrapperStyle} ${classNames.icon || ''}`} style={styles.icon}>
            {renderIcon}
          </div>
          <div className={`${textContainerStyle} ${classNames.textContainer || ''}`} style={styles.textContainer}>
            {title && (
              <span className={`${titleStyle} ${classNames.title || ''}`} style={styles.title}>
                {title}
              </span>
            )}
            {description && (
              <span className={`${descriptionStyle} ${classNames.description || ''}`} style={styles.description}>
                {description}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className={`${buttonBaseStyle} ${classNames.button || ''}`}
          style={styles.button}
        >
          {renderUploadButtonIcon}
          <span>{uploadButtonText}</span>
        </button>
      </div>
    </div>
  )
}

// ─── Combined Upload Component ─────────────────────────────────────

// V2 is now the default. Use version="v1" to use the legacy Upload component.
type UploadCombinedProps =
  | (UploadProps & { version: 'v1' })
  | (UploadV2Props & { version?: 'v2' })

// Main Upload Component without ThemeProvider wrapper
// V2 is now the default. Use version="v1" to use the legacy Upload component.
const Upload: React.FC<UploadCombinedProps> = (props) => {
  // If explicitly requesting V1, use V1
  if ('version' in props && props.version === 'v1') {
    const { version: _, ...v1Props } = props as UploadProps & { version: 'v1' }
    return <UploadInternal {...v1Props} />
  }

  // Default to V2 (when version is 'v2', undefined, or not provided)
  const { version: _, ...v2Props } = props as UploadV2Props & { version?: 'v2' }
  return <UploadV2Internal {...v2Props} />
};

// Static properties
Upload.displayName = 'Upload';

export default Upload; 