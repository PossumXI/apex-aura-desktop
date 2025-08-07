import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Minimize2, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface UploadWidgetProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const UploadWidget = ({ onClose, isMinimized, onToggleMinimize }: UploadWidgetProps) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('idle');
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files[0]) {
      setSelectedFile(files[0]);
      setUploadStatus('idle');
    }
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-20 right-44 w-16 h-16 glass-strong border-primary/20 cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={onToggleMinimize}>
        <CardContent className="p-0 flex items-center justify-center h-full">
          <Upload className="w-6 h-6 text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed top-20 left-96 w-80 h-[32rem] glass-strong border-primary/10 hierarchy-primary transition-all duration-500 animate-float rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/10">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Upload Files
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="interactive-element rounded-xl" onClick={onToggleMinimize}>
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="interactive-element rounded-xl" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-8 space-y-6">
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center glass-light hover:glass-strong interactive-element hierarchy-tertiary"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Upload Zip Files</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your .zip files here or click to browse
          </p>
          <Badge variant="outline" className="glass-light rounded-xl">
            Supported: .zip, .tar.gz, .rar
          </Badge>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip,.tar.gz,.rar"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Selected File Info */}
        {selectedFile && (
          <div className="glass-light p-5 rounded-2xl space-y-3 hierarchy-tertiary">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-sm truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>

            {/* Upload Progress */}
            {uploadStatus === 'uploading' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300 hierarchy-tertiary"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Success State */}
            {uploadStatus === 'success' && (
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Upload successful!</span>
              </div>
            )}

            {/* Error State */}
            {uploadStatus === 'error' && (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Upload failed. Try again.</span>
              </div>
            )}
          </div>
        )}

        {/* Upload Button */}
        <Button
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-4 interactive-element rounded-2xl hierarchy-secondary"
          onClick={handleUpload}
          disabled={!selectedFile || uploadStatus === 'uploading'}
        >
          {uploadStatus === 'uploading' ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Uploading...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload File</span>
            </div>
          )}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Files will be made available for purchase after review</p>
          <p>• Maximum file size: 100MB</p>
          <p>• Processing time: 24-48 hours</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadWidget;