import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { ColoringPage } from '../types';
import { getCategoryLabel } from '../data/coloringPages';

interface PageCardProps {
  page: ColoringPage;
  onPress: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;
const CARD_HEIGHT = CARD_WIDTH + 44;
const THUMB_SIZE = CARD_WIDTH - 24;

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'かんたん',
  medium: 'ふつう',
  hard: 'むずかしい',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#34C759',
  medium: '#FF9500',
  hard: '#FF3B30',
};

const PageCard: React.FC<PageCardProps> = ({ page, onPress }) => {
  // Show first 8 paths as thumbnail preview
  const previewPaths = page.svgPaths.slice(0, 12);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}>
      {/* Thumbnail SVG Preview */}
      <View style={styles.thumbnailContainer}>
        <Svg
          width={THUMB_SIZE}
          height={THUMB_SIZE}
          viewBox="0 0 300 300"
          style={styles.thumbnail}>
          <Path
            d="M 0 0 L 300 0 L 300 300 L 0 300 Z"
            fill="#FAFAFA"
          />
          <G>
            {previewPaths.map(pathItem => (
              <Path
                key={pathItem.id}
                d={pathItem.d}
                fill={pathItem.defaultFill}
                stroke={pathItem.stroke}
                strokeWidth={pathItem.strokeWidth}
                fillRule={pathItem.fillRule || 'nonzero'}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </G>
        </Svg>

        {page.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
        {page.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>⭐ PRO</Text>
          </View>
        )}
      </View>

      {/* Card Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {page.title}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.category}>{getCategoryLabel(page.category)}</Text>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: DIFFICULTY_COLORS[page.difficulty] + '22' },
            ]}>
            <Text
              style={[
                styles.difficultyText,
                { color: DIFFICULTY_COLORS[page.difficulty] },
              ]}>
              {DIFFICULTY_LABELS[page.difficulty]}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
  },
  thumbnail: {
    borderRadius: 8,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFD70022',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  premiumBadgeText: {
    color: '#B8860B',
    fontSize: 9,
    fontWeight: '700',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 11,
    color: '#8E8E93',
  },
  difficultyBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default PageCard;
