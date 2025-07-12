
import React, { useEffect, useRef } from 'react';
import * as Diff2Html from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';

interface FileDiffViewerProps {
  diff: string;
}

const FileDiffViewer: React.FC<FileDiffViewerProps> = ({ diff }) => {
  const diffContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diffContainerRef.current && diff) {
      const diffJson = Diff2Html.parse(diff);
      const diffHtml = Diff2Html.html(diffJson, {
        outputFormat: 'side-by-side',
        drawFileList: true,
      });
      diffContainerRef.current.innerHTML = diffHtml;
    }
  }, [diff]);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div ref={diffContainerRef} />
    </div>
  );
};

export default FileDiffViewer;
