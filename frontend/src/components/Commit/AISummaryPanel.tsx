
import React from 'react';

interface AISummaryPanelProps {
  summary: string;
}

const AISummaryPanel: React.FC<AISummaryPanelProps> = ({ summary }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">AI Summary</h4>
      <p className="text-gray-700 dark:text-gray-200">{summary}</p>
    </div>
  );
};

export default AISummaryPanel;
