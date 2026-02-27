import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import Svg, {
  Path,
  G,
  Circle,
  Line,
} from 'react-native-svg';
import { ColoringPage, ColoredPath, SvgPathItem, ToolState } from '../types';
import { ERASER_COLOR } from '../data/colors';

interface StrokePoint {
  x: number;
  y: number;
}

interface BrushStroke {
  id: string;
  points: StrokePoint[];
  color: string;
  size: number;
}

interface ColoringCanvasProps {
  page: ColoringPage;
  toolState: ToolState;
  coloredPaths: ColoredPath[];
  brushStrokes: BrushStroke[];
  onPathColored: (pathId: string, color: string) => void;
  onBrushStroke: (stroke: BrushStroke) => void;
  viewRef: React.RefObject<View>;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CANVAS_SIZE = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT - 220);
const SVG_VIEWBOX = 300;
const SCALE = CANVAS_SIZE / SVG_VIEWBOX;

const ColoringCanvas: React.FC<ColoringCanvasProps> = ({
  page,
  toolState,
  coloredPaths,
  brushStrokes,
  onPathColored,
  onBrushStroke,
  viewRef,
}) => {
  const currentStrokeRef = useRef<StrokePoint[]>([]);
  const isDrawingRef = useRef(false);
  const [liveStroke, setLiveStroke] = useState<StrokePoint[]>([]);

  const getColorForPath = useCallback(
    (pathId: string, defaultFill: string): string => {
      const colored = coloredPaths.find(cp => cp.pathId === pathId);
      return colored ? colored.color : defaultFill;
    },
    [coloredPaths],
  );

  const hitTestPath = useCallback(
    (svgX: number, svgY: number): SvgPathItem | null => {
      // Simple bounding box hit test for each path segment
      // In production, you'd use a proper SVG hit test
      for (let i = page.svgPaths.length - 1; i >= 0; i--) {
        const path = page.svgPaths[i];
        if (path.defaultFill === 'none') continue;
        // Parse rough bounding from path 'd' attribute
        const coords = path.d.match(/-?\d+\.?\d*/g)?.map(Number) || [];
        if (coords.length < 2) continue;

        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        for (let j = 0; j < coords.length - 1; j += 2) {
          if (coords[j] !== undefined && coords[j + 1] !== undefined) {
            minX = Math.min(minX, coords[j]);
            maxX = Math.max(maxX, coords[j]);
            minY = Math.min(minY, coords[j + 1]);
            maxY = Math.max(maxY, coords[j + 1]);
          }
        }

        const padding = 10;
        if (
          svgX >= minX - padding &&
          svgX <= maxX + padding &&
          svgY >= minY - padding &&
          svgY <= maxY + padding
        ) {
          return path;
        }
      }
      return null;
    },
    [page.svgPaths],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (e: GestureResponderEvent) => {
        const { locationX, locationY } = e.nativeEvent;
        const svgX = locationX / SCALE;
        const svgY = locationY / SCALE;

        if (toolState.tool === 'fill') {
          // Fill mode: tap to color a region
          const hitPath = hitTestPath(svgX, svgY);
          if (hitPath) {
            const fillColor =
              toolState.tool === 'fill' ? toolState.selectedColor : ERASER_COLOR;
            onPathColored(hitPath.id, fillColor);
          }
        } else {
          // Brush/eraser mode: start drawing
          isDrawingRef.current = true;
          currentStrokeRef.current = [{ x: locationX, y: locationY }];
          setLiveStroke([{ x: locationX, y: locationY }]);
        }
      },

      onPanResponderMove: (e: GestureResponderEvent) => {
        if (!isDrawingRef.current) return;
        const { locationX, locationY } = e.nativeEvent;
        currentStrokeRef.current = [
          ...currentStrokeRef.current,
          { x: locationX, y: locationY },
        ];
        setLiveStroke([...currentStrokeRef.current]);
      },

      onPanResponderRelease: () => {
        if (!isDrawingRef.current) return;
        isDrawingRef.current = false;
        if (currentStrokeRef.current.length > 0) {
          const strokeColor =
            toolState.tool === 'eraser'
              ? ERASER_COLOR
              : toolState.selectedColor;
          onBrushStroke({
            id: `stroke_${Date.now()}`,
            points: currentStrokeRef.current,
            color: strokeColor,
            size: toolState.brushSize,
          });
        }
        currentStrokeRef.current = [];
        setLiveStroke([]);
      },
    }),
  ).current;

  const buildPolylinePath = (points: StrokePoint[]): string => {
    if (points.length === 0) return '';
    if (points.length === 1) {
      const { x, y } = points[0];
      return `M ${x} ${y} L ${x + 0.1} ${y + 0.1}`;
    }
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  return (
    <View
      ref={viewRef}
      style={styles.container}
      {...panResponder.panHandlers}>
      <Svg
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        viewBox={`0 0 ${SVG_VIEWBOX} ${SVG_VIEWBOX}`}
        style={styles.svg}>
        {/* Background */}
        <Path d={`M 0 0 L ${SVG_VIEWBOX} 0 L ${SVG_VIEWBOX} ${SVG_VIEWBOX} L 0 ${SVG_VIEWBOX} Z`} fill="#FFFFFF" />

        {/* Coloring page paths */}
        <G>
          {page.svgPaths.map(pathItem => (
            <Path
              key={pathItem.id}
              d={pathItem.d}
              fill={getColorForPath(pathItem.id, pathItem.defaultFill)}
              stroke={pathItem.stroke}
              strokeWidth={pathItem.strokeWidth}
              fillRule={pathItem.fillRule || 'nonzero'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </G>

        {/* Brush strokes (rendered in canvas pixel space) */}
        <G transform={`scale(${1 / SCALE})`}>
          {brushStrokes.map(stroke => (
            <Path
              key={stroke.id}
              d={buildPolylinePath(stroke.points)}
              stroke={stroke.color}
              strokeWidth={stroke.size}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {/* Live stroke being drawn */}
          {liveStroke.length > 0 && (
            <Path
              d={buildPolylinePath(liveStroke)}
              stroke={
                toolState.tool === 'eraser'
                  ? ERASER_COLOR
                  : toolState.selectedColor
              }
              strokeWidth={toolState.brushSize}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </G>
      </Svg>

      {/* Current color indicator */}
      <View style={styles.colorIndicator}>
        <View
          style={[
            styles.colorDot,
            { backgroundColor: toolState.selectedColor },
            toolState.selectedColor === '#FFFFFF' && styles.colorDotBorder,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    alignSelf: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  svg: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  colorIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  colorDotBorder: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
});

export default ColoringCanvas;
