# 🎨 ぬりえワールド - Coloring App

App Store向けの塗り絵アプリです。React Native (TypeScript) で開発されています。

---

## 🖼️ 塗り絵画像の追加方法

### ステップ1: 画像ファイルを配置する

```
src/assets/coloringPages/
├── safari_lion.png      ← ここに置く
├── ocean_whale.png
└── butterfly.png
```

### ステップ2: `src/data/coloringPages.ts` に登録する

```ts
export const COLORING_PAGES: ColoringPage[] = [
  {
    id: 'safari_lion',           // 一意なID
    title: 'サファリのライオン',    // 表示タイトル
    category: 'animals',         // カテゴリ（下記参照）
    image: require('../assets/coloringPages/safari_lion.png'),
    difficulty: 'medium',        // 'easy' | 'medium' | 'hard'
    isNew: true,                 // NEW バッジ（任意）
  },
  {
    id: 'ocean_whale',
    title: '海のくじら',
    category: 'nature',
    image: require('../assets/coloringPages/ocean_whale.png'),
    difficulty: 'easy',
  },
];
```

### カテゴリ一覧

| category | 表示名 |
|----------|--------|
| `animals` | どうぶつ |
| `nature` | しぜん |
| `mandala` | マンダラ |
| `food` | たべもの |
| `vehicles` | のりもの |
| `fantasy` | ファンタジー |
| `other` | その他 |

### 画像ファイルのガイドライン

- **サイズ**: 1000×1000px 以上推奨（正方形が最適）
- **形式**: PNG（透過背景可）または JPEG
- **背景**: 白または透明
- **線の太さ**: 太め（3px以上）が塗り絵として見やすい
- **線の色**: 黒（#000000）が最も見やすい

---

## 機能

| 機能 | 説明 |
|------|------|
| 🖌️ ブラシ | 指でなぞって色を塗る |
| 🧹 消しゴム | 塗った部分を消す |
| 🎨 カラーパレット | 40色以上 ＋ 肌の色6色 |
| ↩️↪️ アンドゥ/リドゥ | 最大50ステップの履歴 |
| 💾 保存 | フォトライブラリに保存 |
| 🗑️ クリア | 全部消してやり直し |

---

## セットアップ

```bash
# 依存関係インストール
npm install

# iOS用 Pods インストール (Mac必須)
cd ios && pod install && cd ..

# 起動
npm run ios
```

---

## アーキテクチャ

```
src/
├── assets/coloringPages/   ← 塗り絵 PNG/JPG をここに追加
├── components/
│   ├── ColorPalette.tsx    # カラーパレット
│   ├── ColoringCanvas.tsx  # キャンバス（画像 + SVG描画レイヤー）
│   ├── PageCard.tsx        # ホーム画面のカード
│   └── ToolBar.tsx         # ツールバー
├── data/
│   ├── colors.ts           # カラーデータ
│   └── coloringPages.ts    ← 塗り絵を追加する場所
├── hooks/
│   └── useColoringState.ts # ブラシ履歴管理
├── screens/
│   ├── HomeScreen.tsx
│   ├── ColoringScreen.tsx
│   └── GalleryScreen.tsx
└── types/index.ts
```

---

## App Store 申請チェックリスト

- [ ] 画像を追加して動作確認
- [ ] アプリアイコン (1024×1024px)
- [ ] スクリーンショット (iPhone/iPad 各サイズ)
- [ ] Bundle ID を Apple Developer で設定
- [ ] 証明書・プロビジョニングプロファイルを設定
- [ ] Info.plist の写真ライブラリ権限説明文を確認
- [ ] App Store Connect でアプリ情報を入力
- [ ] プライバシーポリシーURL を用意
