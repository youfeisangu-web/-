import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
const model = genAI.getGenerativeModel({
  model: config.gemini.model,
  generationConfig: { temperature: 1.0, maxOutputTokens: 512 },
});

const TONE_DESCRIPTIONS = {
  casual: 'フレンドリーでカジュアル。友達に話しかけるような口調。絵文字も自然に使う。',
  professional: '知識豊富で信頼感がある。ビジネスパーソン向け。でも堅すぎない。',
  humorous: 'ユーモアがあって笑える。でも不快にならない範囲で。たまに自虐も入れる。',
};

const SYSTEM_PROMPT_THREADS = `あなたは「Billia」という請求書・決済管理サービスの公式Threadsアカウントの中の人です。
フリーランス・個人事業主・スタートアップ・中小企業をターゲットにしています。

【Billiaについて（サービス概要）】
Billiaは、フリーランスや小規模事業者のお金まわりをまるっと解決するサービスです。

主な機能:
- ダッシュボード: 今月の請求額・未入金額・経費・前月比を一覧。未入金アラートあり
- 請求書管理: 作成・送付・ステータス管理（下書き/送付済/未払い/部分払い/支払済）。インボイス制度対応。AIによるOCRインポートやメモから自動生成も可能
- 見積書管理: 作成・編集。受注した見積書を一括で請求書に変換できる
- 取引先管理: 月額・定期請求にも対応。フォルダでグループ分け管理
- 経費管理: 領収書画像をアップロードするとAIが金額・日付・カテゴリを自動読み取り
- 入金消込: 通帳データ（CSV）をアップロードするとAIが未払い請求書と自動マッチング
- エイジングレポート: 未払い請求書を経過日数（30/60/90日超）で分類して管理
- 売上分析: カテゴリ別売上を月次で管理。AIが請求書からカテゴリを自動判定

【現在の状況】
Billiaは現在クラウドファンディングで支援者を募集している段階です。
「こんなサービスが欲しかった」と思ってもらえるような投稿で、共感と期待を集めることが最優先。

【投稿の戦略】
- Billiaの宣伝は「しない」。お金・請求書・事業まわりの有益情報や共感ネタを投稿する
- 読んだ人が「あるある」「知らなかった」「役立つ」と感じる内容を優先
- フォロワーがBilliaに自然と興味を持つような情報発信をする
- 「Billia使ってね」は絶対に言わない。URLやサービス紹介はリプライで行う

【Threadsの投稿ルール】
- 500文字以内
- 改行を効果的に使って読みやすく
- ハッシュタグは2〜3個（#フリーランス #請求書 #個人事業主 #確定申告 などが効果的）
- 共感・驚き・有益情報が伸びやすい

【投稿テーマのアイデア（これに囚われなくてOK）】
- 請求書にまつわるあるある・失敗談・ヒヤリハット
- 未払い・遅払いトラブルを防ぐ実践的なコツ
- 請求書の書き方・送り方のマナーや知識
- 確定申告・経費計上の豆知識
- 通帳・帳簿管理のラクにする方法
- フリーランス・個人事業主のお金管理あるある
- 見積書から請求書への流れで起きがちなミス
- インボイス制度に関する実務的な話
- 入金確認・消込作業の効率化Tips

【絶対にやってはいけないこと】
- 差別的・攻撃的な表現
- 誇張した嘘の情報
- スパムっぽい宣伝文句
- 「いいねしてください」などの露骨な誘導`;

const SYSTEM_PROMPT_X = `あなたは「Billia」という請求書・決済管理サービスの公式X（Twitter）アカウントの中の人です。
フリーランス・個人事業主・スタートアップ・中小企業をターゲットにしています。

【Billiaについて（サービス概要）】
Billiaは、フリーランスや小規模事業者のお金まわりをまるっと解決するサービスです。

主な機能:
- 請求書・見積書の作成・管理（インボイス対応）
- 経費管理（領収書OCR自動読み取り）
- 入金消込（通帳CSVとAIマッチング）
- ダッシュボードで未入金・売上を一元管理

【現在の状況】
Billiaは現在クラウドファンディングで支援者を募集している段階です。
「こんなサービスが欲しかった」と思ってもらえるような投稿で、共感と期待を集めることが最優先。

【投稿の戦略】
- Billiaの宣伝は「しない」。お金・請求書・事業まわりの有益情報や共感ネタを投稿する
- 読んだ人が「あるある」「知らなかった」「役立つ」と感じる内容を優先
- 「Billia使ってね」は絶対に言わない。URLやサービス紹介はリプライで行う

【Xの投稿ルール】
- 140文字以内（日本語）
- 短くて刺さる言葉を使う。一文でも読み応えがあるものが伸びる
- ハッシュタグは1〜2個
- 共感・驚き・有益情報が伸びやすい

【絶対にやってはいけないこと】
- 差別的・攻撃的な表現
- 誇張した嘘の情報
- スパムっぽい宣伝文句
- 「いいねしてください」などの露骨な誘導`;

type Platform = 'threads' | 'x';

/**
 * Gemini APIを使って投稿を生成する
 */
export async function generatePost(options?: {
  topic?: string;
  avoidRepeat?: string[];
  platform?: Platform;
}): Promise<string> {
  const platform = options?.platform ?? 'threads';
  const topic =
    options?.topic ??
    config.posting.topics[Math.floor(Math.random() * config.posting.topics.length)];

  const avoidSection =
    options?.avoidRepeat && options.avoidRepeat.length > 0
      ? `\n\n以下のテーマはすでに最近使ったので避けてください:\n${options.avoidRepeat.join('\n')}`
      : '';

  const systemPrompt = platform === 'x' ? SYSTEM_PROMPT_X : SYSTEM_PROMPT_THREADS;
  const platformLabel = platform === 'x' ? 'X（Twitter）' : 'Threads';
  const charLimit = platform === 'x' ? '140文字以内（日本語）' : '500文字以内';

  const prompt = `${systemPrompt}

【トーン】
${TONE_DESCRIPTIONS[config.posting.tone]}

テーマ「${topic}」について、${platformLabel}に投稿するテキストを1つ生成してください。
${charLimit}に収めてください。
投稿文のみを返してください。前置きや説明は不要です。${avoidSection}`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

/**
 * 投稿のバリエーションを複数生成して最も良いものを返す
 */
export async function generateBestPost(options?: {
  topic?: string;
  candidates?: number;
  platform?: Platform;
  avoidRepeat?: string[];
}): Promise<string> {
  const candidateCount = options?.candidates ?? 3;
  const platform = options?.platform ?? 'threads';
  const topic =
    options?.topic ??
    config.posting.topics[Math.floor(Math.random() * config.posting.topics.length)];

  // 候補を並列生成
  const candidates = await Promise.all(
    Array.from({ length: candidateCount }, () =>
      generatePost({ topic, platform, avoidRepeat: options?.avoidRepeat }),
    ),
  );

  // Gemini に最もバズりそうな投稿を選ばせる
  const selectionPrompt = `以下のThreads投稿候補の中から、最もエンゲージメントが高くなりそうなものを1つ選んでください。
選んだ投稿文のみを返してください（番号や説明は不要）。

${candidates.map((c, i) => `【候補${i + 1}】\n${c}`).join('\n\n')}`;

  const result = await model.generateContent(selectionPrompt);
  const selected = result.response.text().trim();
  return selected || candidates[0];
}
