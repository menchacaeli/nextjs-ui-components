import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table from './Table';
import { Column } from './table';

interface Person {
  id: number;
  name: string;
  role: string;
}

const data: Person[] = [
  { id: 1, name: 'Alice', role: 'Designer' },
  { id: 2, name: 'Bob',   role: 'Engineer' },
  { id: 3, name: 'Carol', role: 'Manager' },
];

const columns: Column<Person>[] = [
  { key: 'name', header: 'Name',  sortable: true },
  { key: 'role', header: 'Role' },
];

describe('Table', () => {
  it('renders column headers', () => {
    render(<Table data={data} columns={columns} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });

  it('renders all row data', () => {
    render(<Table data={data} columns={columns} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Carol')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it('renders correct number of rows', () => {
    render(<Table data={data} columns={columns} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(data.length + 1); // +1 for header row
  });

  it('applies sortable class to sortable columns', () => {
    const { container } = render(<Table data={data} columns={columns} />);
    const ths = container.querySelectorAll('th.sortable');
    expect(ths).toHaveLength(1);
    expect(ths[0]).toHaveTextContent('Name');
  });

  it('shows sort indicator after clicking sortable header', async () => {
    const { container } = render(<Table data={data} columns={columns} />);
    await userEvent.click(screen.getByText('Name'));
    expect(container.querySelector('.sort-indicator')).toHaveTextContent('↑');
  });

  it('toggles sort direction on second click', async () => {
    const { container } = render(<Table data={data} columns={columns} />);
    await userEvent.click(screen.getByText('Name'));
    await userEvent.click(screen.getByText('Name'));
    expect(container.querySelector('.sort-indicator')).toHaveTextContent('↓');
  });

  it('renders custom cell via render function', () => {
    const columnsWithRender: Column<Person>[] = [
      { key: 'name', header: 'Name', render: (v) => <strong>{String(v)}</strong> },
    ];
    render(<Table data={data} columns={columnsWithRender} />);
    expect(screen.getAllByRole('cell').find((c) => c.querySelector('strong'))).toBeTruthy();
  });

  it('renders selection checkboxes when selectable=true', () => {
    render(<Table data={data} columns={columns} selectable />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(data.length + 1); // +1 for select-all
  });

  it('calls onRowSelect when a row checkbox is toggled', async () => {
    const onRowSelect = vi.fn();
    render(<Table data={data} columns={columns} selectable onRowSelect={onRowSelect} />);
    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[1]); // first data row checkbox
    expect(onRowSelect).toHaveBeenCalled();
  });

  it('does not render pagination when all rows fit on one page', () => {
    render(<Table data={data} columns={columns} rowsPerPage={10} />);
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
  });

  it('renders pagination buttons when rows exceed rowsPerPage', () => {
    render(<Table data={data} columns={columns} rowsPerPage={2} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('Previous button is disabled on first page', () => {
    render(<Table data={data} columns={columns} rowsPerPage={2} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  it('navigates to next page when Next is clicked', async () => {
    render(<Table data={data} columns={columns} rowsPerPage={2} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
  });
});
