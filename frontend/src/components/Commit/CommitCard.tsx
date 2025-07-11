
import React from 'react';

interface CommitCardProps {
  commit: {
    id: string;
    subject: string;
    author: string;
    date: string;
  };
  onClick: () => void;
}

const CommitCard: React.FC<CommitCardProps> = ({ commit, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={onClick}
    >
      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 truncate">{commit.subject}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
        <span className="font-semibold">Author:</span> {commit.author}
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        <span className="font-semibold">Date:</span> {commit.date}
      </p>
    </div>
  );
};

export default CommitCard;
