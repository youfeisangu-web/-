import { config } from './config';
import { startScheduler, runPost } from './scheduler/scheduler';
import { ThreadsClient } from './threads/threadsClient';
import { TwitterClient } from './twitter/twitterClient';
import { generatePost } from './ai/contentGenerator';
import { log } from './utils/logger';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isPostNow = args.includes('--post-now');

  log('info', '=== Threads & X 自動運用AI 起動 ===');
  log('info', `モデル: ${config.gemini.model}`);
  log('info', `トーン: ${config.posting.tone}`);
  log('info', `トピック: ${config.posting.topics.join(' / ')}`);
  log('info', `1日の投稿数: ${config.posting.postsPerDay}回`);

  // Threads アカウント疎通確認
  try {
    const threads = new ThreadsClient();
    const profile = await threads.getProfile();
    log('info', `Threadsアカウント確認: @${profile.username}`);
  } catch {
    log('warn', 'Threads APIの疎通確認に失敗（.envの設定を確認してください）');
    if (!isDryRun) process.exit(1);
  }

  // X アカウント疎通確認（設定がある場合のみ）
  if (config.twitter.enabled) {
    try {
      const twitter = new TwitterClient();
      const profile = await twitter.getProfile();
      log('info', `Xアカウント確認: @${profile.username}`);
    } catch {
      log('warn', 'X APIの疎通確認に失敗（X_API_KEY等の設定を確認してください）');
    }
  } else {
    log('info', 'X投稿: 無効（X_API_KEY 等を .env に設定すると有効になります）');
  }

  if (isDryRun) {
    // ドライラン: 投稿文だけ生成して表示
    log('info', '[DRY RUN モード] - 実際の投稿はしません');
    const post = await generatePost();
    log('info', `サンプル投稿:\n${'─'.repeat(40)}\n${post}\n${'─'.repeat(40)}`);
    return;
  }

  if (isPostNow) {
    // 即時投稿
    log('info', '[即時投稿モード]');
    await runPost();
    return;
  }

  // 通常: スケジューラー起動
  startScheduler();
  log('info', 'スケジューラー起動中... (Ctrl+C で停止)');
}

main().catch(err => {
  log('error', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
