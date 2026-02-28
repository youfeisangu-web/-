# Threads自動運用AI

Claude API (Anthropic) を使ってThreadsへの投稿を自動生成・スケジュール投稿するツールです。

## セットアップ

### 1. 依存パッケージをインストール

```bash
npm install
```

### 2. 環境変数を設定

```bash
cp .env.example .env
```

`.env` を開いて以下を設定します。

#### Claude APIキーの取得
1. https://console.anthropic.com にアクセス
2. 「API Keys」→「Create Key」
3. `ANTHROPIC_API_KEY` に設定

#### Threads APIキーの取得
1. https://developers.facebook.com にアクセス
2. アプリを作成（Instagramアカウントが必要）
3. Threads APIの権限を追加
4. `THREADS_USER_ID` と `THREADS_ACCESS_TOKEN` を設定

### 3. 動作確認（ドライラン）

実際には投稿せずに生成文だけ確認できます。

```bash
npm run dry-run
```

---

## 使い方

### 自動スケジュール投稿（メイン）

```bash
npm start
```

`.env` の `POSTS_PER_DAY` に設定した回数、1日に自動投稿します。
サーバーやVPSで常時起動させておくのがおすすめです。

### 今すぐ1回投稿

```bash
npm run post:now
```

---

## 設定（.env）

| 変数名 | 説明 | 例 |
|--------|------|----|
| `ANTHROPIC_API_KEY` | Claude APIキー | `sk-ant-...` |
| `THREADS_USER_ID` | ThreadsのユーザーID | `1234567890` |
| `THREADS_ACCESS_TOKEN` | Threadsのアクセストークン | `EAAxx...` |
| `POSTS_PER_DAY` | 1日の投稿回数 | `3` |
| `POST_TONE` | 投稿のトーン | `casual` / `professional` / `humorous` |
| `POST_TOPICS` | 投稿テーマ（カンマ区切り） | `ライフハック,テクノロジー` |

---

## デプロイ（常時稼働）

### VPS / サーバー（PM2使用）

```bash
npm install -g pm2
npm run build
pm2 start dist/index.js --name threads-ai
pm2 startup  # OS再起動後も自動起動
pm2 save
```

### Railway / Renderなどのクラウドサービスでも動作します

---

## 仕組み

```
1. node-cron でスケジュール起動
   ↓
2. Claude API に投稿文を3案生成させる
   ↓
3. Claude API に3案から最良の1案を選ばせる
   ↓
4. Threads API (Meta) で実際に投稿
```
