import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { ToolState } from '../types';

interface ToolBarProps {
  toolState: ToolState;
  canUndo: boolean;
  canRedo: boolean;
  onToolChange: (tool: ToolState['tool']) => void;
  onBrushSizeChange: (size: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onClear: () => void;
}

const BRUSH_SIZES = [4, 8, 14, 20];

const ToolBar: React.FC<ToolBarProps> = ({
  toolState,
  canUndo,
  canRedo,
  onToolChange,
  onBrushSizeChange,
  onUndo,
  onRedo,
  onSave,
  onClear,
}) => {
  return (
    <View style={styles.container}>
      {/* ツール選択 */}
      <View style={styles.group}>
        <ToolButton
          icon="🖌️"
          label="ブラシ"
          active={toolState.tool === 'brush'}
          onPress={() => onToolChange('brush')}
        />
        <ToolButton
          icon="🧹"
          label="消しゴム"
          active={toolState.tool === 'eraser'}
          onPress={() => onToolChange('eraser')}
        />
      </View>

      <View style={styles.divider} />

      {/* ブラシサイズ */}
      <View style={styles.brushSizes}>
        {BRUSH_SIZES.map(size => (
          <TouchableOpacity
            key={size}
            style={[
              styles.brushSizeButton,
              toolState.brushSize === size && styles.brushSizeActive,
            ]}
            onPress={() => onBrushSizeChange(size)}>
            <View
              style={[
                styles.brushDot,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  backgroundColor:
                    toolState.brushSize === size ? '#FFFFFF' : '#888888',
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      {/* 履歴・アクション */}
      <View style={styles.group}>
        <ToolButton
          icon="↩️"
          label="もどる"
          disabled={!canUndo}
          onPress={onUndo}
        />
        <ToolButton
          icon="↪️"
          label="やり直し"
          disabled={!canRedo}
          onPress={onRedo}
        />
        <ToolButton icon="🗑️" label="クリア" onPress={onClear} danger />
        <ToolButton icon="💾" label="保存" onPress={onSave} highlight />
      </View>
    </View>
  );
};

interface ToolButtonProps {
  icon: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
  highlight?: boolean;
  onPress: () => void;
}

const ToolButton: React.FC<ToolButtonProps> = ({
  icon,
  label,
  active,
  disabled,
  danger,
  highlight,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      styles.toolButton,
      active && styles.toolButtonActive,
      disabled && styles.toolButtonDisabled,
      danger && styles.toolButtonDanger,
      highlight && styles.toolButtonHighlight,
    ]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}>
    <Text style={[styles.toolIcon, disabled && styles.disabledText]}>
      {icon}
    </Text>
    <Text
      style={[
        styles.toolLabel,
        active && styles.toolLabelActive,
        disabled && styles.disabledText,
      ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexWrap: 'wrap',
    gap: 4,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#444444',
    marginHorizontal: 4,
  },
  toolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 52,
    backgroundColor: 'transparent',
  },
  toolButtonActive: {
    backgroundColor: '#4A90E2',
  },
  toolButtonDisabled: {
    opacity: 0.35,
  },
  toolButtonDanger: {
    backgroundColor: 'rgba(255,59,48,0.2)',
  },
  toolButtonHighlight: {
    backgroundColor: 'rgba(52,199,89,0.3)',
  },
  toolIcon: {
    fontSize: 20,
  },
  toolLabel: {
    fontSize: 9,
    color: '#AAAAAA',
    marginTop: 2,
  },
  toolLabelActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.4,
  },
  brushSizes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brushSizeButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  brushSizeActive: {
    backgroundColor: '#4A90E2',
  },
  brushDot: {},
});

export default ToolBar;
