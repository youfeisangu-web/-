import { useState, useCallback } from 'react';
import { BrushStroke } from '../types';

const MAX_HISTORY = 50;

export const useColoringState = () => {
  // history は BrushStroke[][] (各スナップショットはストローク配列)
  const [history, setHistory] = useState<BrushStroke[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentStrokes = history[historyIndex];

  const pushState = useCallback(
    (newStrokes: BrushStroke[]) => {
      setHistory(prev => {
        const truncated = prev.slice(0, historyIndex + 1);
        const next = [...truncated, newStrokes];
        if (next.length > MAX_HISTORY) {
          next.shift();
          return next;
        }
        return next;
      });
      setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
    },
    [historyIndex],
  );

  const addBrushStroke = useCallback(
    (stroke: BrushStroke) => {
      pushState([...currentStrokes, stroke]);
    },
    [currentStrokes, pushState],
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
    }
  }, [historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
    }
  }, [historyIndex, history.length]);

  const clear = useCallback(() => {
    pushState([]);
  }, [pushState]);

  return {
    brushStrokes: currentStrokes,
    addBrushStroke,
    undo,
    redo,
    clear,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
  };
};
