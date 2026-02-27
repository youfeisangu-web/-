import { ColoringPage } from '../types';

export const COLORING_PAGES: ColoringPage[] = [
  {
    id: 'cat',
    title: 'かわいいネコ',
    category: 'animals',
    thumbnail: 'cat',
    difficulty: 'easy',
    isNew: true,
    svgPaths: [
      // Body
      {
        id: 'cat_body',
        d: 'M 150 300 C 100 280 80 240 90 200 C 100 160 130 140 150 130 C 170 140 200 160 210 200 C 220 240 200 280 150 300 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 3,
      },
      // Head
      {
        id: 'cat_head',
        d: 'M 150 180 C 120 175 100 155 100 130 C 100 105 120 85 150 85 C 180 85 200 105 200 130 C 200 155 180 175 150 180 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 3,
      },
      // Left ear
      {
        id: 'cat_ear_left',
        d: 'M 110 100 L 100 70 L 125 85 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 3,
      },
      // Right ear
      {
        id: 'cat_ear_right',
        d: 'M 190 100 L 200 70 L 175 85 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 3,
      },
      // Left inner ear
      {
        id: 'cat_inner_ear_left',
        d: 'M 112 98 L 104 76 L 122 88 Z',
        defaultFill: '#FFB6C1',
        stroke: '#FFB6C1',
        strokeWidth: 1,
      },
      // Right inner ear
      {
        id: 'cat_inner_ear_right',
        d: 'M 188 98 L 196 76 L 178 88 Z',
        defaultFill: '#FFB6C1',
        stroke: '#FFB6C1',
        strokeWidth: 1,
      },
      // Left eye white
      {
        id: 'cat_eye_left_white',
        d: 'M 128 120 C 125 113 130 108 135 110 C 140 112 143 118 140 123 C 137 128 131 127 128 120 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2,
      },
      // Right eye white
      {
        id: 'cat_eye_right_white',
        d: 'M 172 120 C 169 113 174 108 179 110 C 184 112 187 118 184 123 C 181 128 175 127 172 120 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2,
      },
      // Left pupil
      {
        id: 'cat_pupil_left',
        d: 'M 134 119 C 132 115 134 111 136 112 C 138 113 139 117 137 120 C 136 122 134 121 134 119 Z',
        defaultFill: '#1A1A1A',
        stroke: '#1A1A1A',
        strokeWidth: 1,
      },
      // Right pupil
      {
        id: 'cat_pupil_right',
        d: 'M 178 119 C 176 115 178 111 180 112 C 182 113 183 117 181 120 C 180 122 178 121 178 119 Z',
        defaultFill: '#1A1A1A',
        stroke: '#1A1A1A',
        strokeWidth: 1,
      },
      // Nose
      {
        id: 'cat_nose',
        d: 'M 150 138 L 145 133 L 155 133 Z',
        defaultFill: '#FF69B4',
        stroke: '#FF1493',
        strokeWidth: 1,
      },
      // Mouth
      {
        id: 'cat_mouth',
        d: 'M 144 142 C 147 148 153 148 156 142',
        defaultFill: 'none',
        stroke: '#333333',
        strokeWidth: 2,
      },
      // Whiskers left
      {
        id: 'cat_whisker_left1',
        d: 'M 100 135 L 140 137',
        defaultFill: 'none',
        stroke: '#888888',
        strokeWidth: 1.5,
      },
      {
        id: 'cat_whisker_left2',
        d: 'M 100 142 L 140 142',
        defaultFill: 'none',
        stroke: '#888888',
        strokeWidth: 1.5,
      },
      // Whiskers right
      {
        id: 'cat_whisker_right1',
        d: 'M 200 135 L 160 137',
        defaultFill: 'none',
        stroke: '#888888',
        strokeWidth: 1.5,
      },
      {
        id: 'cat_whisker_right2',
        d: 'M 200 142 L 160 142',
        defaultFill: 'none',
        stroke: '#888888',
        strokeWidth: 1.5,
      },
      // Tail
      {
        id: 'cat_tail',
        d: 'M 200 280 C 240 260 260 230 250 200 C 240 180 220 185 215 200',
        defaultFill: 'none',
        stroke: '#333333',
        strokeWidth: 8,
        strokeLinecap: 'round',
      },
      // Front legs
      {
        id: 'cat_leg_left',
        d: 'M 120 290 C 115 320 115 350 120 360 C 125 365 135 365 135 360 C 135 350 130 320 130 290 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2.5,
      },
      {
        id: 'cat_leg_right',
        d: 'M 165 290 C 160 320 160 350 165 360 C 170 365 180 365 180 360 C 180 350 175 320 175 290 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2.5,
      },
      // Paw toes left
      {
        id: 'cat_paw_left',
        d: 'M 115 360 C 112 370 118 375 122 370 C 126 375 131 370 130 360',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2,
      },
      // Paw toes right
      {
        id: 'cat_paw_right',
        d: 'M 160 360 C 157 370 163 375 167 370 C 171 375 176 370 175 360',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2,
      },
    ],
  },
  {
    id: 'flower',
    title: 'きれいなお花',
    category: 'nature',
    thumbnail: 'flower',
    difficulty: 'easy',
    svgPaths: [
      // Stem
      {
        id: 'flower_stem',
        d: 'M 150 280 L 150 380',
        defaultFill: 'none',
        stroke: '#228B22',
        strokeWidth: 6,
        strokeLinecap: 'round',
      },
      // Leaf left
      {
        id: 'flower_leaf_left',
        d: 'M 150 330 C 130 320 110 300 120 285 C 130 270 150 280 150 295',
        defaultFill: '#90EE90',
        stroke: '#228B22',
        strokeWidth: 2,
      },
      // Leaf right
      {
        id: 'flower_leaf_right',
        d: 'M 150 310 C 170 300 190 280 180 265 C 170 250 150 260 150 275',
        defaultFill: '#90EE90',
        stroke: '#228B22',
        strokeWidth: 2,
      },
      // Petals - 8 petals
      {
        id: 'flower_petal_1',
        d: 'M 150 150 C 140 120 140 90 150 70 C 160 90 160 120 150 150 Z',
        defaultFill: '#FFB6C1',
        stroke: '#FF69B4',
        strokeWidth: 2,
      },
      {
        id: 'flower_petal_2',
        d: 'M 180 180 C 205 160 230 150 245 155 C 235 175 215 185 180 180 Z',
        defaultFill: '#FFB6C1',
        stroke: '#FF69B4',
        strokeWidth: 2,
      },
      {
        id: 'flower_petal_3',
        d: 'M 200 210 C 230 210 255 220 260 235 C 240 240 220 230 200 210 Z',
        defaultFill: '#FFB6C1',
        stroke: '#FF69B4',
        strokeWidth: 2,
      },
      {
        id: 'flower_petal_4',
        d: 'M 180 245 C 205 260 220 280 215 295 C 195 290 180 270 180 245 Z',
        defaultFill: '#FFB6C1',
        stroke: '#FF69B4',
        strokeWidth: 2,
      },
      {
        id: 'flower_petal_5',
        d: 'M 150 265 C 160 295 160 325 150 340 C 140 325 140 295 150 265 Z',
        defaultFill: '#FFB6C1',
        stroke: '#FF69B4',
        strokeWidth: 2,
      },
      {
        id: 'flower_petal_6',
        d: 'M 120 245 C 95 260 80 280 85 295 C 105 290 120 270 120 245 Z',
        defaultFill: '#FFB6C1',
        stroke: '#FF69B4',
        strokeWidth: 2,
      },
      {
        id: 'flower_petal_7',
        d: 'M 100 210 C 70 210 45 220 40 235 C 60 240 80 230 100 210 Z',
        defaultFill: '#FFB6C1',
        stroke: '#FF69B4',
        strokeWidth: 2,
      },
      {
        id: 'flower_petal_8',
        d: 'M 120 180 C 95 160 70 150 55 155 C 65 175 85 185 120 180 Z',
        defaultFill: '#FFB6C1',
        stroke: '#FF69B4',
        strokeWidth: 2,
      },
      // Center circle
      {
        id: 'flower_center',
        d: 'M 150 210 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0',
        defaultFill: '#FFD700',
        stroke: '#FFA500',
        strokeWidth: 3,
      },
    ],
  },
  {
    id: 'mandala_1',
    title: 'マンダラ - 蓮',
    category: 'mandala',
    thumbnail: 'mandala1',
    difficulty: 'hard',
    svgPaths: [
      // Outer ring segments - 12 segments
      { id: 'm_outer_1', d: 'M 150 150 L 150 30 A 120 120 0 0 1 211 54 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_2', d: 'M 150 150 L 211 54 A 120 120 0 0 1 248 115 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_3', d: 'M 150 150 L 248 115 A 120 120 0 0 1 270 150 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_4', d: 'M 150 150 L 270 150 A 120 120 0 0 1 248 185 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_5', d: 'M 150 150 L 248 185 A 120 120 0 0 1 211 246 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_6', d: 'M 150 150 L 211 246 A 120 120 0 0 1 150 270 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_7', d: 'M 150 150 L 150 270 A 120 120 0 0 1 89 246 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_8', d: 'M 150 150 L 89 246 A 120 120 0 0 1 52 185 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_9', d: 'M 150 150 L 52 185 A 120 120 0 0 1 30 150 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_10', d: 'M 150 150 L 30 150 A 120 120 0 0 1 52 115 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_11', d: 'M 150 150 L 52 115 A 120 120 0 0 1 89 54 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_outer_12', d: 'M 150 150 L 89 54 A 120 120 0 0 1 150 30 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      // Middle ring
      { id: 'm_mid_1', d: 'M 150 150 L 150 75 A 75 75 0 0 1 190 84 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_2', d: 'M 150 150 L 190 84 A 75 75 0 0 1 216 116 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_3', d: 'M 150 150 L 216 116 A 75 75 0 0 1 225 150 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_4', d: 'M 150 150 L 225 150 A 75 75 0 0 1 216 184 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_5', d: 'M 150 150 L 216 184 A 75 75 0 0 1 190 216 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_6', d: 'M 150 150 L 190 216 A 75 75 0 0 1 150 225 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_7', d: 'M 150 150 L 150 225 A 75 75 0 0 1 110 216 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_8', d: 'M 150 150 L 110 216 A 75 75 0 0 1 84 184 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_9', d: 'M 150 150 L 84 184 A 75 75 0 0 1 75 150 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_10', d: 'M 150 150 L 75 150 A 75 75 0 0 1 84 116 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_11', d: 'M 150 150 L 84 116 A 75 75 0 0 1 110 84 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      { id: 'm_mid_12', d: 'M 150 150 L 110 84 A 75 75 0 0 1 150 75 Z', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      // Inner circle
      { id: 'm_inner', d: 'M 150 150 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0', defaultFill: '#FFFFFF', stroke: '#333', strokeWidth: 2 },
      // Center dot
      { id: 'm_center', d: 'M 150 150 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0', defaultFill: '#FFD700', stroke: '#FFA500', strokeWidth: 2 },
    ],
  },
  {
    id: 'butterfly',
    title: 'チョウチョ',
    category: 'animals',
    thumbnail: 'butterfly',
    difficulty: 'medium',
    svgPaths: [
      // Upper left wing
      {
        id: 'wing_upper_left',
        d: 'M 150 180 C 120 150 60 130 40 100 C 30 80 40 50 70 45 C 100 40 130 70 150 110 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2.5,
      },
      // Upper right wing
      {
        id: 'wing_upper_right',
        d: 'M 150 180 C 180 150 240 130 260 100 C 270 80 260 50 230 45 C 200 40 170 70 150 110 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2.5,
      },
      // Lower left wing
      {
        id: 'wing_lower_left',
        d: 'M 150 200 C 120 220 80 240 60 270 C 50 290 60 320 85 315 C 110 310 130 280 150 250 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2.5,
      },
      // Lower right wing
      {
        id: 'wing_lower_right',
        d: 'M 150 200 C 180 220 220 240 240 270 C 250 290 240 320 215 315 C 190 310 170 280 150 250 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2.5,
      },
      // Wing pattern dots - upper left
      { id: 'dot_ul1', d: 'M 90 100 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0', defaultFill: '#FFD700', stroke: '#FFA500', strokeWidth: 1.5 },
      { id: 'dot_ul2', d: 'M 110 140 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', defaultFill: '#FF69B4', stroke: '#FF1493', strokeWidth: 1.5 },
      // Wing pattern dots - upper right
      { id: 'dot_ur1', d: 'M 210 100 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0', defaultFill: '#FFD700', stroke: '#FFA500', strokeWidth: 1.5 },
      { id: 'dot_ur2', d: 'M 190 140 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', defaultFill: '#FF69B4', stroke: '#FF1493', strokeWidth: 1.5 },
      // Wing pattern dots - lower
      { id: 'dot_ll1', d: 'M 95 270 m -12 0 a 12 12 0 1 0 24 0 a 12 12 0 1 0 -24 0', defaultFill: '#FF6347', stroke: '#FF4500', strokeWidth: 1.5 },
      { id: 'dot_lr1', d: 'M 205 270 m -12 0 a 12 12 0 1 0 24 0 a 12 12 0 1 0 -24 0', defaultFill: '#FF6347', stroke: '#FF4500', strokeWidth: 1.5 },
      // Body
      {
        id: 'butterfly_body',
        d: 'M 150 140 C 145 155 143 175 145 200 C 147 220 150 240 150 255 C 150 240 153 220 155 200 C 157 175 155 155 150 140 Z',
        defaultFill: '#8B4513',
        stroke: '#333333',
        strokeWidth: 2,
      },
      // Antennae
      { id: 'antenna_left', d: 'M 148 140 C 140 120 120 100 110 90', defaultFill: 'none', stroke: '#333333', strokeWidth: 2 },
      { id: 'antenna_right', d: 'M 152 140 C 160 120 180 100 190 90', defaultFill: 'none', stroke: '#333333', strokeWidth: 2 },
      { id: 'antenna_tip_left', d: 'M 110 90 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0', defaultFill: '#333333', stroke: '#333333', strokeWidth: 1 },
      { id: 'antenna_tip_right', d: 'M 190 90 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0', defaultFill: '#333333', stroke: '#333333', strokeWidth: 1 },
    ],
  },
  {
    id: 'house',
    title: 'おうち',
    category: 'vehicles',
    thumbnail: 'house',
    difficulty: 'easy',
    svgPaths: [
      // Main house wall
      {
        id: 'house_wall',
        d: 'M 60 200 L 60 340 L 240 340 L 240 200 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 3,
      },
      // Roof
      {
        id: 'house_roof',
        d: 'M 40 200 L 150 90 L 260 200 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 3,
      },
      // Chimney
      {
        id: 'house_chimney',
        d: 'M 195 130 L 195 165 L 215 165 L 215 115 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2.5,
      },
      // Door
      {
        id: 'house_door',
        d: 'M 120 280 L 120 340 L 180 340 L 180 280 C 180 260 120 260 120 280 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2.5,
      },
      // Door knob
      {
        id: 'house_doorknob',
        d: 'M 170 310 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0',
        defaultFill: '#FFD700',
        stroke: '#FFA500',
        strokeWidth: 1,
      },
      // Left window
      {
        id: 'house_window_left',
        d: 'M 75 220 L 75 270 L 120 270 L 120 220 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2.5,
      },
      // Left window cross
      { id: 'house_win_left_h', d: 'M 75 245 L 120 245', defaultFill: 'none', stroke: '#333333', strokeWidth: 1.5 },
      { id: 'house_win_left_v', d: 'M 97 220 L 97 270', defaultFill: 'none', stroke: '#333333', strokeWidth: 1.5 },
      // Right window
      {
        id: 'house_window_right',
        d: 'M 180 220 L 180 270 L 225 270 L 225 220 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2.5,
      },
      // Right window cross
      { id: 'house_win_right_h', d: 'M 180 245 L 225 245', defaultFill: 'none', stroke: '#333333', strokeWidth: 1.5 },
      { id: 'house_win_right_v', d: 'M 202 220 L 202 270', defaultFill: 'none', stroke: '#333333', strokeWidth: 1.5 },
      // Path/walkway
      {
        id: 'house_path',
        d: 'M 140 340 L 130 380 L 170 380 L 160 340 Z',
        defaultFill: '#FFFFFF',
        stroke: '#333333',
        strokeWidth: 2,
      },
      // Grass
      {
        id: 'house_grass',
        d: 'M 40 380 L 260 380 L 260 395 L 40 395 Z',
        defaultFill: '#90EE90',
        stroke: '#228B22',
        strokeWidth: 2,
      },
      // Tree trunk
      { id: 'tree_trunk', d: 'M 28 340 L 28 380 L 36 380 L 36 340 Z', defaultFill: '#8B4513', stroke: '#5C3317', strokeWidth: 1.5 },
      // Tree top
      { id: 'tree_top', d: 'M 32 270 m -30 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0', defaultFill: '#228B22', stroke: '#145214', strokeWidth: 2 },
      // Cloud
      { id: 'cloud_1', d: 'M 185 65 C 185 50 200 45 210 55 C 215 45 235 42 240 55 C 250 50 260 60 255 70 C 260 80 250 88 240 85 C 235 92 220 92 215 85 C 205 90 190 85 188 75 C 180 72 180 60 185 65 Z', defaultFill: '#FFFFFF', stroke: '#CCCCCC', strokeWidth: 1.5 },
    ],
  },
  {
    id: 'star_night',
    title: '星空',
    category: 'nature',
    thumbnail: 'stars',
    difficulty: 'medium',
    isNew: true,
    svgPaths: [
      // Sky background
      { id: 'sky_bg', d: 'M 0 0 L 300 0 L 300 300 L 0 300 Z', defaultFill: '#1a1a2e', stroke: 'none', strokeWidth: 0 },
      // Stars (various sizes)
      { id: 'star_1', d: 'M 50 50 L 53 60 L 63 60 L 55 66 L 58 76 L 50 70 L 42 76 L 45 66 L 37 60 L 47 60 Z', defaultFill: '#FFFFFF', stroke: '#FFD700', strokeWidth: 1 },
      { id: 'star_2', d: 'M 200 40 L 202 47 L 209 47 L 203 51 L 205 58 L 200 54 L 195 58 L 197 51 L 191 47 L 198 47 Z', defaultFill: '#FFFFFF', stroke: '#FFD700', strokeWidth: 1 },
      { id: 'star_3', d: 'M 260 80 L 263 90 L 273 90 L 265 96 L 268 106 L 260 100 L 252 106 L 255 96 L 247 90 L 257 90 Z', defaultFill: '#FFFFFF', stroke: '#FFD700', strokeWidth: 1 },
      { id: 'star_4', d: 'M 100 30 L 102 37 L 109 37 L 103 41 L 105 48 L 100 44 L 95 48 L 97 41 L 91 37 L 98 37 Z', defaultFill: '#FFFFFF', stroke: '#FFD700', strokeWidth: 1 },
      { id: 'star_5', d: 'M 150 20 L 154 32 L 167 32 L 157 40 L 161 52 L 150 44 L 139 52 L 143 40 L 133 32 L 146 32 Z', defaultFill: '#FFD700', stroke: '#FFA500', strokeWidth: 1.5 },
      // Moon
      {
        id: 'moon',
        d: 'M 240 150 C 240 110 265 80 295 72 C 270 78 250 100 250 130 C 250 165 272 195 300 200 C 268 195 240 180 240 150 Z',
        defaultFill: '#FFD700',
        stroke: '#FFA500',
        strokeWidth: 2,
      },
      // Hills
      {
        id: 'hill_back',
        d: 'M 0 220 C 50 180 100 170 150 185 C 200 170 250 180 300 220 L 300 300 L 0 300 Z',
        defaultFill: '#2d4a22',
        stroke: '#1a3013',
        strokeWidth: 1,
      },
      // House silhouette
      {
        id: 'house_silhouette',
        d: 'M 60 220 L 60 260 L 120 260 L 120 220 L 90 195 Z',
        defaultFill: '#0d0d1a',
        stroke: '#1a1a2e',
        strokeWidth: 1,
      },
      // House window light
      { id: 'window_light', d: 'M 78 228 L 78 245 L 95 245 L 95 228 Z', defaultFill: '#FFD700', stroke: '#FFA500', strokeWidth: 1 },
      // Tree silhouettes
      { id: 'tree_sil1', d: 'M 20 260 L 20 220 L 30 220 L 30 260 Z', defaultFill: '#0d1a0d', stroke: 'none', strokeWidth: 0 },
      { id: 'tree_top1', d: 'M 25 200 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0', defaultFill: '#0d1a0d', stroke: 'none', strokeWidth: 0 },
      { id: 'tree_sil2', d: 'M 250 255 L 250 215 L 260 215 L 260 255 Z', defaultFill: '#0d1a0d', stroke: 'none', strokeWidth: 0 },
      { id: 'tree_top2', d: 'M 255 195 m -22 0 a 22 22 0 1 0 44 0 a 22 22 0 1 0 -44 0', defaultFill: '#0d1a0d', stroke: 'none', strokeWidth: 0 },
    ],
  },
];

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    animals: 'どうぶつ',
    nature: 'しぜん',
    mandala: 'マンダラ',
    food: 'たべもの',
    vehicles: 'のりもの・たてもの',
    fantasy: 'ファンタジー',
  };
  return labels[category] || category;
};
