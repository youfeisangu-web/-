import { ColoringPage } from '../types';

/**
 * 塗り絵ページの定義
 *
 * 画像を追加する手順:
 * 1. PNG/JPG ファイルを src/assets/coloringPages/ に置く
 * 2. 下のリストに新しいエントリを追加する
 *
 * image フィールドには require('./path/to/image.png') を使う
 */
export const COLORING_PAGES: ColoringPage[] = [
  // ===== ここに画像を追加してください =====
  //
  // 例:
  // {
  //   id: 'safari_lion',
  //   title: 'サファリのライオン',
  //   category: 'animals',
  //   image: require('../assets/coloringPages/safari_lion.png'),
  //   difficulty: 'medium',
  //   isNew: true,
  // },
  // {
  //   id: 'ocean_whale',
  //   title: '海のくじら',
  //   category: 'nature',
  //   image: require('../assets/coloringPages/ocean_whale.png'),
  //   difficulty: 'easy',
  // },
  //
  // =========================================
];

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    animals: 'どうぶつ',
    nature: 'しぜん',
    mandala: 'マンダラ',
    food: 'たべもの',
    vehicles: 'のりもの',
    fantasy: 'ファンタジー',
    other: 'その他',
  };
  return labels[category] || category;
};
