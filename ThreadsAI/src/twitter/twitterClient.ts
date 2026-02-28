import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config';

/**
 * X (Twitter) API クライアント
 * OAuth 1.0a ユーザーコンテキストでツイートを投稿する
 */
export class TwitterClient {
  private readonly client: TwitterApi;

  constructor() {
    this.client = new TwitterApi({
      appKey: config.twitter.apiKey,
      appSecret: config.twitter.apiSecret,
      accessToken: config.twitter.accessToken,
      accessSecret: config.twitter.accessTokenSecret,
    });
  }

  /**
   * ツイートを投稿する
   */
  async post(text: string): Promise<string> {
    const res = await this.client.v2.tweet(text);
    return res.data.id;
  }

  /**
   * 指定ツイートへのリプライを投稿する
   */
  async reply(replyToId: string, text: string): Promise<string> {
    const res = await this.client.v2.reply(text, replyToId);
    return res.data.id;
  }

  /**
   * アカウント情報を取得（疎通確認用）
   */
  async getProfile(): Promise<{ id: string; username: string }> {
    const res = await this.client.v2.me();
    return { id: res.data.id, username: res.data.username };
  }
}
