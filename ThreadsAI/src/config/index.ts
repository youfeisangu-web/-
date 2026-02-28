import dotenv from 'dotenv';
dotenv.config();

function required(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`環境変数 ${key} が設定されていません。.env を確認してください。`);
  return val;
}

function optional(key: string): string {
  return process.env[key] ?? '';
}

export const config = {
  gemini: {
    apiKey: required('GEMINI_API_KEY'),
    model: 'gemini-1.5-pro' as const,
  },
  threads: {
    userId: required('THREADS_USER_ID'),
    accessToken: required('THREADS_ACCESS_TOKEN'),
    apiBase: 'https://graph.threads.net/v1.0',
  },
  twitter: {
    apiKey: optional('X_API_KEY'),
    apiSecret: optional('X_API_SECRET'),
    accessToken: optional('X_ACCESS_TOKEN'),
    accessTokenSecret: optional('X_ACCESS_TOKEN_SECRET'),
    get enabled(): boolean {
      return !!(
        process.env.X_API_KEY &&
        process.env.X_API_SECRET &&
        process.env.X_ACCESS_TOKEN &&
        process.env.X_ACCESS_TOKEN_SECRET
      );
    },
  },
  posting: {
    postsPerDay: parseInt(process.env.POSTS_PER_DAY ?? '3', 10),
    tone: (process.env.POST_TONE ?? 'casual') as 'casual' | 'professional' | 'humorous',
    topics: (process.env.POST_TOPICS ?? 'ライフハック,日常の気づき')
      .split(',')
      .map(t => t.trim()),
    language: process.env.POST_LANGUAGE ?? 'Japanese',
    timezone: process.env.TIMEZONE ?? 'Asia/Tokyo',
    billiaUrl: process.env.BILLIA_URL ?? '',
  },
};
