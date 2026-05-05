import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeProvider from '../../ThemeProvider';
import Upload, { UploadSize, UploadType, UploadListType, UploadFileStatus } from '../index';
import { UploadFile } from '../index';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

// Mock file for testing
const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File(['test content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('Upload Component', () => {
  const defaultProps = {
    title: 'Upload file',
    description: 'Click to select files',
  };

  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 50,
      top: 100,
      left: 100,
      bottom: 150,
      right: 200,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    })) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders default upload component', () => {
    renderWithTheme(<Upload {...defaultProps} />);
    expect(screen.getByText('Upload file')).toBeInTheDocument();
    expect(screen.getByText('Click to select files')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = renderWithTheme(<Upload {...defaultProps} size={UploadSize.SMALL} />);
    expect(screen.getByText('Upload file')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Upload {...defaultProps} size={UploadSize.LARGE} />
      </ThemeProvider>
    );
    expect(screen.getByText('Upload file')).toBeInTheDocument();
  });

  it('renders drag and drop type', () => {
    render(
      <Upload
        uploadType={UploadType.DRAG}
        dragTitle="Drag files here"
        dragDescription="Or click to select"
      />
    );
    expect(screen.getByText('Drag files here')).toBeInTheDocument();
    expect(screen.getByText('Or click to select')).toBeInTheDocument();
  });

  it('handles file selection', async () => {
    const handleChange = jest.fn();
    const file = createMockFile('test.png', 1024, 'image/png');

    renderWithTheme(
      <Upload
        {...defaultProps}
        onChange={handleChange}
        accept=".png"
      />
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
      
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
      });
    }
  });

  it('shows disabled state', () => {
    renderWithTheme(
      <Upload
        {...defaultProps}
        disabled={true}
      />
    );
    
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('renders with custom styling', () => {
    renderWithTheme(
      <Upload
        {...defaultProps}
        backgroundColor="#FF0000"
        textColor="#FFFFFF"
        cornerRadius="12px"
      />
    );
    
    expect(screen.getByText('Upload file')).toBeInTheDocument();
  });

  it('handles multiple file selection', async () => {
    const handleChange = jest.fn();
    const files = [
      createMockFile('test1.png', 1024, 'image/png'),
      createMockFile('test2.png', 2048, 'image/png'),
    ];

    renderWithTheme(
      <Upload
        {...defaultProps}
        multiple={true}
        onChange={handleChange}
      />
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    if (input) {
      fireEvent.change(input, { target: { files } });
      
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
      });
    }
  });

  it('respects maxCount limit', async () => {
    const handleChange = jest.fn();
    const files = [
      createMockFile('test1.png', 1024, 'image/png'),
      createMockFile('test2.png', 2048, 'image/png'),
      createMockFile('test3.png', 3072, 'image/png'),
    ];

    renderWithTheme(
      <Upload
        {...defaultProps}
        multiple={true}
        maxCount={2}
        onChange={handleChange}
      />
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    if (input) {
      fireEvent.change(input, { target: { files } });
      
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
        const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0];
        expect(lastCall.fileList).toHaveLength(2);
      });
    }
  });

  it('renders file list when showUploadList is true', () => {
    const defaultFileList = [
      {
        uid: '1',
        name: 'test.png',
        size: 1024,
        type: 'image/png',
        status: UploadFileStatus.DONE,
      },
    ];

    renderWithTheme(
      <Upload
        {...defaultProps}
        defaultFileList={defaultFileList}
        showUploadList={true}
      />
    );

    expect(screen.getByText('test.png')).toBeInTheDocument();
    expect(screen.getByText('1.0 KB')).toBeInTheDocument();
  });

  it('hides file list when showUploadList is false', () => {
    const defaultFileList = [
      {
        uid: '1',
        name: 'test.png',
        size: 1024,
        type: 'image/png',
        status: UploadFileStatus.DONE,
      },
    ];

    renderWithTheme(
      <Upload
        {...defaultProps}
        defaultFileList={defaultFileList}
        showUploadList={false}
      />
    );

    expect(screen.queryByText('test.png')).not.toBeInTheDocument();
  });

  it('handles beforeUpload validation', async () => {
    const handleChange = jest.fn();
    const beforeUpload = jest.fn().mockResolvedValue(false);
    const file = createMockFile('test.txt', 1024, 'text/plain');

    renderWithTheme(
      <Upload
        {...defaultProps}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      />
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
      
      await waitFor(() => {
        expect(beforeUpload).toHaveBeenCalledWith(file, [file]);
        expect(handleChange).not.toHaveBeenCalled(); // Should not trigger onChange if rejected
      });
    }
  });

  it('renders custom upload icon', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom Icon</div>;
    
    renderWithTheme(
      <Upload
        {...defaultProps}
        icon={<CustomIcon />}
      />
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('handles file removal', async () => {
    const handleChange = jest.fn();
    const onRemove = jest.fn().mockResolvedValue(true);
    const defaultFileList = [
      {
        uid: '1',
        name: 'test.png',
        size: 1024,
        type: 'image/png',
        status: UploadFileStatus.DONE,
      },
    ];

    renderWithTheme(
      <Upload
        {...defaultProps}
        defaultFileList={defaultFileList}
        showUploadList={true}
        onRemove={onRemove}
        onChange={handleChange}
      />
    );

    const removeButton = screen.getByTitle('Remove');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(onRemove).toHaveBeenCalled();
    });
  });

  it('renders picture-card list type', () => {
    const defaultFileList = [
      {
        uid: '1',
        name: 'test.png',
        size: 1024,
        type: 'image/png',
        status: UploadFileStatus.DONE,
        url: 'https://example.com/image.png',
      },
    ];

    renderWithTheme(
      <Upload
        {...defaultProps}
        listType={UploadListType.PICTURE_CARD}
        defaultFileList={defaultFileList}
      />
    );

    expect(screen.getByText('test.png')).toBeInTheDocument();
  });

  it('truncates long file names', () => {
    const longFileName = 'this-is-a-very-long-file-name-that-should-be-truncated.png';
    const defaultFileList = [
      {
        uid: '1',
        name: longFileName,
        size: 1024,
        type: 'image/png',
        status: UploadFileStatus.DONE,
      },
    ];

    renderWithTheme(
      <Upload
        {...defaultProps}
        defaultFileList={defaultFileList}
      />
    );

    expect(screen.getByTitle(longFileName)).toBeInTheDocument();
  });

  it('handles file size formatting', () => {
    const defaultFileList = [
      {
        uid: '1',
        name: 'test.png',
        size: 1048576, // 1MB
        type: 'image/png',
        status: UploadFileStatus.DONE,
      },
    ];

    renderWithTheme(
      <Upload
        {...defaultProps}
        defaultFileList={defaultFileList}
      />
    );

    expect(screen.getByText('1.0 MB')).toBeInTheDocument();
  });

  it('displays image preview in picture-card layout', async () => {
    const mockFile: UploadFile = {
      uid: 'test-image',
      name: 'test-image.jpg',
      size: 1024,
      type: 'image/jpeg',
      status: UploadFileStatus.DONE,
      url: 'https://example.com/image.jpg',
      thumbUrl: 'https://example.com/thumb.jpg',
    };

    const { container } = renderWithTheme(
      <Upload
        listType="picture-card"
        defaultFileList={[mockFile]}
        showUploadList={{
          showRemoveIcon: true,
          showPreviewIcon: true,
          showEditIcon: true,
        }}
      />
    );

    // Should display the image
    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/thumb.jpg');
    expect(image).toHaveAttribute('alt', 'test-image.jpg');

    // Should show Edit button on the right
    const editButton = container.querySelector('button[title="Edit"]');
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent('Edit');

    // Should show remove button on the left
    const removeButton = container.querySelector('button[title="Remove"]');
    expect(removeButton).toBeInTheDocument();
  });

  it('shows file icon for non-image files in picture-card layout', async () => {
    const mockFile: UploadFile = {
      uid: 'test-pdf',
      name: 'document.pdf',
      size: 2048,
      type: 'application/pdf',
      status: UploadFileStatus.DONE,
    };

    const { container } = renderWithTheme(
      <Upload
        listType="picture-card"
        defaultFileList={[mockFile]}
      />
    );

    // Should not display an image
    const image = container.querySelector('img');
    expect(image).not.toBeInTheDocument();

    // Should display file icon
    const fileIcon = container.querySelector('svg');
    expect(fileIcon).toBeInTheDocument();
  });

  it('uses black color for action buttons', async () => {
    const mockFile: UploadFile = {
      uid: 'test-file',
      name: 'test.txt',
      size: 1024,
      type: 'text/plain',
      status: UploadFileStatus.DONE,
    };

    const { container } = renderWithTheme(
      <Upload
        listType="text"
        defaultFileList={[mockFile]}
        showUploadList={{
          showRemoveIcon: true,
          showPreviewIcon: true,
        }}
      />
    );

    const actionButtons = container.querySelectorAll('button[title="Preview"], button[title="Remove"]');
    actionButtons.forEach(button => {
      const styles = window.getComputedStyle(button);
      expect(styles.color).toBe('rgb(0, 0, 0)'); // Black color
    });
  });

  it('renders with custom width and height', () => {
    const { container } = renderWithTheme(
      <Upload
        {...defaultProps}
        width="300px"
        height="200px"
      />
    );
    
    const uploadArea = container.querySelector('.upload-area');
    expect(uploadArea).toHaveStyle({
      width: '300px',
      minHeight: '200px',
    });
  });

  it('enforces maxCount=1 and multiple=false for picture-card type', async () => {
    const handleChange = jest.fn();
    const files = [
      createMockFile('test1.png', 1024, 'image/png'),
      createMockFile('test2.png', 2048, 'image/png'),
    ];

    renderWithTheme(
      <Upload
        {...defaultProps}
        listType={UploadListType.PICTURE_CARD}
        multiple={true} // This should be overridden
        maxCount={5} // This should be overridden
        onChange={handleChange}
      />
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.multiple).toBe(false); // Should be false regardless of prop
    
    if (input) {
      fireEvent.change(input, { target: { files } });
      
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
        const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0];
        expect(lastCall.fileList).toHaveLength(1); // Should only accept one file
      });
    }
  });

  it('triggers reupload on picture-card delete', async () => {
    const handleChange = jest.fn();
    const handleRemove = jest.fn().mockResolvedValue(true);
    const defaultFileList = [
      {
        uid: '1',
        name: 'test.png',
        size: 1024,
        type: 'image/png',
        status: UploadFileStatus.DONE,
      },
    ];

    renderWithTheme(
      <Upload
        {...defaultProps}
        listType={UploadListType.PICTURE_CARD}
        defaultFileList={defaultFileList}
        showUploadList={true}
        onRemove={handleRemove}
        onChange={handleChange}
      />
    );

    const removeButton = screen.getByTitle('Remove');
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const inputClickSpy = jest.spyOn(input, 'click');

    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(handleRemove).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
        file: expect.objectContaining({
          status: UploadFileStatus.REMOVED,
        }),
        fileList: [],
      }));
      expect(inputClickSpy).toHaveBeenCalled(); // Should trigger file input click
    });
  });

  it('hides upload area when picture-card has file', () => {
    const defaultFileList = [
      {
        uid: '1',
        name: 'test.png',
        size: 1024,
        type: 'image/png',
        status: UploadFileStatus.DONE,
      },
    ];

    const { container } = renderWithTheme(
      <Upload
        {...defaultProps}
        listType={UploadListType.PICTURE_CARD}
        defaultFileList={defaultFileList}
      />
    );

    const uploadArea = container.querySelector('.upload-area');
    expect(uploadArea).not.toBeInTheDocument();
  });
}); 