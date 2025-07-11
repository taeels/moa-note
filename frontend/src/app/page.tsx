
'use client';

import { useState, useRef, useEffect } from 'react';
import { sampleDigests } from '../sampleData';
import CommitCard from '../components/Commit/CommitCard';
import CommitDetailPanel from '../components/Commit/CommitDetailPanel';

export default function Home() {
  const [selectedCommitId, setSelectedCommitId] = useState<string | null>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (commitId: string) => {
    setSelectedCommitId(prevId => (prevId === commitId ? null : commitId));
  };

  const handlePanelClose = () => {
    setSelectedCommitId(null);
  };

  useEffect(() => {
    if (selectedCommitId && detailPanelRef.current) {
      setTimeout(() => {
        detailPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // Delay to allow rendering
    }
  }, [selectedCommitId]);

  const renderSummaries = (summaries: typeof sampleDigests[0]['summaries']) => {
    const rows: JSX.Element[] = [];
    let selectedCommitSummary = null;

    const summariesWithDetails = summaries.map(summary => ({
      ...summary,
      commit: {
        ...summary.commit,
        gerritLink: summary.commit.gerritLink || '#',
        diff: summary.commit.diff || '',
      },
    }));

    for (let i = 0; i < summariesWithDetails.length; i += 3) {
      const rowItems = summariesWithDetails.slice(i, i + 3);
      rows.push(
        <div key={`row-${i}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rowItems.map(summary => (
            <CommitCard
              key={summary.commit.id}
              commit={summary.commit}
              onClick={() => handleCardClick(summary.commit.id)}
            />
          ))}
        </div>
      );

      const selectedInRow = rowItems.find(s => s.commit.id === selectedCommitId);
      if (selectedInRow) {
        selectedCommitSummary = selectedInRow;
        rows.push(
          <div key={`detail-${selectedCommitId}`} ref={detailPanelRef} className="mt-4 space-y-4">
            <CommitDetailPanel
              commit={selectedCommitSummary.commit}
              summary={selectedCommitSummary.content}
              onClose={handlePanelClose}
            />
          </div>
        );
      }
    }
    return rows;
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Weekly Commit Digests</h2>
      <div className="space-y-8">
        {sampleDigests.map((digest) => (
          <div key={digest.id}>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {`${digest.user.username}'s Digest (${digest.startDate} - ${digest.endDate})`}
            </h3>
            <div className="space-y-4">
              {renderSummaries(digest.summaries)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
