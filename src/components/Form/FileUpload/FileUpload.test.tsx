import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileUpload from './FileUpload';

const makeFile = (name: string, size: number, type = 'text/plain') =>
  new File(['x'.repeat(size)], name, { type });

describe('FileUpload', () => {
  it('renders the upload zone', () => {
    render(<FileUpload />);
    expect(screen.getByRole('button', { name: 'Upload files' })).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<FileUpload label="Attachments" />);
    expect(screen.getByText('Attachments')).toBeInTheDocument();
  });

  it('renders external error with role="alert"', () => {
    render(<FileUpload error="Upload failed" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Upload failed');
  });

  it('adds file to the list when selected via input', () => {
    const { container } = render(<FileUpload onChange={vi.fn()} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile('report.pdf', 100, 'application/pdf');
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
  });

  it('calls onChange with the selected files', () => {
    const onChange = vi.fn();
    const { container } = render(<FileUpload onChange={onChange} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile('photo.png', 200, 'image/png');
    fireEvent.change(input, { target: { files: [file] } });
    expect(onChange).toHaveBeenCalledWith([file]);
  });

  it('shows remove button for each file', () => {
    const { container } = render(<FileUpload />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [makeFile('a.txt', 10)] } });
    expect(screen.getByRole('button', { name: 'Remove a.txt' })).toBeInTheDocument();
  });

  it('removes file when remove button is clicked', async () => {
    const onChange = vi.fn();
    const { container } = render(<FileUpload onChange={onChange} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [makeFile('a.txt', 10)] } });
    await userEvent.click(screen.getByRole('button', { name: 'Remove a.txt' }));
    expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('shows size error when file exceeds maxSize', () => {
    const { container } = render(<FileUpload maxSize={50} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [makeFile('big.txt', 100)] } });
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('does not add oversized file to list', () => {
    const { container } = render(<FileUpload maxSize={50} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [makeFile('big.txt', 100)] } });
    expect(screen.queryByText('big.txt')).not.toBeInTheDocument();
  });

  it('upload zone is aria-disabled when disabled', () => {
    render(<FileUpload disabled />);
    expect(screen.getByRole('button', { name: 'Upload files' })).toHaveAttribute('tabindex', '-1');
  });

  it('shows hint when accept is provided', () => {
    render(<FileUpload accept=".pdf,.doc" />);
    expect(screen.getByText(/Accepted: \.pdf,\.doc/)).toBeInTheDocument();
  });
});
