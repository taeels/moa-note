
import React, { useState } from 'react';
import FileDiffViewer from './FileDiffViewer';
import { CommitSummary } from '../../types';

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
  topicCommits?: CommitSummary[]; // Optional: for topic-grouped commits
  initialCommitId?: string; // Optional: to set initial active commit in topic view
}

const CommitDetailPanel: React.FC<CommitDetailPanelProps> = ({
  commit,
  summary,
  onClose,
  topicCommits,
  initialCommitId,
}) => {
  const [activeCommit, setActiveCommit] = useState(
    initialCommitId
      ? topicCommits?.find((s) => s.commit.id === initialCommitId)?.commit || commit
      : commit
  );
  const [activeSummary, setActiveSummary] = useState(
    initialCommitId
      ? topicCommits?.find((s) => s.commit.id === initialCommitId)?.content || summary
      : summary
  );

  const handleTabClick = (commitId: string) => {
    const selected = topicCommits?.find((s) => s.commit.id === commitId);
    if (selected) {
      setActiveCommit(selected.commit);
      setActiveSummary(selected.content);
    }
  };

  const showTabs = topicCommits && topicCommits.length > 1;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 col-span-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{activeCommit.subject}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {showTabs && (
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            {topicCommits.map((s) => (
              <button
                key={s.commit.id}
                onClick={() => handleTabClick(s.commit.id)}
                className={`
                  ${activeCommit.id === s.commit.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}
                  whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm
                `}
              >
                {s.commit.subject.substring(0, 20)}...
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">AI Summary</h4>
          <p className="text-gray-700 dark:text-gray-200 text-base">{activeSummary}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">File Diff</h4>
          <FileDiffViewer diff={activeCommit.diff} />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Metadata</h4>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">
            <p><strong>Author:</strong> {activeCommit.author}</p>
            <p><strong>Date:</strong> {activeCommit.date}</p>
            <p><strong>Commit ID:</strong> {activeCommit.id}</p>
            <p><strong>Gerrit Link:</strong> <a href={activeCommit.gerritLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{activeCommit.gerritLink}</a></p>
          </div>
        </div>
      </div>
      <a href={activeCommit.gerritLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm mt-6 inline-block">
        View on Gerrit
      </a>
    </div>
  );
};

export default CommitDetailPanel;
