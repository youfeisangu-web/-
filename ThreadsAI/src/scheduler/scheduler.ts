import cron from 'node-cron';
import { config } from '../config';
import { generateBestPost } from '../ai/contentGenerator';
import { ThreadsClient } from '../threads/threadsClient';
import { TwitterClient } from '../twitter/twitterClient';
import { log } from '../utils/logger';

const threads = new ThreadsClient();
const twitter = config.twitter.enabled ? new TwitterClient() : null;

// 最近使ったトピックを記録してバリエーションを保つ
const recentTopics: string[] = [];
const MAX_RECENT = 5;

/**
 * 1回分の投稿処理
 */
export async function runPost(dryRun = false): Promise<void> {
  log('info', '投稿生成を開始します...');

  try {
    const post = await generateBestPost({
      candidates: 3,
      avoidRepeat: recentTopics,
    });

    log('info', `生成した投稿:\n${'─'.repeat(40)}\n${post}\n${'─'.repeat(40)}`);

    if (dryRun) {
      log('info', '[DRY RUN] 実際には投稿しません');
      return;
    }

    // Threads に投稿
    const postId = await threads.post(post);
    log('info', `Threads 投稿完了 ✓  ID: ${postId}`);

    // Billia URL が設定されていればリプライで添付
    if (config.posting.billiaUrl) {
      await threads.reply(postId, config.posting.billiaUrl);
      log('info', `Threads リプライ完了 ✓  URL: ${config.posting.billiaUrl}`);
    }

    // X (Twitter) が有効なら投稿
    if (twitter) {
      const xPost = await generateBestPost({ candidates: 3, platform: 'x' });
      log('info', `X 投稿文:\n${'─'.repeat(40)}\n${xPost}\n${'─'.repeat(40)}`);
      const tweetId = await twitter.post(xPost);
      log('info', `X 投稿完了 ✓  ID: ${tweetId}`);

      if (config.posting.billiaUrl) {
        await twitter.reply(tweetId, config.posting.billiaUrl);
        log('info', `X リプライ完了 ✓  URL: ${config.posting.billiaUrl}`);
      }
    }

    // 直近のトピックを更新
    recentTopics.push(post.slice(0, 30));
    if (recentTopics.length > MAX_RECENT) recentTopics.shift();
  } catch (err) {
    log('error', `投稿に失敗しました: ${err instanceof Error ? err.message : err}`);
  }
}

/**
 * 1日N回の投稿スケジュールを組んで cron 登録する
 */
export function startScheduler(): void {
  const postsPerDay = config.posting.postsPerDay;

  // 投稿時間を均等に分散（例: 3回なら 8:00, 13:00, 19:00）
  const schedules = buildSchedules(postsPerDay);

  log('info', `スケジューラー開始: 1日${postsPerDay}回投稿`);
  log('info', `投稿時刻: ${schedules.map(s => s.label).join(', ')}`);

  for (const schedule of schedules) {
    cron.schedule(schedule.cron, () => runPost(), {
      timezone: config.posting.timezone,
    });
  }
}

function buildSchedules(postsPerDay: number): { cron: string; label: string }[] {
  // 8:00〜21:00 の間で均等に配置
  const START_HOUR = 8;
  const END_HOUR = 21;
  const range = END_HOUR - START_HOUR;

  return Array.from({ length: postsPerDay }, (_, i) => {
    const hour = Math.round(START_HOUR + (range / postsPerDay) * i);
    const minute = Math.round((i * 17) % 60); // ちょっとずらして自然に見せる
    return {
      cron: `${minute} ${hour} * * *`,
      label: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    };
  });
}
