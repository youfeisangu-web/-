import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  Dimensions,
} from 'react-native';
import { PALETTE_COLORS, SKIN_TONE_COLORS } from '../data/colors';

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COLOR_SIZE = (SCREEN_WIDTH - 80) / 10;

const ColorPalette: React.FC<ColorPaletteProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  const [showFullPalette, setShowFullPalette] = useState(false);
  const quickColors = PALETTE_COLORS.slice(0, 10);

  return (
    <View style={styles.container}>
      {/* Quick color row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickRow}>
        {quickColors.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorSwatch,
              { backgroundColor: color },
              selectedColor === color && styles.selectedSwatch,
            ]}
            onPress={() => onColorSelect(color)}
            activeOpacity={0.7}
          />
        ))}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setShowFullPalette(true)}>
          <Text style={styles.moreButtonText}>＋</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Full palette modal */}
      <Modal
        visible={showFullPalette}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFullPalette(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>カラーパレット</Text>
              <TouchableOpacity
                onPress={() => setShowFullPalette(false)}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>標準カラー</Text>
            <View style={styles.fullPaletteGrid}>
              {PALETTE_COLORS.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.fullColorSwatch,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedSwatch,
                    color === '#FFFFFF' && styles.whiteSwatch,
                  ]}
                  onPress={() => {
                    onColorSelect(color);
                    setShowFullPalette(false);
                  }}
                  activeOpacity={0.7}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>肌の色</Text>
            <View style={styles.skinToneRow}>
              {SKIN_TONE_COLORS.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.fullColorSwatch,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedSwatch,
                  ]}
                  onPress={() => {
                    onColorSelect(color);
                    setShowFullPalette(false);
                  }}
                  activeOpacity={0.7}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  quickRow: {
    paddingHorizontal: 12,
  },
  colorSwatch: {
    width: COLOR_SIZE,
    height: COLOR_SIZE,
    borderRadius: COLOR_SIZE / 2,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  selectedSwatch: {
    borderWidth: 3,
    borderColor: '#333333',
    transform: [{ scale: 1.15 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  moreButton: {
    width: COLOR_SIZE,
    height: COLOR_SIZE,
    borderRadius: COLOR_SIZE / 2,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  moreButtonText: {
    fontSize: 18,
    color: '#555555',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    color: '#555555',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 12,
    marginTop: 8,
  },
  fullPaletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  fullColorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  whiteSwatch: {
    borderWidth: 1.5,
    borderColor: '#AAAAAA',
  },
  skinToneRow: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default ColorPalette;
