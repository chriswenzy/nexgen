"use client";
import { useState, useCallback } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { Card, Alert, ProgressBar } from "react-bootstrap";
import "filepond/dist/filepond.min.css";

// Register plugins (in a real app, you'd import these)
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function ImageUpload({
  onUploadComplete,
  existingImage = null,
  folder = "blog",
}) {
  const [files, setFiles] = useState(existingImage ? [existingImage] : []);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleProcessFile = (error, file) => {
    if (error) {
      console.error("Upload error:", error);
      return;
    }

    // Simulate upload progress
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);

        // In a real app, you'd get the actual URL from your backend
        const imageUrl = URL.createObjectURL(file.file);

        if (onUploadComplete) {
          onUploadComplete({
            url: imageUrl,
            filename: file.filename,
            size: file.file.size,
            type: file.file.type,
          });
        }
      }
    }, 200);
  };

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">Featured Image</h6>
      </Card.Header>
      <Card.Body>
        {isUploading && (
          <div className="mb-3">
            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
            <small className="text-muted">Uploading image...</small>
          </div>
        )}

        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={false}
          maxFiles={1}
          name="image"
          labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
          imagePreviewHeight={200}
          imageCropAspectRatio="16:9"
          imageResizeTargetWidth={800}
          imageResizeTargetHeight={450}
          stylePanelLayout="compact circle"
          styleLoadIndicatorPosition="center"
          styleProgressIndicatorPosition="right"
          styleButtonRemoveItemPosition="left"
          styleButtonProcessItemPosition="right"
          onprocessfile={handleProcessFile}
          server={{
            process: (
              fieldName,
              file,
              metadata,
              load,
              error,
              progress,
              abort
            ) => {
              // Simulate server process
              const controller = new AbortController();

              // Simulate progress
              const interval = setInterval(() => {
                progress(true, Math.random() * 100, 100);
              }, 500);

              // Simulate completion
              setTimeout(() => {
                clearInterval(interval);
                load(URL.createObjectURL(file));
              }, 2000);

              return {
                abort: () => {
                  clearInterval(interval);
                  abort();
                },
              };
            },
          }}
        />

        <div className="mt-3">
          <small className="text-muted">
            Recommended: 16:9 aspect ratio, minimum 800×450px, max 2MB
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}
