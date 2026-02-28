import axios from 'axios';
import { config } from '../config';

interface CreateContainerResponse {
  id: string;
}

interface PublishResponse {
  id: string;
}

/**
 * Threads API クライアント
 * Meta の Threads API (v1.0) を使って投稿する
 *
 * 参考: https://developers.facebook.com/docs/threads
 */
export class ThreadsClient {
  private readonly base = config.threads.apiBase;
  private readonly userId = config.threads.userId;
  private readonly token = config.threads.accessToken;

  /**
   * テキスト投稿する（2ステップ: コンテナ作成 → 公開）
   */
  async post(text: string): Promise<string> {
    const containerId = await this.createContainer(text);
    // Meta の仕様で30秒待機が推奨されている
    await this.sleep(30_000);
    const postId = await this.publish(containerId);
    return postId;
  }

  /**
   * ステップ1: メディアコンテナを作成
   */
  private async createContainer(text: string): Promise<string> {
    const url = `${this.base}/${this.userId}/threads`;
    const res = await axios.post<CreateContainerResponse>(url, null, {
      params: {
        media_type: 'TEXT',
        text,
        access_token: this.token,
      },
    });
    return res.data.id;
  }

  /**
   * ステップ2: コンテナを公開
   */
  private async publish(containerId: string): Promise<string> {
    const url = `${this.base}/${this.userId}/threads_publish`;
    const res = await axios.post<PublishResponse>(url, null, {
      params: {
        creation_id: containerId,
        access_token: this.token,
      },
    });
    return res.data.id;
  }

  /**
   * アカウント情報を取得（疎通確認用）
   */
  async getProfile(): Promise<{ id: string; username: string }> {
    const url = `${this.base}/${this.userId}`;
    const res = await axios.get<{ id: string; username: string }>(url, {
      params: {
        fields: 'id,username',
        access_token: this.token,
      },
    });
    return res.data;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
