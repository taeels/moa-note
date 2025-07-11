import React from 'react';
import { Diff2Html } from 'react-diff2html';
import 'diff2html/bundles/css/diff2html.min.css';

interface CommitDetailPanelProps {
  commit: {
    id: string;
    subject: string;
    author: string;
    date: string;
    gerritLink: string;
    diff: string;
  };
  summary: string;
  onClose: () => void;
}

const CommitDetailPanel: React.FC<CommitDetailPanelProps> = ({ commit, summary, onClose }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 col-span-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{commit.subject}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">AI Summary</h4>
          <p className="text-gray-700 dark:text-gray-200 text-base">{summary}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">File Diff</h4>
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div>Diff Viewer Placeholder</div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Patchset History</h4>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500">Placeholder for patchset history</div>
        </div>
      </div>
      <a href={commit.gerritLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm mt-6 inline-block">
        View on Gerrit
      </a>
    </div>
  );
};

export default CommitDetailPanel;