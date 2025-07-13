
import React from 'react';

interface CommitCardProps {
  commit: {
    id: string;
    subject: string;
    author: string;
    date: string;
  };
  onClick: () => void;
  isSelected: boolean;
  isBlurred?: boolean;
  isTopicCommit?: boolean; // New prop
}

const CommitCard: React.FC<CommitCardProps> = ({ commit, onClick, isSelected, isBlurred, isTopicCommit }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-105 relative
        ${isSelected ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg' : 'border border-gray-200 dark:border-gray-700'}
        ${isBlurred ? 'filter blur-sm' : ''}
        ${isTopicCommit ? 'topic-card-stack' : ''}
      `}
      onClick={onClick}
    >
      {isTopicCommit && (
        <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full z-10">Topic</span>
      )}
      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 truncate relative z-10">{commit.subject}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 relative z-10">
        <span className="font-semibold">Author:</span> {commit.author}
      </p>
      <p className="text-600 dark:text-gray-300 text-sm relative z-10">
        <span className="font-semibold">Date:</span> {commit.date}
      </p>
    </div>
  );
};

export default CommitCard;
