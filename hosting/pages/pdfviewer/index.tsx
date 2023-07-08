import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './styles.module.css'


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer() {
  console.log("PDFです")
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  // const renderPages = () => {
  //   let pages = [];
  //   for (let i = 1; i <= numPages; i++) {
  //     let className = i === pageNumber ? 'highlightedPage' : 'normalPage';
  //     pages.push(<Page className={className} pageNumber={i} />);
  //   }
  //   return pages;
  // }


  const highlightedPage = 1;
  return (
    <div>
      <p>
        ⭐️Page {pageNumber} of {numPages}
      </p>
      <Document file="http://localhost:3333/api/pdf" onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, index) => (
          <div className={index === highlightedPage ? styles.highlightedPage : styles.normalPage}
            key={index}>
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}

            />
          </div>
        ))}
      </Document>

    </div>
  );
}