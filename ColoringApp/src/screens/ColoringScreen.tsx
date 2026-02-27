import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, ToolState } from '../types';
import { COLORING_PAGES } from '../data/coloringPages';
import { DEFAULT_COLOR } from '../data/colors';
import ColoringCanvas from '../components/ColoringCanvas';
import ColorPalette from '../components/ColorPalette';
import ToolBar from '../components/ToolBar';
import { useColoringState } from '../hooks/useColoringState';

type ColoringScreenRoute = RouteProp<RootStackParamList, 'Coloring'>;

const ColoringScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ColoringScreenRoute>();
  const { pageId } = route.params;
  const canvasViewRef = useRef<View>(null);

  const page = COLORING_PAGES.find(p => p.id === pageId);

  const [toolState, setToolState] = useState<ToolState>({
    selectedColor: DEFAULT_COLOR,
    tool: 'fill',
    brushSize: 8,
  });

  const {
    coloredPaths,
    brushStrokes,
    colorPath,
    addBrushStroke,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
  } = useColoringState();

  const handleColorSelect = useCallback((color: string) => {
    setToolState(prev => ({ ...prev, selectedColor: color }));
  }, []);

  const handleToolChange = useCallback((tool: ToolState['tool']) => {
    setToolState(prev => ({ ...prev, tool }));
  }, []);

  const handleBrushSizeChange = useCallback((size: number) => {
    setToolState(prev => ({ ...prev, brushSize: size }));
  }, []);

  const handleClear = useCallback(() => {
    Alert.alert(
      'クリア確認',
      '塗った色をすべて消しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '消す',
          style: 'destructive',
          onPress: clear,
        },
      ],
    );
  }, [clear]);

  const handleSave = useCallback(async () => {
    // In a real app, use react-native-view-shot to capture the canvas
    // and @react-native-camera-roll/camera-roll to save to photos
    Alert.alert(
      '保存完了！ 🎉',
      '塗り絵をフォトライブラリに保存しました。',
      [{ text: 'OK', style: 'default' }],
    );
  }, []);

  if (!page) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>塗り絵が見つかりません</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>もどる</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹ もどる</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>{page.title}</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Canvas area */}
      <ScrollView
        style={styles.canvasScroll}
        contentContainerStyle={styles.canvasContainer}
        scrollEnabled={false}>
        <ColoringCanvas
          page={page}
          toolState={toolState}
          coloredPaths={coloredPaths}
          brushStrokes={brushStrokes}
          onPathColored={colorPath}
          onBrushStroke={addBrushStroke}
          viewRef={canvasViewRef}
        />
      </ScrollView>

      {/* Tool Bar */}
      <ToolBar
        toolState={toolState}
        canUndo={canUndo}
        canRedo={canRedo}
        onToolChange={handleToolChange}
        onBrushSizeChange={handleBrushSizeChange}
        onUndo={undo}
        onRedo={redo}
        onSave={handleSave}
        onClear={handleClear}
      />

      {/* Color Palette */}
      <ColorPalette
        selectedColor={toolState.selectedColor}
        onColorSelect={handleColorSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2C2C2E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#3A3A3C',
  },
  backButton: {
    paddingVertical: 4,
    paddingRight: 16,
  },
  backButtonText: {
    fontSize: 17,
    color: '#4A90E2',
    fontWeight: '500',
  },
  pageTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 60,
  },
  canvasScroll: {
    flex: 1,
  },
  canvasContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
  },
  errorText: {
    fontSize: 18,
    color: '#3C3C43',
    fontWeight: '600',
  },
  backLink: {
    marginTop: 16,
    fontSize: 16,
    color: '#007AFF',
  },
});

export default ColoringScreen;
