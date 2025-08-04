"use client";

import { File } from "@/lib/data";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import { useCallback, useState } from "react";
import { useResizeObserver } from '@wojtekmaj/react-hooks';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
  wasmUrl: '/wasm/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

export default function PreviewDocument({ file }: { file: File }) {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);


  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: PDFDocumentProxy) => {
    setNumPages(nextNumPages);
    setCurrentPage(1);
  }
  return (
    <div ref={setContainerRef} className="flex justify-center">
      <Document
        file={`/content/files/${file.id}/${file.previewFile}`}
        options={options}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={currentPage}
          width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
        />
      </Document>
    </div>
  );
}