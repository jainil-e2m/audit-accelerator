import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Link as LinkIcon, FileSpreadsheet, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SheetUploaderProps {
  onUpload: (file?: File, sheetUrl?: string) => void;
  isLoading?: boolean;
}

export function SheetUploader({ onUpload, isLoading }: SheetUploaderProps) {
  const [sheetUrl, setSheetUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      setSheetUrl('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  const handleSubmit = () => {
    if (uploadedFile) {
      onUpload(uploadedFile);
    } else if (sheetUrl.trim()) {
      onUpload(undefined, sheetUrl.trim());
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
  };

  const canSubmit = uploadedFile || sheetUrl.trim();

  return (
    <div className="card-elevated mx-auto max-w-2xl p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Import Client Master Data Sheet
      </h3>

      {/* Tab Selector */}
      <div className="mb-4 flex rounded-lg bg-secondary p-1">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
            activeTab === 'upload'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Upload className="mr-2 inline-block h-4 w-4" />
          Upload File
        </button>
        <button
          onClick={() => setActiveTab('url')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
            activeTab === 'url'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <LinkIcon className="mr-2 inline-block h-4 w-4" />
          Google Sheets URL
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          {uploadedFile ? (
            <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-secondary/50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="font-medium text-foreground">
                {isDragActive
                  ? 'Drop your file here'
                  : 'Drag & drop your file here'}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                or click to browse • CSV, XLS, XLSX
              </p>
            </div>
          )}
        </div>
      )}

      {/* URL Tab */}
      {activeTab === 'url' && (
        <div className="space-y-3">
          <Input
            type="url"
            placeholder="https://docs.google.com/spreadsheets/d/..."
            value={sheetUrl}
            onChange={(e) => {
              setSheetUrl(e.target.value);
              setUploadedFile(null);
            }}
            disabled={isLoading}
            className="h-12"
          />
          <p className="text-sm text-muted-foreground">
            Paste a public Google Sheets URL. Ensure the sheet is shared with "Anyone with the link."
          </p>
        </div>
      )}

      {/* Load Demo Data Link */}
      <div className="mt-4 text-center">
        <button
          onClick={() => onUpload()}
          className="text-sm text-primary hover:underline"
          disabled={isLoading}
        >
          Or load demo data to explore the app →
        </button>
      </div>

      {/* Submit Button */}
      {canSubmit && (
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? 'Processing...' : 'Import Data'}
        </Button>
      )}
    </div>
  );
}
