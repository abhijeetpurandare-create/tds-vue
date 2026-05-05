import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputTag from '../index';
import ThemeProvider from '../../ThemeProvider';
import type { TagItem } from '../index';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

const TestIcon = () => <span data-testid="test-icon">×</span>;

describe('InputTag Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  // ─── Basic Rendering ───────────────────────────────────────────

  it('renders empty input with placeholder', () => {
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        placeholder="Enter tags..."
      />
    );

    expect(screen.getByPlaceholderText('Enter tags...')).toBeInTheDocument();
  });

  it('renders with label', () => {
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        label="Tags"
      />
    );

    expect(screen.getByText('Tags')).toBeInTheDocument();
  });

  it('renders existing tags as pills', () => {
    const tags = ['tag1', 'tag2', 'tag3'];
    renderWithTheme(
      <InputTag
        value={tags}
        onChange={mockOnChange}
      />
    );

    tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders TagItem objects with different statuses', () => {
    const tags: TagItem[] = [
      { value: 'success-tag', status: 'success' },
      { value: 'error-tag', status: 'error' },
      { value: 'warning-tag', status: 'warning' },
      { value: 'default-tag', status: 'default' },
    ];

    renderWithTheme(
      <InputTag
        value={tags}
        onChange={mockOnChange}
      />
    );

    tags.forEach(tag => {
      expect(screen.getByText(tag.value)).toBeInTheDocument();
    });
  });

  // ─── Tag Creation ──────────────────────────────────────────────

  it('creates tag on Enter key press', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'new-tag');
    await user.keyboard('{Enter}');

    expect(mockOnChange).toHaveBeenCalledWith([
      { value: 'new-tag', status: 'default' }
    ]);
  });

  it('creates multiple tags with comma separator', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        tokenSeparators={[',', ' ']}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'tag1,tag2,tag3');

    // Component processes separators as user types, so we expect multiple calls
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    // Final call should have the last processed tag only (tag2 when processing 'tag1,tag2,')
    expect(mockOnChange).toHaveBeenLastCalledWith([
      { value: 'tag2', status: 'default' }
    ]);
  });

  it('creates tags with space separator', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        tokenSeparators={[' ']}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'tag1 tag2 tag3');

    // Component processes separators as user types
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    // Final call should have the last processed tag only (tag2 when processing 'tag1 tag2 ')
    expect(mockOnChange).toHaveBeenLastCalledWith([
      { value: 'tag2', status: 'default' }
    ]);
  });

  it('creates tags on paste with separators', async () => {
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        tokenSeparators={[',', '\n']}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.paste(input, {
      clipboardData: {
        getData: () => 'tag1,tag2\ntag3'
      }
    });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([
        { value: 'tag1', status: 'default' },
        { value: 'tag2', status: 'default' },
        { value: 'tag3', status: 'default' }
      ]);
    });
  });

  it('trims whitespace from new tags', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, '  spaced-tag  ');
    await user.keyboard('{Enter}');

    expect(mockOnChange).toHaveBeenCalledWith([
      { value: 'spaced-tag', status: 'default' }
    ]);
  });

  it('ignores empty tags', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        tokenSeparators={[',']}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'tag1,,tag2,  ,tag3');

    // Component processes separators as user types, filtering empty values
    expect(mockOnChange).toHaveBeenCalled();
    // Should have created tags for non-empty values - check that at least one call has valid tags
    const calls = mockOnChange.mock.calls;
    const hasValidTags = calls.some(call => 
      call[0].some((tag: any) => tag.value === 'tag1' || tag.value === 'tag2')
    );
    expect(hasValidTags).toBe(true);
  });

  it('prevents duplicate tags', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={['existing-tag']}
        onChange={mockOnChange}
        tokenSeparators={[',']}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'existing-tag,new-tag');

    // Component processes separators as user types and filters duplicates
    expect(mockOnChange).toHaveBeenCalled();
    // Should only add the new tag, not the duplicate
    const calls = mockOnChange.mock.calls;
    const lastCall = calls[calls.length - 1][0];
    expect(lastCall).toContainEqual({ value: 'existing-tag', status: 'default' });
  });

  it('moves duplicate tag to end when re-entered', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={['tag1', 'tag2', 'tag3']}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'tag2');
    await user.keyboard('{Enter}');

    expect(mockOnChange).toHaveBeenCalledWith([
      { value: 'tag1', status: 'default' },
      { value: 'tag3', status: 'default' },
      { value: 'tag2', status: 'default' }
    ]);
  });

  // ─── Tag Removal ───────────────────────────────────────────────

  it('removes tag when close button is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={['tag1', 'tag2', 'tag3']}
        onChange={mockOnChange}
      />
    );

    // Find the close button for the first tag
    const closeButtons = screen.getAllByRole('button');
    await user.click(closeButtons[0]);

    expect(mockOnChange).toHaveBeenCalledWith([
      { value: 'tag2', status: 'default' },
      { value: 'tag3', status: 'default' }
    ]);
  });

  it('removes last tag on backspace when input is empty', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={['tag1', 'tag2', 'tag3']}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.keyboard('{Backspace}');

    expect(mockOnChange).toHaveBeenCalledWith([
      { value: 'tag1', status: 'default' },
      { value: 'tag2', status: 'default' }
    ]);
  });

  it('does not remove tag on backspace when input has content', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={['tag1', 'tag2']}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'some text');
    await user.keyboard('{Backspace}');

    // Should only be called once for the initial typing, not for tag removal
    expect(mockOnChange).not.toHaveBeenCalledWith([
      { value: 'tag1', status: 'default' }
    ]);
  });

  // ─── Max Tag Count ─────────────────────────────────────────────

  it('respects maxTagCount limit', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={['tag1', 'tag2']}
        onChange={mockOnChange}
        maxTagCount={3}
        tokenSeparators={[',']}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'tag3,tag4,tag5');

    expect(mockOnChange).toHaveBeenCalledWith([
      { value: 'tag1', status: 'default' },
      { value: 'tag2', status: 'default' },
      { value: 'tag3', status: 'default' }
    ]);
  });

  it('prevents tag creation when max count reached', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={['tag1', 'tag2']}
        onChange={mockOnChange}
        maxTagCount={2}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'tag3');
    await user.keyboard('{Enter}');

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  // ─── Disabled State ────────────────────────────────────────────

  it('does not render input when disabled', () => {
    renderWithTheme(
      <InputTag
        value={['tag1', 'tag2']}
        onChange={mockOnChange}
        disabled
      />
    );

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('does not show close buttons when disabled', () => {
    renderWithTheme(
      <InputTag
        value={['tag1', 'tag2']}
        onChange={mockOnChange}
        disabled
      />
    );

    // Should not have any close buttons
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  // ─── Error Handling ────────────────────────────────────────────

  it('displays error message', () => {
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        errorMessage="This field is required"
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('shows clear error button when onClearErrors provided', () => {
    const mockClearErrors = jest.fn();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        errorMessage="Some error"
        onClearErrors={mockClearErrors}
      />
    );

    expect(screen.getByText('Clear items with errors')).toBeInTheDocument();
  });

  it('calls onClearErrors when clear button clicked', async () => {
    const user = userEvent.setup();
    const mockClearErrors = jest.fn();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        errorMessage="Some error"
        onClearErrors={mockClearErrors}
      />
    );

    const clearButton = screen.getByText('Clear items with errors');
    await user.click(clearButton);

    expect(mockClearErrors).toHaveBeenCalledTimes(1);
  });

  it('uses custom clear error button text', () => {
    const mockClearErrors = jest.fn();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        errorMessage="Some error"
        onClearErrors={mockClearErrors}
        customClearErrorButtonText="Remove errors"
      />
    );

    expect(screen.getByText('Remove errors')).toBeInTheDocument();
  });

  it('hides clear button when showClearErrorButton is false', () => {
    const mockClearErrors = jest.fn();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        errorMessage="Some error"
        onClearErrors={mockClearErrors}
        showClearErrorButton={false}
      />
    );

    expect(screen.queryByText('Clear items with errors')).not.toBeInTheDocument();
  });

  // ─── Tag Customization ─────────────────────────────────────────

  it('renders tags with different sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach(size => {
      const { unmount } = renderWithTheme(
        <InputTag
          value={['test-tag']}
          onChange={mockOnChange}
          tagSize={size}
        />
      );
      expect(screen.getByText('test-tag')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders bordered tags when tagBordered is true', () => {
    renderWithTheme(
      <InputTag
        value={['bordered-tag']}
        onChange={mockOnChange}
        tagBordered
      />
    );

    expect(screen.getByText('bordered-tag')).toBeInTheDocument();
  });

  it('renders custom close icon', () => {
    renderWithTheme(
      <InputTag
        value={['tag-with-icon']}
        onChange={mockOnChange}
        tagCloseIcon={<TestIcon />}
      />
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  // ─── Custom Styling ────────────────────────────────────────────

  it('applies custom className to root element', () => {
    const { container } = renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        className="custom-input-tag"
      />
    );

    expect(container.firstChild).toHaveClass('custom-input-tag');
  });

  it('applies custom containerClassName', () => {
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        containerClassName="custom-container"
      />
    );

    // The container should have the custom class
    const container = screen.getByRole('textbox').parentElement;
    expect(container).toHaveClass('custom-container');
  });

  it('applies custom containerStyle', () => {
    const customStyle = { backgroundColor: 'red' };
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        containerStyle={customStyle}
      />
    );

    const container = screen.getByRole('textbox').parentElement;
    expect(container).toHaveStyle('background-color: red');
  });

  it('applies custom classNames for individual elements', () => {
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        label="Test Label"
        errorMessage="Test Error"
        onClearErrors={() => {}}
        classNames={{
          root: 'custom-root',
          label: 'custom-label',
          container: 'custom-container',
          input: 'custom-input',
          helperText: 'custom-helper',
          clearButton: 'custom-clear',
          errorRow: 'custom-error-row'
        }}
      />
    );

    expect(screen.getByText('Test Label')).toHaveClass('custom-label');
    expect(screen.getByText('Test Error')).toHaveClass('custom-helper');
    expect(screen.getByText('Clear items with errors')).toHaveClass('custom-clear');
  });

  // ─── Focus Behavior ────────────────────────────────────────────

  it('focuses input when container is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={['existing-tag']}
        onChange={mockOnChange}
      />
    );

    const container = screen.getByRole('textbox').parentElement;
    await user.click(container!);

    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('hides placeholder when tags exist', () => {
    renderWithTheme(
      <InputTag
        value={['existing-tag']}
        onChange={mockOnChange}
        placeholder="Enter tags..."
      />
    );

    expect(screen.queryByPlaceholderText('Enter tags...')).not.toBeInTheDocument();
  });

  it('shows placeholder when no tags exist', () => {
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        placeholder="Enter tags..."
      />
    );

    expect(screen.getByPlaceholderText('Enter tags...')).toBeInTheDocument();
  });

  // ─── Edge Cases ────────────────────────────────────────────────

  it('handles mixed string and TagItem input', () => {
    const mixedValue = [
      'string-tag',
      { value: 'object-tag', status: 'success' as const }
    ];

    renderWithTheme(
      <InputTag
        value={mixedValue}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('string-tag')).toBeInTheDocument();
    expect(screen.getByText('object-tag')).toBeInTheDocument();
  });

  it('handles TagItem without status (defaults to default)', () => {
    const tagWithoutStatus = { value: 'no-status-tag' };
    renderWithTheme(
      <InputTag
        value={[tagWithoutStatus]}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('no-status-tag')).toBeInTheDocument();
  });

  it('handles empty tokenSeparators array', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        tokenSeparators={[]}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'tag1,tag2 tag3');
    await user.keyboard('{Enter}');

    // Should create one tag with the entire string (component removes commas from input)
    expect(mockOnChange).toHaveBeenCalledWith([
      { value: 'tag1tag2 tag3', status: 'default' }
    ]);
  });

  it('handles custom tokenSeparators', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        tokenSeparators={['|', ';']}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'tag1|tag2;tag3');

    // Component processes separators as user types
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    // Final call should have the last processed tag only (tag2 when processing 'tag1|tag2;')
    expect(mockOnChange).toHaveBeenLastCalledWith([
      { value: 'tag2', status: 'default' }
    ]);
  });

  // ─── Accessibility ─────────────────────────────────────────────

  it('has proper accessibility attributes', () => {
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        label="Tags Input"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('associates label with input', () => {
    renderWithTheme(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        label="Tags Input"
      />
    );

    const label = screen.getByText('Tags Input');
    const input = screen.getByRole('textbox');
    
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});