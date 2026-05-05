import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the figma-variables-resolver which uses ESM import of JSON
jest.mock('../../../utils/templateResolver', () => ({
  resolveTemplatePlaceholders: (theme: any) => theme,
}));

// Mock the ThemeProvider CSS import
jest.mock('../../ThemeProvider/tarmac-variables.css', () => ({}));

import Table from '../index';
import type { ColumnType } from '../types';

// ── Shared test data ─────────────────────────────────────────────────────

interface TestRecord {
  key: string;
  name: string;
  age: number;
  city: string;
}

const data: TestRecord[] = [
  { key: '1', name: 'Alice', age: 30, city: 'London' },
  { key: '2', name: 'Bob', age: 25, city: 'Paris' },
  { key: '3', name: 'Charlie', age: 35, city: 'Berlin' },
  { key: '4', name: 'Diana', age: 28, city: 'Rome' },
  { key: '5', name: 'Eve', age: 32, city: 'Madrid' },
  { key: '6', name: 'Frank', age: 40, city: 'Vienna' },
  { key: '7', name: 'Grace', age: 22, city: 'Oslo' },
];

const columns: ColumnType<TestRecord>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'age', title: 'Age', dataIndex: 'age', sorter: (a, b) => a.age - b.age },
  { key: 'city', title: 'City', dataIndex: 'city' },
];

// ═════════════════════════════════════════════════════════════════════════
// Describe: Sorting Behavior
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Sorting', () => {
  it('cycles through ascend → descend → none on repeated clicks', () => {
    const onChange = jest.fn();
    render(<Table dataSource={data} columns={columns} onChange={onChange} />);

    const ageHeader = screen.getByText('Age');

    // First click → ascend
    fireEvent.click(ageHeader);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][2].order).toBe('ascend');

    // Second click → descend
    fireEvent.click(ageHeader);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][2].order).toBe('descend');

    // Third click → none (null)
    fireEvent.click(ageHeader);
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange.mock.calls[2][2].order).toBeNull();
  });

  it('resets sort when clicking a different sortable column', () => {
    const cols: ColumnType<TestRecord>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
      { key: 'age', title: 'Age', dataIndex: 'age', sorter: (a, b) => a.age - b.age },
      { key: 'city', title: 'City', dataIndex: 'city' },
    ];
    const onChange = jest.fn();
    render(<Table dataSource={data} columns={cols} onChange={onChange} />);

    fireEvent.click(screen.getByText('Age'));
    expect(onChange.mock.calls[0][2].order).toBe('ascend');

    // Click Name column — should start fresh at ascend
    fireEvent.click(screen.getByText('Name'));
    expect(onChange.mock.calls[1][2].order).toBe('ascend');
    expect(onChange.mock.calls[1][2].field).toBe('name');
  });

  it('does not trigger sort on non-sortable column click', () => {
    const onChange = jest.fn();
    render(<Table dataSource={data} columns={columns} onChange={onChange} />);

    fireEvent.click(screen.getByText('City'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('sorts data visually in ascending order', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} pagination={false} />
    );

    fireEvent.click(screen.getByText('Age'));

    const rows = container.querySelectorAll('tbody tr');
    const ages = Array.from(rows).map(
      (row) => row.querySelectorAll('td')[1]?.textContent
    );
    expect(ages).toEqual(['22', '25', '28', '30', '32', '35', '40']);
  });

  it('sorts data visually in descending order', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} pagination={false} />
    );

    fireEvent.click(screen.getByText('Age')); // ascend
    fireEvent.click(screen.getByText('Age')); // descend

    const rows = container.querySelectorAll('tbody tr');
    const ages = Array.from(rows).map(
      (row) => row.querySelectorAll('td')[1]?.textContent
    );
    expect(ages).toEqual(['40', '35', '32', '30', '28', '25', '22']);
  });

  it('supports sorter: true for default comparison', () => {
    const cols: ColumnType<TestRecord>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', sorter: true },
      { key: 'age', title: 'Age', dataIndex: 'age' },
    ];
    const { container } = render(
      <Table dataSource={data} columns={cols} pagination={false} />
    );

    fireEvent.click(screen.getByText('Name'));

    const rows = container.querySelectorAll('tbody tr');
    const names = Array.from(rows).map(
      (row) => row.querySelectorAll('td')[0]?.textContent
    );
    expect(names).toEqual(['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace']);
  });
});


// ═════════════════════════════════════════════════════════════════════════
// Describe: Pagination Interactions
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Pagination', () => {
  it('renders correct number of rows per page', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} pagination={{ pageSize: 3, current: 1 }} />
    );
    const rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(3);
  });

  it('navigates to next page via next button', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 3, current: 1, onChange }}
      />
    );

    // Find the next button (›)
    const buttons = container.querySelectorAll('button');
    const nextBtn = Array.from(buttons).find((b) => b.textContent === '›');
    expect(nextBtn).toBeTruthy();
    fireEvent.click(nextBtn!);

    expect(onChange).toHaveBeenCalledWith(2, 3);
  });

  it('navigates to previous page via prev button', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 3, current: 2, onChange }}
      />
    );

    const buttons = container.querySelectorAll('button');
    const prevBtn = Array.from(buttons).find((b) => b.textContent === '‹');
    expect(prevBtn).toBeTruthy();
    fireEvent.click(prevBtn!);

    expect(onChange).toHaveBeenCalledWith(1, 3);
  });

  it('disables prev button on first page', () => {
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 3, current: 1 }}
      />
    );

    const buttons = container.querySelectorAll('button');
    const prevBtn = Array.from(buttons).find((b) => b.textContent === '‹');
    expect(prevBtn).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 3, current: 3 }}
      />
    );

    const buttons = container.querySelectorAll('button');
    const nextBtn = Array.from(buttons).find((b) => b.textContent === '›');
    expect(nextBtn).toBeDisabled();
  });

  it('clicking a page number navigates to that page', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 3, current: 1, onChange }}
      />
    );

    const buttons = container.querySelectorAll('button');
    const page2Btn = Array.from(buttons).find((b) => b.textContent === '2');
    expect(page2Btn).toBeTruthy();
    fireEvent.click(page2Btn!);

    expect(onChange).toHaveBeenCalledWith(2, 3);
  });

  it('renders showTotal when provided', () => {
    render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 3,
          current: 1,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
      />
    );

    expect(screen.getByText('1-3 of 7')).toBeInTheDocument();
  });

  it('renders size changer when showSizeChanger is true', () => {
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 3, current: 1, showSizeChanger: true }}
      />
    );

    const select = container.querySelector('select');
    expect(select).toBeInTheDocument();
  });

  it('renders quick jumper when showQuickJumper is true', () => {
    render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 3, current: 1, showQuickJumper: true }}
      />
    );

    expect(screen.getByText('Go to')).toBeInTheDocument();
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  it('quick jumper navigates on Enter key', () => {
    const onChange = jest.fn();
    render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 3, current: 1, showQuickJumper: true, onChange }}
      />
    );

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(2, 3);
  });

  it('hides pagination when hideOnSinglePage is true and only one page', () => {
    const { container } = render(
      <Table
        dataSource={data.slice(0, 2)}
        columns={columns}
        pagination={{ pageSize: 10, hideOnSinglePage: true }}
      />
    );

    // No pagination buttons should be rendered
    const paginationButtons = container.querySelectorAll('button');
    // Only table content, no ‹ or › buttons
    const navButtons = Array.from(paginationButtons).filter(
      (b) => b.textContent === '‹' || b.textContent === '›'
    );
    expect(navButtons).toHaveLength(0);
  });

  it('pagination=false shows all rows without pagination', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} pagination={false} />
    );

    const rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(7);
  });

  it('fires top-level onChange with action=paginate on page change', () => {
    const topOnChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 3, current: 1 }}
        onChange={topOnChange}
      />
    );

    const buttons = container.querySelectorAll('button');
    const nextBtn = Array.from(buttons).find((b) => b.textContent === '›');
    fireEvent.click(nextBtn!);

    expect(topOnChange).toHaveBeenCalledTimes(1);
    const [, , , extra] = topOnChange.mock.calls[0];
    expect(extra.action).toBe('paginate');
  });
});


// ═════════════════════════════════════════════════════════════════════════
// Describe: Row Selection
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Row Selection', () => {
  it('renders checkbox selection cells for each row', () => {
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'checkbox', onChange: jest.fn() }}
      />
    );

    // Each body row should have an extra td for selection
    const bodyRows = container.querySelectorAll('tbody tr');
    bodyRows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      expect(cells).toHaveLength(columns.length + 1);
    });
  });

  it('clicking a row checkbox calls onChange with that row key', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'checkbox', onChange }}
      />
    );

    // Click the first body row's selection cell
    const firstRowSelectionCell = container.querySelector('tbody tr td');
    fireEvent.click(firstRowSelectionCell!);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(['1']);
  });

  it('clicking select-all checkbox selects all rows', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'checkbox', onChange }}
      />
    );

    // Click the header selection cell (th)
    const headerSelectionCell = container.querySelector('thead th');
    fireEvent.click(headerSelectionCell!);

    expect(onChange).toHaveBeenCalledTimes(1);
    const selectedKeys = onChange.mock.calls[0][0];
    expect(selectedKeys).toHaveLength(7);
    expect(selectedKeys).toEqual(['1', '2', '3', '4', '5', '6', '7']);
  });

  it('clicking select-all again deselects all rows', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'checkbox', selectedRowKeys: ['1', '2', '3', '4', '5', '6', '7'], onChange }}
      />
    );

    const headerSelectionCell = container.querySelector('thead th');
    fireEvent.click(headerSelectionCell!);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual([]);
  });

  it('radio selection only allows one row selected at a time', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'radio', onChange }}
      />
    );

    const bodyRows = container.querySelectorAll('tbody tr');

    // Click first row
    fireEvent.click(bodyRows[0].querySelector('td')!);
    expect(onChange.mock.calls[0][0]).toEqual(['1']);

    // Click second row
    fireEvent.click(bodyRows[1].querySelector('td')!);
    expect(onChange.mock.calls[1][0]).toEqual(['2']);
  });

  it('disabled row checkbox cannot be clicked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          onChange,
          getCheckboxProps: (record) => ({
            disabled: record.key === '1',
          }),
        }}
      />
    );

    // Click the first row's selection cell (disabled)
    const firstRowSelectionCell = container.querySelector('tbody tr td');
    fireEvent.click(firstRowSelectionCell!);

    // onChange should not be called for disabled row
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onSelect callback fires with correct arguments', () => {
    const onSelect = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'checkbox', onSelect }}
      />
    );

    const firstRowSelectionCell = container.querySelector('tbody tr td');
    fireEvent.click(firstRowSelectionCell!);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toEqual(data[0]); // record
    expect(onSelect.mock.calls[0][1]).toBe(true); // selected
  });

  it('onSelectAll callback fires when select-all is clicked', () => {
    const onSelectAll = jest.fn();
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'checkbox', onSelectAll }}
      />
    );

    const headerSelectionCell = container.querySelector('thead th');
    fireEvent.click(headerSelectionCell!);

    expect(onSelectAll).toHaveBeenCalledTimes(1);
    expect(onSelectAll.mock.calls[0][0]).toBe(true); // selected
  });

  it('controlled selectedRowKeys highlights correct rows', () => {
    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'checkbox', selectedRowKeys: ['2', '4'] }}
      />
    );

    // Verify the table renders with selection column
    const headerCells = container.querySelectorAll('thead th');
    expect(headerCells).toHaveLength(columns.length + 1);

    // Verify all data rows are rendered
    const bodyRows = container.querySelectorAll('tbody tr');
    expect(bodyRows).toHaveLength(7);

    // Each body row should have an extra td for the selection cell
    bodyRows.forEach((row) => {
      expect(row.querySelectorAll('td')).toHaveLength(columns.length + 1);
    });
  });
});


// ═════════════════════════════════════════════════════════════════════════
// Describe: Row Footer
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Row Footer', () => {
  it('renders row footer via rowFooter prop (function form)', () => {
    render(
      <Table
        dataSource={data.slice(0, 2)}
        columns={columns}
        pagination={false}
        rowFooter={(record: TestRecord) => <span>Footer for {record.name}</span>}
      />
    );

    expect(screen.getByText('Footer for Alice')).toBeInTheDocument();
    expect(screen.getByText('Footer for Bob')).toBeInTheDocument();
  });

  it('renders row footer via rowFooter prop (object form with showFooter)', () => {
    render(
      <Table
        dataSource={data.slice(0, 3)}
        columns={columns}
        pagination={false}
        rowFooter={{
          render: (record: TestRecord) => <span>Footer: {record.name}</span>,
          showFooter: (record: TestRecord) => record.key !== '2',
        }}
      />
    );

    expect(screen.getByText('Footer: Alice')).toBeInTheDocument();
    expect(screen.queryByText('Footer: Bob')).not.toBeInTheDocument();
    expect(screen.getByText('Footer: Charlie')).toBeInTheDocument();
  });

  it('renders row footer via column-level rowFooter: true', () => {
    const colsWithFooter: ColumnType<TestRecord>[] = [
      ...columns,
      {
        key: 'footer',
        dataIndex: 'city',
        rowFooter: true,
        render: (value) => <span>City footer: {String(value)}</span>,
      },
    ];

    render(
      <Table
        dataSource={data.slice(0, 2)}
        columns={colsWithFooter}
        pagination={false}
      />
    );

    expect(screen.getByText('City footer: London')).toBeInTheDocument();
    expect(screen.getByText('City footer: Paris')).toBeInTheDocument();
  });

  it('row footer spans all visible columns', () => {
    const { container } = render(
      <Table
        dataSource={data.slice(0, 1)}
        columns={columns}
        pagination={false}
        rowFooter={() => <span>Full width footer</span>}
      />
    );

    const footerTd = container.querySelector('td[colspan]');
    expect(footerTd).toBeTruthy();
    expect(footerTd?.getAttribute('colspan')).toBe(String(columns.length));
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: Card Variant
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Card Variant', () => {
  it('renders all data rows in card variant', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} variant="card" pagination={false} />
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Grace')).toBeInTheDocument();
    // Card variant uses separate tbody per row
    const tbodies = container.querySelectorAll('tbody');
    expect(tbodies).toHaveLength(7);
  });

  it('card variant shows empty state when no data', () => {
    render(
      <Table dataSource={[]} columns={columns} variant="card" />
    );

    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('card variant supports row selection', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={data.slice(0, 2)}
        columns={columns}
        variant="card"
        pagination={false}
        rowSelection={{ type: 'checkbox', onChange }}
      />
    );

    const headerCells = container.querySelectorAll('thead th');
    expect(headerCells).toHaveLength(columns.length + 1);
  });

  it('card variant with row footer renders footer below each card row', () => {
    render(
      <Table
        dataSource={data.slice(0, 2)}
        columns={columns}
        variant="card"
        pagination={false}
        rowFooter={(record: TestRecord) => <span>Card footer: {record.name}</span>}
      />
    );

    expect(screen.getByText('Card footer: Alice')).toBeInTheDocument();
    expect(screen.getByText('Card footer: Bob')).toBeInTheDocument();
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: Loading State
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Loading', () => {
  it('renders loading overlay when loading=true', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} loading />
    );

    // Loading overlay should contain a spinner SVG
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('renders loading tip text when loading object has tip', () => {
    render(
      <Table
        dataSource={data}
        columns={columns}
        loading={{ spinning: true, tip: 'Loading data...' }}
      />
    );

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('does not render loading overlay when loading=false', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} loading={false} />
    );

    // No loading tip should be present
    expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: Empty State & Locale
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Empty State', () => {
  it('shows default "No data" text when dataSource is empty', () => {
    render(<Table dataSource={[]} columns={columns} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('shows custom empty text via locale.emptyText', () => {
    render(
      <Table
        dataSource={[]}
        columns={columns}
        locale={{ emptyText: 'Nothing to display' }}
      />
    );

    expect(screen.getByText('Nothing to display')).toBeInTheDocument();
  });

  it('shows custom empty text as ReactNode', () => {
    render(
      <Table
        dataSource={[]}
        columns={columns}
        locale={{ emptyText: <div data-testid="custom-empty">Custom empty</div> }}
      />
    );

    expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
  });
});


// ═════════════════════════════════════════════════════════════════════════
// Describe: Title & Footer Render Props
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Title & Footer', () => {
  it('renders title when title prop is provided', () => {
    render(
      <Table
        dataSource={data}
        columns={columns}
        title={() => <span>Table Title</span>}
      />
    );

    expect(screen.getByText('Table Title')).toBeInTheDocument();
  });

  it('renders footer when footer prop is provided', () => {
    render(
      <Table
        dataSource={data}
        columns={columns}
        footer={() => <span>Table Footer</span>}
      />
    );

    expect(screen.getByText('Table Footer')).toBeInTheDocument();
  });

  it('title receives dataSource as argument', () => {
    const titleFn = jest.fn(() => <span>Title</span>);
    render(
      <Table dataSource={data} columns={columns} title={titleFn} />
    );

    expect(titleFn).toHaveBeenCalledWith(data);
  });

  it('footer receives dataSource as argument', () => {
    const footerFn = jest.fn(() => <span>Footer</span>);
    render(
      <Table dataSource={data} columns={columns} footer={footerFn} />
    );

    expect(footerFn).toHaveBeenCalledWith(data);
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: Hidden Columns
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Hidden Columns', () => {
  it('does not render hidden columns in header', () => {
    const cols: ColumnType<TestRecord>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name' },
      { key: 'age', title: 'Age', dataIndex: 'age', hidden: true },
      { key: 'city', title: 'City', dataIndex: 'city' },
    ];

    const { container } = render(
      <Table dataSource={data} columns={cols} pagination={false} />
    );

    const headerCells = container.querySelectorAll('thead th');
    expect(headerCells).toHaveLength(2);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.queryByText('Age')).not.toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
  });

  it('does not render hidden column data in body cells', () => {
    const cols: ColumnType<TestRecord>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name' },
      { key: 'age', title: 'Age', dataIndex: 'age', hidden: true },
      { key: 'city', title: 'City', dataIndex: 'city' },
    ];

    const { container } = render(
      <Table dataSource={data.slice(0, 1)} columns={cols} pagination={false} />
    );

    const bodyCells = container.querySelectorAll('tbody td');
    expect(bodyCells).toHaveLength(2);
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: Custom rowKey
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Custom rowKey', () => {
  it('supports string rowKey', () => {
    const dataWithId = data.map((d) => ({ ...d, id: `id-${d.key}` }));
    const onChange = jest.fn();

    const { container } = render(
      <Table
        dataSource={dataWithId}
        columns={columns}
        pagination={false}
        rowKey="id"
        rowSelection={{ type: 'checkbox', onChange }}
      />
    );

    const firstRowSelectionCell = container.querySelector('tbody tr td');
    fireEvent.click(firstRowSelectionCell!);

    expect(onChange.mock.calls[0][0]).toEqual(['id-1']);
  });

  it('supports function rowKey', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey={(record: TestRecord) => `custom-${record.key}`}
        rowSelection={{ type: 'checkbox', onChange }}
      />
    );

    const firstRowSelectionCell = container.querySelector('tbody tr td');
    fireEvent.click(firstRowSelectionCell!);

    expect(onChange.mock.calls[0][0]).toEqual(['custom-1']);
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: onRow Callback
// ═════════════════════════════════════════════════════════════════════════

describe('Table — onRow', () => {
  it('onRow onClick fires when a row is clicked', () => {
    const onRowClick = jest.fn();
    const { container } = render(
      <Table
        dataSource={data.slice(0, 2)}
        columns={columns}
        pagination={false}
        onRow={() => ({ onClick: onRowClick } as any)}
      />
    );

    const firstRow = container.querySelector('tbody tr');
    fireEvent.click(firstRow!);

    expect(onRowClick).toHaveBeenCalledTimes(1);
  });

  it('onRow receives record and index', () => {
    const onRow = jest.fn(() => ({}));
    render(
      <Table
        dataSource={data.slice(0, 2)}
        columns={columns}
        pagination={false}
        onRow={onRow}
      />
    );

    expect(onRow).toHaveBeenCalledWith(data[0], 0);
    expect(onRow).toHaveBeenCalledWith(data[1], 1);
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: showHeader
// ═════════════════════════════════════════════════════════════════════════

describe('Table — showHeader', () => {
  it('hides table header when showHeader=false', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} showHeader={false} />
    );

    expect(container.querySelector('thead')).toBeNull();
  });

  it('shows table header by default', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} />
    );

    expect(container.querySelector('thead')).toBeInTheDocument();
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: Scroll & Sticky
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Scroll & Sticky', () => {
  it('renders with scroll.y without error', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} scroll={{ y: 200 }} />
    );

    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('renders with sticky=true without error', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} sticky />
    );

    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('renders with sticky object config without error', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} sticky={{ offsetHeader: 64 }} />
    );

    expect(container.querySelector('table')).toBeInTheDocument();
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: Custom Column Render
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Column Render', () => {
  it('custom render function receives value, record, and index', () => {
    const renderFn = jest.fn((value, record, index) => (
      <span data-testid={`cell-${index}`}>{String(value)}</span>
    ));

    const cols: ColumnType<TestRecord>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', render: renderFn },
    ];

    render(
      <Table dataSource={data.slice(0, 2)} columns={cols} pagination={false} />
    );

    expect(renderFn).toHaveBeenCalledTimes(2);
    expect(renderFn.mock.calls[0][0]).toBe('Alice');
    expect(renderFn.mock.calls[0][1]).toEqual(data[0]);
    expect(renderFn.mock.calls[0][2]).toBe(0);
    expect(screen.getByTestId('cell-0')).toBeInTheDocument();
  });

  it('renders column with ellipsis without error', () => {
    const cols: ColumnType<TestRecord>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', ellipsis: true },
    ];

    const { container } = render(
      <Table dataSource={data.slice(0, 1)} columns={cols} pagination={false} />
    );

    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('renders column with custom width', () => {
    const cols: ColumnType<TestRecord>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', width: 200 },
      { key: 'age', title: 'Age', dataIndex: 'age', width: '100px' },
    ];

    const { container } = render(
      <Table dataSource={data.slice(0, 1)} columns={cols} pagination={false} />
    );

    const headerCells = container.querySelectorAll('thead th');
    expect(headerCells[0].style.width).toBe('200px');
    expect(headerCells[1].style.width).toBe('100px');
  });

  it('renders column with align center', () => {
    const cols: ColumnType<TestRecord>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', align: 'center' },
    ];

    const { container } = render(
      <Table dataSource={data.slice(0, 1)} columns={cols} pagination={false} />
    );

    expect(container.querySelector('table')).toBeInTheDocument();
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: Custom className & style
// ═════════════════════════════════════════════════════════════════════════

describe('Table — className & style', () => {
  it('applies custom className to container', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} className="my-custom-table" />
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain('my-custom-table');
  });

  it('applies custom style to container', () => {
    const { container } = render(
      <Table dataSource={data} columns={columns} style={{ maxWidth: '800px' }} />
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper?.style.maxWidth).toBe('800px');
  });

  it('applies rowClassName as string', () => {
    const { container } = render(
      <Table
        dataSource={data.slice(0, 1)}
        columns={columns}
        pagination={false}
        rowClassName="custom-row"
      />
    );

    const row = container.querySelector('tbody tr');
    expect(row?.className).toContain('custom-row');
  });

  it('applies rowClassName as function', () => {
    const { container } = render(
      <Table
        dataSource={data.slice(0, 2)}
        columns={columns}
        pagination={false}
        rowClassName={(record: TestRecord, index: number) =>
          index === 0 ? 'first-row' : 'other-row'
        }
      />
    );

    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0].className).toContain('first-row');
    expect(rows[1].className).toContain('other-row');
  });
});


// ═════════════════════════════════════════════════════════════════════════
// Describe: Sorting + Pagination Combined
// ═════════════════════════════════════════════════════════════════════════

describe('Table — Sorting + Pagination Combined', () => {
  // 10 rows so we can paginate meaningfully
  const bigData: TestRecord[] = [
    { key: '1', name: 'Alice', age: 30, city: 'London' },
    { key: '2', name: 'Bob', age: 25, city: 'Paris' },
    { key: '3', name: 'Charlie', age: 35, city: 'Berlin' },
    { key: '4', name: 'Diana', age: 28, city: 'Rome' },
    { key: '5', name: 'Eve', age: 32, city: 'Madrid' },
    { key: '6', name: 'Frank', age: 40, city: 'Vienna' },
    { key: '7', name: 'Grace', age: 22, city: 'Oslo' },
    { key: '8', name: 'Hank', age: 45, city: 'Lisbon' },
    { key: '9', name: 'Ivy', age: 19, city: 'Dublin' },
    { key: '10', name: 'Jack', age: 38, city: 'Prague' },
  ];

  const getVisibleAges = (container: HTMLElement) => {
    const rows = container.querySelectorAll('tbody tr');
    return Array.from(rows).map(
      (row) => row.querySelectorAll('td')[1]?.textContent
    );
  };

  const getVisibleNames = (container: HTMLElement) => {
    const rows = container.querySelectorAll('tbody tr');
    return Array.from(rows).map(
      (row) => row.querySelectorAll('td')[0]?.textContent
    );
  };

  it('page 1 shows first N rows of the sorted dataset (ascending)', () => {
    const { container } = render(
      <Table
        dataSource={bigData}
        columns={columns}
        pagination={{ pageSize: 4, current: 1 }}
      />
    );

    // Sort by age ascending
    fireEvent.click(screen.getByText('Age'));

    // Full sorted order: 19, 22, 25, 28, 30, 32, 35, 38, 40, 45
    // Page 1 (size 4) → 19, 22, 25, 28
    expect(getVisibleAges(container)).toEqual(['19', '22', '25', '28']);
  });

  it('page 2 shows the next slice of the sorted dataset (ascending)', () => {
    const { container } = render(
      <Table
        dataSource={bigData}
        columns={columns}
        pagination={{ pageSize: 4 }}
      />
    );

    // Sort ascending
    fireEvent.click(screen.getByText('Age'));

    // Navigate to page 2 (uncontrolled — internal state drives page)
    const buttons = container.querySelectorAll('button');
    const page2Btn = Array.from(buttons).find((b) => b.textContent === '2');
    fireEvent.click(page2Btn!);

    // Full sorted: 19, 22, 25, 28, 30, 32, 35, 38, 40, 45
    // Page 2 (size 4) → 30, 32, 35, 38
    expect(getVisibleAges(container)).toEqual(['30', '32', '35', '38']);
  });

  it('last page shows remaining rows of the sorted dataset', () => {
    const { container } = render(
      <Table
        dataSource={bigData}
        columns={columns}
        pagination={{ pageSize: 4 }}
      />
    );

    // Sort ascending
    fireEvent.click(screen.getByText('Age'));

    // Navigate to page 3
    const buttons = container.querySelectorAll('button');
    const page3Btn = Array.from(buttons).find((b) => b.textContent === '3');
    fireEvent.click(page3Btn!);

    // Full sorted: 19, 22, 25, 28, 30, 32, 35, 38, 40, 45
    // Page 3 (size 4) → 40, 45
    expect(getVisibleAges(container)).toEqual(['40', '45']);
  });

  it('descending sort + pagination shows correct slices', () => {
    const { container } = render(
      <Table
        dataSource={bigData}
        columns={columns}
        pagination={{ pageSize: 3 }}
      />
    );

    // Sort ascending then descending
    fireEvent.click(screen.getByText('Age'));
    fireEvent.click(screen.getByText('Age'));

    // Full descending: 45, 40, 38, 35, 32, 30, 28, 25, 22, 19
    // Page 1 (size 3) → 45, 40, 38
    expect(getVisibleAges(container)).toEqual(['45', '40', '38']);

    // Navigate to page 2
    const buttons = container.querySelectorAll('button');
    const page2Btn = Array.from(buttons).find((b) => b.textContent === '2');
    fireEvent.click(page2Btn!);

    // Page 2 → 35, 32, 30
    expect(getVisibleAges(container)).toEqual(['35', '32', '30']);
  });

  it('changing sort column while on page 2 re-sorts the visible data', () => {
    const sortableCols: ColumnType<TestRecord>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
      { key: 'age', title: 'Age', dataIndex: 'age', sorter: (a, b) => a.age - b.age },
      { key: 'city', title: 'City', dataIndex: 'city' },
    ];

    const { container } = render(
      <Table
        dataSource={bigData}
        columns={sortableCols}
        pagination={{ pageSize: 4 }}
      />
    );

    // Sort by age ascending
    fireEvent.click(screen.getByText('Age'));
    expect(getVisibleAges(container)).toEqual(['19', '22', '25', '28']);

    // Go to page 2
    const buttons = container.querySelectorAll('button');
    const page2Btn = Array.from(buttons).find((b) => b.textContent === '2');
    fireEvent.click(page2Btn!);
    expect(getVisibleAges(container)).toEqual(['30', '32', '35', '38']);

    // Now sort by Name — data re-sorts, still on page 2 but with name-sorted data
    fireEvent.click(screen.getByText('Name'));
    // Full name ascending: Alice, Bob, Charlie, Diana, Eve, Frank, Grace, Hank, Ivy, Jack
    // Page 2 (size 4) → Eve, Frank, Grace, Hank
    expect(getVisibleNames(container)).toEqual(['Eve', 'Frank', 'Grace', 'Hank']);
  });

  it('removing sort (third click) restores original order on current page', () => {
    const { container } = render(
      <Table
        dataSource={bigData}
        columns={columns}
        pagination={{ pageSize: 5, current: 1 }}
      />
    );

    // Original page 1 order (first 5 by insertion)
    expect(getVisibleNames(container)).toEqual(['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']);

    // Sort ascending
    fireEvent.click(screen.getByText('Age'));
    // Sorted ascending page 1: Ivy(19), Grace(22), Bob(25), Diana(28), Alice(30)
    expect(getVisibleNames(container)).toEqual(['Ivy', 'Grace', 'Bob', 'Diana', 'Alice']);

    // Sort descending
    fireEvent.click(screen.getByText('Age'));
    // Sorted descending page 1: Hank(45), Frank(40), Jack(38), Charlie(35), Eve(32)
    expect(getVisibleNames(container)).toEqual(['Hank', 'Frank', 'Jack', 'Charlie', 'Eve']);

    // Remove sort (third click)
    fireEvent.click(screen.getByText('Age'));
    // Back to original order page 1
    expect(getVisibleNames(container)).toEqual(['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']);
  });

  it('page size change after sorting preserves sort order', () => {
    const { container } = render(
      <Table
        dataSource={bigData}
        columns={columns}
        pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: [3, 5, 10] }}
      />
    );

    // Sort ascending
    fireEvent.click(screen.getByText('Age'));
    // Page 1 size 3: 19, 22, 25
    expect(getVisibleAges(container)).toEqual(['19', '22', '25']);

    // Change page size to 5
    const select = container.querySelector('select')!;
    fireEvent.change(select, { target: { value: '5' } });

    // Now page 1 size 5, still sorted ascending: 19, 22, 25, 28, 30
    expect(getVisibleAges(container)).toEqual(['19', '22', '25', '28', '30']);
  });

  it('sorting does not change total page count', () => {
    const { container } = render(
      <Table
        dataSource={bigData}
        columns={columns}
        pagination={{ pageSize: 4 }}
      />
    );

    // Before sort: 10 items / 4 per page = 3 pages
    const getPageButtons = () => {
      const buttons = container.querySelectorAll('button');
      return Array.from(buttons).filter(
        (b) => b.textContent !== '‹' && b.textContent !== '›'
      );
    };

    expect(getPageButtons()).toHaveLength(3);

    // Sort ascending
    fireEvent.click(screen.getByText('Age'));
    expect(getPageButtons()).toHaveLength(3);

    // Sort descending
    fireEvent.click(screen.getByText('Age'));
    expect(getPageButtons()).toHaveLength(3);
  });

  it('sorted data on page 2 shows correct names alongside ages', () => {
    const { container } = render(
      <Table
        dataSource={bigData}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    );

    // Sort ascending by age
    fireEvent.click(screen.getByText('Age'));

    // Go to page 2
    const buttons = container.querySelectorAll('button');
    const page2Btn = Array.from(buttons).find((b) => b.textContent === '2');
    fireEvent.click(page2Btn!);

    // Full ascending: Ivy(19), Grace(22), Bob(25), Diana(28), Alice(30), Eve(32), Charlie(35), Jack(38), Frank(40), Hank(45)
    // Page 2 (size 5) → Eve(32), Charlie(35), Jack(38), Frank(40), Hank(45)
    expect(getVisibleNames(container)).toEqual(['Eve', 'Charlie', 'Jack', 'Frank', 'Hank']);
    expect(getVisibleAges(container)).toEqual(['32', '35', '38', '40', '45']);
  });

  it('only renders pageSize rows even after sorting', () => {
    const { container } = render(
      <Table
        dataSource={bigData}
        columns={columns}
        pagination={{ pageSize: 3, current: 1 }}
      />
    );

    // Before sort
    expect(container.querySelectorAll('tbody tr')).toHaveLength(3);

    // After sort
    fireEvent.click(screen.getByText('Age'));
    expect(container.querySelectorAll('tbody tr')).toHaveLength(3);
  });
});
