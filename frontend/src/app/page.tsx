
'use client';

import { useState, useRef, useEffect } from 'react';
import { sampleDigests } from '../sampleData';
import { CommitSummary, Digest } from '../types';
import CommitCard from '../components/Commit/CommitCard';
import CommitDetailPanel from '../components/Commit/CommitDetailPanel';
import { useWeek } from '../context/WeekContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { currentWeek } = useWeek();
  const [selectedCommitId, setSelectedCommitId] = useState<string | null>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  // Reset selectedCommitId when currentWeek changes
  useEffect(() => {
    setSelectedCommitId(null);
  }, [currentWeek]);

  const handleCardClick = (commitId: string, topicCommits?: CommitSummary[]) => {
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

  const filteredDigests = sampleDigests.filter(digest => digest.cw === currentWeek);

  const renderSummaries = (summaries: CommitSummary[]) => {
    const rows: JSX.Element[] = [];
    let selectedCommitSummary: CommitSummary | null = null;

    const summariesWithDetails = summaries.map(summary => ({
      ...summary,
      commit: {
        ...summary.commit,
        gerritLink: summary.commit.gerritLink || '#',
        diff: summary.commit.diff || '',
      },
    }));

    const groupedSummaries: { [key: string]: CommitSummary[] } = {};
    summariesWithDetails.forEach(summary => {
      const topicId = summary.topicId || 'no-topic';
      if (!groupedSummaries[topicId]) {
        groupedSummaries[topicId] = [];
      }
      groupedSummaries[topicId].push(summary);
    });

    Object.keys(groupedSummaries).forEach(topicId => {
      const topicSummaries = groupedSummaries[topicId];
      const isTopicGroup = topicId !== 'no-topic' && topicSummaries.length > 1;

      rows.push(
        <div key={topicId} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicSummaries.map(summary => (
            <CommitCard
              key={summary.commit.id}
              commit={summary.commit}
              onClick={() => handleCardClick(summary.commit.id, isTopicGroup ? topicSummaries : undefined)}
              isSelected={selectedCommitId === summary.commit.id}
              isBlurred={selectedCommitId !== null && selectedCommitId !== summary.commit.id}
              isTopicCommit={isTopicGroup}
            />
          ))}
        </div>
      );
    });

    if (selectedCommitId) {
      selectedCommitSummary = summariesWithDetails.find(s => s.commit.id === selectedCommitId) || null;
    }

    if (selectedCommitSummary) {
      const topicCommitsForPanel = selectedCommitSummary.topicId
        ? groupedSummaries[selectedCommitSummary.topicId]
        : undefined;

      rows.push(
        <AnimatePresence key={`detail-panel-${selectedCommitId}`}>
          {selectedCommitId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              ref={detailPanelRef}
              className="mt-4 space-y-4 col-span-full"
            >
              <CommitDetailPanel
                commit={selectedCommitSummary.commit}
                summary={selectedCommitSummary.content}
                onClose={handlePanelClose}
                topicCommits={topicCommitsForPanel}
                initialCommitId={selectedCommitId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      );
    }
    return rows;
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Weekly Commit Digests</h2>
      <div className="space-y-8">
        {filteredDigests.map((digest) => (
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
