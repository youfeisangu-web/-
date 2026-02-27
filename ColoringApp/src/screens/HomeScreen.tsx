import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Category } from '../types';
import { COLORING_PAGES, getCategoryLabel } from '../data/coloringPages';
import PageCard from '../components/PageCard';

type HomeScreenNav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const CATEGORIES: { key: Category | 'all'; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'animals', label: 'どうぶつ' },
  { key: 'nature', label: 'しぜん' },
  { key: 'mandala', label: 'マンダラ' },
  { key: 'food', label: 'たべもの' },
  { key: 'vehicles', label: 'のりもの' },
  { key: 'fantasy', label: 'ファンタジー' },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNav>();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredPages =
    selectedCategory === 'all'
      ? COLORING_PAGES
      : COLORING_PAGES.filter(p => p.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🎨 ぬりえワールド</Text>
          <Text style={styles.headerSubtitle}>好きな絵を選んで色を塗ろう！</Text>
        </View>
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={() => navigation.navigate('Gallery')}>
          <Text style={styles.galleryButtonIcon}>🖼️</Text>
          <Text style={styles.galleryButtonText}>ギャラリー</Text>
        </TouchableOpacity>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.categoryChip,
              selectedCategory === cat.key && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(cat.key)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === cat.key && styles.categoryChipTextActive,
              ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pages Grid */}
      <FlatList
        data={filteredPages}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PageCard
            page={item}
            onPress={() => navigation.navigate('Coloring', { pageId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>このカテゴリには絵がありません</Text>
            <Text style={styles.emptySubText}>他のカテゴリを選んでね！</Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.countText}>
              {filteredPages.length}枚の塗り絵
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  galleryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 2,
  },
  galleryButtonIcon: {
    fontSize: 22,
  },
  galleryButtonText: {
    fontSize: 10,
    color: '#3C3C43',
    fontWeight: '600',
  },
  categoryScroll: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
    maxHeight: 52,
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  categoryChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3C3C43',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  countText: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3C3C43',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;
