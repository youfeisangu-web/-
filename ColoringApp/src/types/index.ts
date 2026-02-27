export interface ColoringPage {
  id: string;
  title: string;
  category: Category;
  /** require() で読み込む画像ソース */
  image: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isNew?: boolean;
  isPremium?: boolean;
}

export interface BrushStroke {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  size: number;
}

export interface CompletedWork {
  id: string;
  pageId: string;
  pageTitle: string;
  imageUri: string;
  createdAt: Date;
}

export type Category =
  | 'animals'
  | 'nature'
  | 'mandala'
  | 'food'
  | 'vehicles'
  | 'fantasy'
  | 'other';

export interface ToolState {
  selectedColor: string;
  tool: 'brush' | 'eraser';
  brushSize: number;
}

export type RootStackParamList = {
  Home: undefined;
  Coloring: { pageId: string };
  Gallery: undefined;
};
