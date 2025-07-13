
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
  const [selectedTopicCommits, setSelectedTopicCommits] = useState<CommitSummary[] | undefined>(undefined);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  // Reset selectedCommitId and selectedTopicCommits when currentWeek changes
  useEffect(() => {
    setSelectedCommitId(null);
    setSelectedTopicCommits(undefined);
  }, [currentWeek]);

  const handleCardClick = (commitId: string, topicCommits?: CommitSummary[]) => {
    setSelectedCommitId(prevId => {
      const newId = prevId === commitId ? null : commitId;
      if (newId === null) {
        setSelectedTopicCommits(undefined);
      } else if (topicCommits) {
        setSelectedTopicCommits(topicCommits);
      } else {
        setSelectedTopicCommits(undefined);
      }
      return newId;
    });
  };

  const handlePanelClose = () => {
    setSelectedCommitId(null);
    setSelectedTopicCommits(undefined);
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
    const elements: JSX.Element[] = [];
    let selectedCommitSummary: CommitSummary | null = null;
    let topicCommitsForPanel: CommitSummary[] | undefined = undefined;

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

      if (isTopicGroup) {
        const representativeCommit = topicSummaries[0].commit;
        const topicCardCommit = {
          ...representativeCommit,
          subject: `Topic: ${representativeCommit.subject} (+${topicSummaries.length - 1} more commits)`,
          id: `topic-${topicId}`,
        };

        elements.push(
          <div key={topicId} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CommitCard
              key={topicCardCommit.id}
              commit={topicCardCommit}
              onClick={() => handleCardClick(topicCardCommit.id, topicSummaries)}
              isSelected={selectedCommitId === topicCardCommit.id}
              isBlurred={selectedCommitId !== null && selectedCommitId !== topicCardCommit.id}
              isTopicCommit={true}
            />
          </div>
        );
      } else {
        elements.push(
          <div key={topicId} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicSummaries.map(summary => (
              <CommitCard
                key={summary.commit.id}
                commit={summary.commit}
                onClick={() => handleCardClick(summary.commit.id, undefined)}
                isSelected={selectedCommitId === summary.commit.id}
                isBlurred={selectedCommitId !== null && selectedCommitId !== summary.commit.id}
                isTopicCommit={false}
              />
            ))}
          </div>
        );
      }
    });

    if (selectedCommitId) {
      if (selectedCommitId.startsWith('topic-')) {
        const topicIdFromSelected = selectedCommitId.replace('topic-', '');
        const topicSummaries = groupedSummaries[topicIdFromSelected];
        if (topicSummaries && topicSummaries.length > 0) {
          selectedCommitSummary = topicSummaries[0];
          topicCommitsForPanel = topicSummaries;
        }
      } else {
        selectedCommitSummary = summariesWithDetails.find(s => s.commit.id === selectedCommitId) || null;
        if (selectedCommitSummary && selectedCommitSummary.topicId) {
          topicCommitsForPanel = groupedSummaries[selectedCommitSummary.topicId];
        }
      }
    }

    if (selectedCommitSummary) {
      elements.push(
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
                initialCommitId={selectedCommitId.startsWith('topic-') ? undefined : selectedCommitId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      );
    }
    return elements;
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
