import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ColoringPage } from '../types';
import { getCategoryLabel } from '../data/coloringPages';

interface PageCardProps {
  page: ColoringPage;
  onPress: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;
const THUMB_SIZE = CARD_WIDTH - 0;

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
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}>
      {/* サムネイル */}
      <View style={styles.thumbnailContainer}>
        <Image
          source={page.image}
          style={styles.thumbnail}
          resizeMode="cover"
        />
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

      {/* カード情報 */}
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
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: '#FAFAFA',
  },
  thumbnail: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
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
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 5,
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
