import { useState, useCallback } from 'react';
import { ColoredPath } from '../types';
import { DEFAULT_COLOR } from '../data/colors';

interface BrushStroke {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  size: number;
}

interface ColoringState {
  coloredPaths: ColoredPath[];
  brushStrokes: BrushStroke[];
}

const MAX_HISTORY = 50;

export const useColoringState = () => {
  const [history, setHistory] = useState<ColoringState[]>([
    { coloredPaths: [], brushStrokes: [] },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentState = history[historyIndex];

  const pushState = useCallback(
    (newState: ColoringState) => {
      setHistory(prev => {
        // Remove any future states (when undoing then doing new action)
        const truncated = prev.slice(0, historyIndex + 1);
        const next = [...truncated, newState];
        // Limit history length
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

  const colorPath = useCallback(
    (pathId: string, color: string) => {
      const existingIndex = currentState.coloredPaths.findIndex(
        cp => cp.pathId === pathId,
      );
      let newColoredPaths: ColoredPath[];
      if (existingIndex >= 0) {
        newColoredPaths = currentState.coloredPaths.map(cp =>
          cp.pathId === pathId ? { ...cp, color } : cp,
        );
      } else {
        newColoredPaths = [...currentState.coloredPaths, { pathId, color }];
      }
      pushState({
        ...currentState,
        coloredPaths: newColoredPaths,
      });
    },
    [currentState, pushState],
  );

  const addBrushStroke = useCallback(
    (stroke: BrushStroke) => {
      pushState({
        ...currentState,
        brushStrokes: [...currentState.brushStrokes, stroke],
      });
    },
    [currentState, pushState],
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
    pushState({ coloredPaths: [], brushStrokes: [] });
  }, [pushState]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    coloredPaths: currentState.coloredPaths,
    brushStrokes: currentState.brushStrokes,
    colorPath,
    addBrushStroke,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
  };
};
