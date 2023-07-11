'use client';
import React, { useState } from 'react';
import './ProjectStyles.css';

export interface Quest {
  questId: number;
  questTitle: string;
  questDescription?: string;
  type: string;
}

interface OneQuestPartProps {
  quest: Quest | null;
}

function OneQuestPart({ quest }: OneQuestPartProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleFunc = () => {
    setIsOpen((v) => {
      return !v;
    });
  };

  if (quest) {
    return (
      <div className="quest-container">
        <div>
          <div
            className="flex justify-start mb-3 hover:cursor-pointer px-5 pt-5"
            onClick={() => {
              toggleFunc();
            }}
          >
            <span>{isOpen ? '🔽' : '▶️'}</span>
            <span className="mx-2">{quest.questTitle}</span>
          </div>
          {isOpen && (
            <span className="ml-5">{quest.questDescription ?? '-'}</span>
          )}
          <div className="quest-success-btn">Quest 완료</div>
        </div>
      </div>
    );
  }
  return <div>... 로딩중 ...</div>;
}

export default OneQuestPart;
