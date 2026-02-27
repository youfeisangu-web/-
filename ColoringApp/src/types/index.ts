export interface ColoringPage {
  id: string;
  title: string;
  category: Category;
  thumbnail: string;
  svgPaths: SvgPathItem[];
  difficulty: 'easy' | 'medium' | 'hard';
  isNew?: boolean;
  isPremium?: boolean;
}

export interface SvgPathItem {
  id: string;
  d: string;
  defaultFill: string;
  stroke: string;
  strokeWidth: number;
  fillRule?: 'nonzero' | 'evenodd';
}

export interface ColoredPath {
  pathId: string;
  color: string;
}

export interface CompletedWork {
  id: string;
  pageId: string;
  pageTitle: string;
  coloredPaths: ColoredPath[];
  createdAt: Date;
  imageUri?: string;
}

export type Category = 'animals' | 'nature' | 'mandala' | 'food' | 'vehicles' | 'fantasy';

export interface ToolState {
  selectedColor: string;
  tool: 'fill' | 'brush' | 'eraser';
  brushSize: number;
}

export type RootStackParamList = {
  Home: undefined;
  Coloring: { pageId: string };
  Gallery: undefined;
};
