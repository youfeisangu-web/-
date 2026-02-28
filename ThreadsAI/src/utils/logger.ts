type Level = 'info' | 'warn' | 'error';

export function log(level: Level, message: string): void {
  const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  const prefix = {
    info: '✅ INFO',
    warn: '⚠️  WARN',
    error: '❌ ERROR',
  }[level];
  console[level === 'error' ? 'error' : 'log'](`[${now}] ${prefix} ${message}`);
}
