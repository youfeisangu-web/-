# 🎨 ぬりえワールド - Coloring App

App Store向けの塗り絵アプリです。React Native (TypeScript) で開発されています。

## 機能

- **塗りつぶしツール** 🪣 - タップしたエリアを選んだ色で塗る
- **ブラシツール** 🖌️ - 自由に書き込み（4段階のサイズ調整）
- **消しゴムツール** 🧹 - ブラシで書いた部分を消せる
- **カラーパレット** - 40色以上から選択可能（肌の色も対応）
- **アンドゥ/リドゥ** ↩️↪️ - 最大50ステップまで履歴管理
- **保存機能** 💾 - 完成した作品をフォトライブラリに保存
- **クリア** 🗑️ - やり直しができる

## 収録塗り絵（6枚）

| タイトル | カテゴリ | 難易度 |
|---------|---------|-------|
| かわいいネコ | どうぶつ | かんたん |
| きれいなお花 | しぜん | かんたん |
| マンダラ - 蓮 | マンダラ | むずかしい |
| チョウチョ | どうぶつ | ふつう |
| おうち | のりもの・たてもの | かんたん |
| 星空 | しぜん | ふつう |

## セットアップ

### 必要な環境

- Node.js 18+
- Xcode 15+ (iOS開発)
- CocoaPods
- React Native CLI

### インストール

```bash
# 依存関係をインストール
npm install

# iOS向けのPodをインストール
cd ios && pod install && cd ..
```

### 実行

```bash
# Metro バンドラーを起動
npm start

# iOS シミュレータで起動
npm run ios

# Android エミュレータで起動
npm run android
```

## 技術スタック

- **React Native** 0.73
- **TypeScript** 5.0
- **react-native-svg** - SVGベースの塗り絵レンダリング
- **react-navigation** - 画面遷移
- **react-native-gesture-handler** - タッチ操作
- **react-native-view-shot** - 画面キャプチャ・保存
- **@react-native-camera-roll/camera-roll** - フォトライブラリアクセス

## アーキテクチャ

```
src/
├── components/
│   ├── ColorPalette.tsx    # カラーパレット（クイック＋フルパレット）
│   ├── ColoringCanvas.tsx  # メインキャンバス（SVG描画）
│   ├── PageCard.tsx        # ホーム画面のカード
│   └── ToolBar.tsx         # ツールバー（塗り・ブラシ・消しゴム等）
├── data/
│   ├── colors.ts           # カラーパレットデータ
│   └── coloringPages.ts    # 塗り絵ページデータ（SVGパス）
├── hooks/
│   └── useColoringState.ts # 塗り絵状態管理（アンドゥ履歴）
├── screens/
│   ├── HomeScreen.tsx      # ホーム（塗り絵一覧）
│   ├── ColoringScreen.tsx  # 塗り絵画面
│   └── GalleryScreen.tsx   # 保存した作品一覧
└── types/
    └── index.ts            # TypeScript型定義
```

## App Store 申請に向けて

申請前に以下を準備してください：

1. **App ID** - Apple Developer アカウントで作成
2. **証明書・プロビジョニングプロファイル** - Xcode で設定
3. **アイコン** - 1024×1024px の `AppIcon.png`
4. **スクリーンショット** - iPhone/iPad 各サイズ
5. **プライバシーポリシー** - 写真ライブラリアクセスのため必要
6. **年齢制限** - 4+ (全年齢対象)

## 今後の拡張アイデア

- [ ] 塗り絵の追加（食べ物・乗り物・ファンタジー）
- [ ] カスタム写真からの塗り絵変換
- [ ] オンラインギャラリー（SNSシェア）
- [ ] アニメーションで塗る演出
- [ ] スタンプ機能
- [ ] BGM・効果音
- [ ] 子ども向けモード（大きなパレット）
