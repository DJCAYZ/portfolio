"use client";

import { File } from "@/lib/data";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import { useCallback, useEffect, useState } from "react";
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import DownloadButton from "@/components/download-button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
  wasmUrl: '/wasm/',
};

const resizeObserverOptions = {};

const maxWidth = 600;

export default function PreviewDocument({ file }: { file: File }) {
  const [numPages, setNumPages] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [fileExists, setFileExists] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  useEffect(() => {
    setLoading(true);
    async function checkFile() {
      try {
        const response = await fetch(`/api/check-file-preview?id=${file.id}`);
        const { exists } = await response.json();
        setFileExists(exists);
      } catch (error) {
        console.error('Error checking file:', error);
        setFileExists(false);
      }
    }
    
    checkFile().then(() => setLoading(false));
  }, [file.id]);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: PDFDocumentProxy) => {
    setNumPages(nextNumPages);
  }

  if (loading) return;

  if (!fileExists) {
    return (
      <div className="flex justify-center p-20">
        <div className="bg-gray-500 px-20 py-4 rounded-lg flex flex-col justify-center gap-2">
          <p>Preview not available</p>
          <DownloadButton link={`/content/file/${file.id}/${file.fileName}`} fileName={file.fileName} />
        </div>
      </div>
    );
  }

  return (
    <div ref={setContainerRef} className="flex justify-center px-4 py-2">
      <Document
        file={`/content/file/${file.id}/preview.pdf`}
        options={options}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={() => console.log('test')}
        className="space-y-2"
      >
        {Array.from(new Array(numPages)).map((_, index) => (
          <Page
            key={`page_${index+1}`}
            pageNumber={index+1}
            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
          />
        ))}
      </Document>
    </div>
  );
}