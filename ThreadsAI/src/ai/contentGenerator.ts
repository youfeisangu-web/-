import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config';

const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const TONE_DESCRIPTIONS = {
  casual: 'フレンドリーでカジュアル。友達に話しかけるような口調。絵文字も自然に使う。',
  professional: '知識豊富で信頼感がある。ビジネスパーソン向け。でも堅すぎない。',
  humorous: 'ユーモアがあって笑える。でも不快にならない範囲で。たまに自虐も入れる。',
};

/**
 * Claude APIを使ってThreads投稿を生成する
 */
export async function generatePost(options?: {
  topic?: string;
  avoidRepeat?: string[];
}): Promise<string> {
  const topic =
    options?.topic ??
    config.posting.topics[Math.floor(Math.random() * config.posting.topics.length)];

  const avoidSection =
    options?.avoidRepeat && options.avoidRepeat.length > 0
      ? `\n\n以下のテーマはすでに最近使ったので避けてください:\n${options.avoidRepeat.join('\n')}`
      : '';

  const systemPrompt = `あなたはThreads（Meta社のSNS）の投稿を自動生成するAIです。
バズりやすく、エンゲージメントが高い投稿を作ります。

【トーン】
${TONE_DESCRIPTIONS[config.posting.tone]}

【Threadsの特徴】
- Twitter/Xに近いが、もう少し長めの投稿が好まれる
- 改行を効果的に使うと読みやすい
- ハッシュタグは2〜3個まで（多すぎはNG）
- 共感・驚き・笑い・有益情報が伸びやすい
- 「続きが気になる」構成も効果的
- 500文字以内に収める

【絶対にやってはいけないこと】
- 差別的・攻撃的な表現
- 誇張しすぎた嘘の情報
- スパムっぽい宣伝文句
- 「いいねしてください」などの露骨な誘導`;

  const userPrompt = `テーマ「${topic}」について、Threadsに投稿するテキストを1つ生成してください。
投稿文のみを返してください。前置きや説明は不要です。${avoidSection}`;

  const message = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 500,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('予期しないレスポンス形式');
  return content.text.trim();
}

/**
 * 投稿のバリエーションを複数生成して最も良いものを返す
 */
export async function generateBestPost(options?: {
  topic?: string;
  candidates?: number;
}): Promise<string> {
  const candidateCount = options?.candidates ?? 3;
  const topic =
    options?.topic ??
    config.posting.topics[Math.floor(Math.random() * config.posting.topics.length)];

  // 候補を並列生成
  const candidates = await Promise.all(
    Array.from({ length: candidateCount }, () => generatePost({ topic })),
  );

  // Claude に最もバズりそうな投稿を選ばせる
  const message = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `以下のThreads投稿候補の中から、最もエンゲージメントが高くなりそうなものを1つ選んでください。
選んだ投稿文のみを返してください（番号や説明は不要）。

${candidates.map((c, i) => `【候補${i + 1}】\n${c}`).join('\n\n')}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') return candidates[0];
  return content.text.trim();
}
