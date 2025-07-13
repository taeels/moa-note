'use client';

import React from 'react';
import { useWeek } from '../context/WeekContext';

interface SidebarProps {
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({ username }) => {
  const { currentWeek, setCurrentWeek } = useWeek();

  // Dummy data for weekly cards
  const weeklyCards = [
    { cw: 'CW30', summaryCount: 15, dateRange: 'Jul 15 - Jul 22' },
    { cw: 'CW29', summaryCount: 15, dateRange: 'Jul 15 - Jul 22' },
    { cw: 'CW28', summaryCount: 15, dateRange: 'Jul 8 - Jul 14' },
    { cw: 'CW27', summaryCount: 12, dateRange: 'Jul 1 - Jul 7' },
    { cw: 'CW26', summaryCount: 18, dateRange: 'Jun 24 - Jun 30' },
    { cw: 'CW25', summaryCount: 9, dateRange: 'Jun 17 - Jun 23' },
    { cw: 'CW24', summaryCount: 20, dateRange: 'Jun 10 - Jun 16' },
  ];

  const handleCardClick = (cw: string) => {
    setCurrentWeek(cw);
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Moa-Note</h1>
      <div className="text-lg text-gray-700 dark:text-gray-300 mb-4">Welcome, {username}</div>
      <hr className="border-gray-300 dark:border-gray-700 mb-4" />
      <div className="flex-grow">
        {weeklyCards.map((card) => (
          <div
            key={card.cw}
            className={`p-3 mb-2 rounded-md cursor-pointer transition-colors duration-200
              ${card.cw === currentWeek ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}
            `}
            onClick={() => handleCardClick(card.cw)}
            title={card.dateRange} // Tooltip
          >
            <div className="font-semibold">{card.cw}</div>
            <div className="text-sm">{card.summaryCount} Summaries</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
