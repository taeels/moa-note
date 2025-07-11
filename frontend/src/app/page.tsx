'use client';

import { sampleDigests } from '../sampleData';

export default function Home() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Weekly Commit Digests</h2>
      <div className="space-y-4">
        {sampleDigests.map((digest) => (
          <div key={digest.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {`${digest.user.username}'s Digest (${digest.startDate} - ${digest.endDate})`}
            </h3>
            <div className="space-y-3">
              {digest.summaries.map((summary) => (
                <div key={summary.id} className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">{summary.commit.subject}</h4>
                    <a href={summary.commit.gerritLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                      Gerrit Link
                    </a>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="font-semibold">Author:</span> {summary.commit.author}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="font-semibold">Date:</span> {summary.commit.date}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200 mt-2">{summary.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
