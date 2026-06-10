import { useRef, useState, useCallback } from "react";
import "./FileUpload.css";
import { FileUploadProps } from "./file-upload.ts";
import { UploadCloud, File as FileIcon, X } from "lucide-react";

const formatBytes = (bytes: number): string => {
  if (bytes < 1024)            return `${bytes} B`;
  if (bytes < 1024 * 1024)     return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FileUpload = ({
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  onChange,
  disabled = false,
  label,
  error: externalError,
  className = "",
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files,         setFiles]         = useState<File[]>([]);
  const [dragging,      setDragging]      = useState(false);
  const [internalError, setInternalError] = useState("");

  const visibleError = externalError ?? internalError;

  const applyFiles = useCallback((incoming: File[]) => {
    let err   = "";
    let valid = incoming;

    if (maxSize) {
      const over = incoming.filter((f) => f.size > maxSize);
      if (over.length) {
        err   = `"${over[0].name}" exceeds the ${formatBytes(maxSize)} limit.`;
        valid = incoming.filter((f) => f.size <= maxSize);
      }
    }

    const combined = multiple ? [...files, ...valid] : valid;
    if (maxFiles && combined.length > maxFiles) {
      err = err || `Maximum ${maxFiles} file${maxFiles !== 1 ? "s" : ""} allowed.`;
    }

    const final = maxFiles ? combined.slice(0, maxFiles) : combined;
    setInternalError(err);
    setFiles(final);
    onChange?.(final);
  }, [files, multiple, maxSize, maxFiles, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) applyFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const dropped = Array.from(e.dataTransfer.files);
    applyFiles(multiple ? dropped : [dropped[0]]);
  };

  const remove = (i: number) => {
    const updated = files.filter((_, idx) => idx !== i);
    setFiles(updated);
    onChange?.(updated);
    setInternalError("");
  };

  const hintParts = [
    accept                     && `Accepted: ${accept}`,
    maxSize                    && `Max ${formatBytes(maxSize)}`,
    maxFiles && multiple       && `Up to ${maxFiles} files`,
  ].filter(Boolean);

  return (
    <div className={`file-upload ${className}`}>
      {label && <span className="file-upload--label-text">{label}</span>}

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload files"
        className={[
          "file-upload--zone",
          disabled         && "disabled",
          dragging         && "dragging",
          visibleError     && "has-error",
        ].filter(Boolean).join(" ")}
        onDragOver={(e)  => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={()  => setDragging(false)}
        onDrop={handleDrop}
        onClick={()      => !disabled && inputRef.current?.click()}
        onKeyDown={(e)   => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); !disabled && inputRef.current?.click(); } }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
          className="file-upload--input"
          tabIndex={-1}
          aria-hidden="true"
        />
        <UploadCloud size={32} className="file-upload--zone-icon" aria-hidden="true" />
        <p className="file-upload--zone-text">
          <strong>Click to upload</strong> or drag and drop
        </p>
        {hintParts.length > 0 && (
          <p className="file-upload--zone-hint">{hintParts.join(" · ")}</p>
        )}
      </div>

      {visibleError && (
        <span className="file-upload--error-text" role="alert">{visibleError}</span>
      )}

      {files.length > 0 && (
        <ul className="file-upload--list">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="file-upload--file">
              <FileIcon size={16} className="file-upload--file-icon" aria-hidden="true" />
              <div className="file-upload--file-info">
                <span className="file-upload--file-name">{file.name}</span>
                <span className="file-upload--file-size">{formatBytes(file.size)}</span>
              </div>
              <button
                type="button"
                className="file-upload--file-remove"
                onClick={(e) => { e.stopPropagation(); remove(i); }}
                aria-label={`Remove ${file.name}`}
              >
                <X size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
