import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ColoringPage, BrushStroke, ToolState } from '../types';
import { ERASER_COLOR } from '../data/colors';

interface ColoringCanvasProps {
  page: ColoringPage;
  toolState: ToolState;
  brushStrokes: BrushStroke[];
  onBrushStroke: (stroke: BrushStroke) => void;
  viewRef: React.RefObject<View>;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const CANVAS_SIZE = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT - 240);

const buildSmoothPath = (points: { x: number; y: number }[]): string => {
  if (points.length === 0) return '';
  if (points.length === 1) {
    const { x, y } = points[0];
    return `M ${x} ${y} L ${x + 0.1} ${y + 0.1}`;
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    d += ` Q ${points[i].x} ${points[i].y} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
};

const ColoringCanvas: React.FC<ColoringCanvasProps> = ({
  page,
  toolState,
  brushStrokes,
  onBrushStroke,
  viewRef,
}) => {
  const currentPointsRef = useRef<{ x: number; y: number }[]>([]);
  const isDrawingRef = useRef(false);
  const [livePoints, setLivePoints] = useState<{ x: number; y: number }[]>([]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: (e: GestureResponderEvent) => {
        const { locationX, locationY } = e.nativeEvent;
        isDrawingRef.current = true;
        currentPointsRef.current = [{ x: locationX, y: locationY }];
        setLivePoints([{ x: locationX, y: locationY }]);
      },

      onPanResponderMove: (e: GestureResponderEvent) => {
        if (!isDrawingRef.current) return;
        const { locationX, locationY } = e.nativeEvent;
        const prev = currentPointsRef.current[currentPointsRef.current.length - 1];
        const dx = locationX - prev.x;
        const dy = locationY - prev.y;
        if (dx * dx + dy * dy < 4) return;
        currentPointsRef.current = [
          ...currentPointsRef.current,
          { x: locationX, y: locationY },
        ];
        setLivePoints([...currentPointsRef.current]);
      },

      onPanResponderRelease: () => {
        if (!isDrawingRef.current) return;
        isDrawingRef.current = false;
        if (currentPointsRef.current.length > 0) {
          onBrushStroke({
            id: `stroke_${Date.now()}_${Math.random()}`,
            points: [...currentPointsRef.current],
            color:
              toolState.tool === 'eraser'
                ? ERASER_COLOR
                : toolState.selectedColor,
            size: toolState.brushSize,
          });
        }
        currentPointsRef.current = [];
        setLivePoints([]);
      },
    }),
  ).current;

  const liveColor =
    toolState.tool === 'eraser' ? ERASER_COLOR : toolState.selectedColor;

  return (
    <View
      ref={viewRef}
      style={styles.container}
      {...panResponder.panHandlers}>
      {/* 塗り絵画像レイヤー */}
      <Image
        source={page.image}
        style={styles.coloringImage}
        resizeMode="contain"
      />

      {/* ブラシ描画レイヤー */}
      <Svg
        style={StyleSheet.absoluteFill}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}>
        {brushStrokes.map(stroke => (
          <Path
            key={stroke.id}
            d={buildSmoothPath(stroke.points)}
            stroke={stroke.color}
            strokeWidth={stroke.size}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {livePoints.length > 0 && (
          <Path
            d={buildSmoothPath(livePoints)}
            stroke={liveColor}
            strokeWidth={toolState.brushSize}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </Svg>

      {/* 現在の色インジケーター */}
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
  coloringImage: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  colorIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  colorDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  colorDotBorder: {
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
  },
});

export default ColoringCanvas;
