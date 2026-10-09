'use client';

// components/PlanList.tsx
// Desktop left column: a plain numbered list of the nine sections.
// Sitting directly on the calm solid backdrop with NO cards and NO glass.
// Each item displays only a small monospace number and the section name:
// 01 The Product ... 09 The AI Starter Prompt.
// Behavior:
// - Accessible tablist with arrow key navigation (Up/Down) and visible focus ring.
// - Clicking or hovering an item selects it.
// - The selected list item uses the accent color (#FF5722). Nothing else in the section uses the accent color.

import React, { useRef } from 'react';

export interface PlanItemMeta {
  id: string; // '01', '02', etc.
  title: string; // 'The Product', etc.
}

interface PlanListProps {
  items: PlanItemMeta[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function PlanList({
  items,
  selectedIndex,
  onSelect,
}: PlanListProps) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = items.length - 1;
    } else {
      return;
    }

    onSelect(nextIndex);
    itemRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Build Plan Sections"
      aria-orientation="vertical"
      className="flex flex-col gap-2.5 sm:gap-3 select-none"
    >
      {items.map((item, idx) => {
        const isSelected = idx === selectedIndex;

        return (
          <button
            key={item.id}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            role="tab"
            id={`plan-tab-${item.id}`}
            aria-controls={`plan-panel-${item.id}`}
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(idx)}
            onMouseEnter={() => onSelect(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            type="button"
            className={`group text-left flex items-baseline gap-3 py-2 px-1 rounded-md transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141d26] ${
              isSelected
                ? 'text-[#FF5722] font-semibold'
                : 'text-white/70 hover:text-white font-normal'
            }`}
          >
            {/* Small monospace number */}
            <span
              className={`font-mono text-xs tracking-wider transition-colors duration-150 ${
                isSelected ? 'text-[#FF5722]' : 'text-white/45 group-hover:text-white/75'
              }`}
            >
              {item.id}
            </span>

            {/* Section Name */}
            <span className="text-base sm:text-lg font-sans tracking-tight">
              {item.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
