export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;      // bytes
  maxFiles?: number;
  onChange?: (files: File[]) => void;
  disabled?: boolean;
  label?: string;
  error?: string;
  className?: string;
}
