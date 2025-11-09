# Rails 8 Blog Application

Ruby on Rails 8を使用したブログアプリケーションです。画像付きの記事投稿機能を持つCMSシステムとして設計されています。

## 概要

このアプリケーションは以下の機能を提供します：

- 記事の作成、編集、削除、表示
- 画像アップロード機能
- 管理者認証システム（Devise）
- 日本語対応
- レスポンシブデザイン対応

## 技術スタック

### フレームワーク・ライブラリ
- **Ruby**: 3.4.5
- **Ruby on Rails**: 8.1.1
- **Database**: MySQL 5.6.4以上 (Trilogy adapter 2.7使用)
- **Web Server**: Puma
- **Bundler**: 2.7.2

### 主要Gem
- **Devise**: 4.9.4 - ユーザー認証
- **Devise-i18n**: 1.15.0 - Devise日本語化
- **CarrierWave**: 3.1.2 - 画像アップロード
- **MiniMagick**: 5.3.1 - 画像処理
- **Kaminari**: 1.2.2 - ページネーション
- **Rails-i18n**: 8.0.2 - 国際化対応
- **Commonmarker**: 2.5.0 - Markdown処理

### 開発・テストツール
- **RSpec Rails**: 8.0.2 - テストフレームワーク
- **Factory Bot Rails**: 6.5.1 - テストデータ生成
- **Shoulda Matchers**: 6.5.0 - テストマッチャー
- **Rails Controller Testing**: 1.0.5 - コントローラーテスト
- **RuboCop Rails Omakase**: コード品質管理
- **Brakeman**: セキュリティ脆弱性検査
- **Better Errors**: 2.10.1 - 開発環境でのエラー表示改善
- **Binding of Caller**: 1.0.1 - デバッグ支援
- **Letter Opener Web**: 3.0.0 - メール確認ツール

## データベース構造

### Posts (ブログ)
| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | bigint | 主キー |
| title | string | 記事タイトル (必須) |
| body | text | 記事本文 (必須) |
| image | string | 画像ファイルパス (必須) |
| published_at | datetime | 公開日時 (必須) |
| created_at | datetime | 作成日時 |
| updated_at | datetime | 更新日時 |

### Comments (コメント)
| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | bigint | 主キー |
| post_id | bigint | 記事への外部キー (必須) |
| body | text | コメント本文 (必須) |
| name | string | 投稿者名 (必須) |
| created_at | datetime | 作成日時 |
| updated_at | datetime | 更新日時 |

### Users (ユーザー)
| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | bigint | 主キー |
| email | string | メールアドレス (必須・一意) |
| name | string | ユーザー名 (必須) |
| encrypted_password | string | 暗号化されたパスワード |
| reset_password_token | string | パスワードリセットトークン |
| reset_password_sent_at | datetime | パスワードリセット送信日時 |
| remember_created_at | datetime | ログイン記憶日時 |
| created_at | datetime | 作成日時 |
| updated_at | datetime | 更新日時 |

## 機能

### フロントエンド
- **記事一覧表示** (`/`)
  - 公開済み記事の一覧をページネーション付きで表示
  - 公開日時の降順でソート
- **記事詳細表示** (`/posts/:id`)
  - 記事の全文表示
  - コメント一覧表示（ページネーション付き）
  - コメント投稿フォーム

### 管理画面 (/admin)
- **認証機能**
  - 管理者ログイン・ログアウト (`/admin/sign_in`)
  - 管理者新規登録 (`/admin/sign_up`)
  - パスワードリセット機能
- **記事管理** (`/admin/posts`)
  - 記事の一覧表示（ページネーション付き）
  - 記事の作成・編集・削除
  - 画像アップロード機能
  - 公開日時の設定
- **プロファイル管理** (`/admin/profile`)
  - ユーザー情報の表示・編集
  - パスワード変更（現在のパスワード不要）
- **ダッシュボード** (`/admin`)
  - 管理画面のトップページ

## セットアップ

### 前提条件
- Ruby 3.4.5以上
- MySQL 5.6.4以上
- Bundler 2.7.2以上

### インストール

1. リポジトリをクローン
```bash
git clone <repository-url>
cd rails8
```

2. 依存関係をインストール
```bash
bundle install
```

3. データベース設定
```bash
# config/database.ymlを環境に合わせて設定
# デフォルト設定:
# - ユーザー名: root
# - パスワード: mysql
# - ホスト: 127.0.0.1 (DB_HOST環境変数で変更可能)
```

4. データベース作成・マイグレーション
```bash
rails db:create
rails db:migrate
rails db:seed
```

5. アセットのプリコンパイル（本番環境の場合）
```bash
rails assets:precompile
```

### 起動

開発環境での起動:
```bash
rails server
# または
bin/rails server

# バックグラウンド起動
rails server -d

# ポート指定
rails server -p 3001
```

アプリケーションは `http://localhost:3000` でアクセス可能になります。

## 主要なエンドポイント

### フロントエンド
- `/` - トップページ（現在は設定されていません）
- `/posts/:id` - 記事詳細

### 管理画面
- `/admin` - 管理画面ダッシュボード
- `/admin/sign_in` - 管理者ログイン
- `/admin/sign_up` - 管理者新規登録
- `/admin/posts` - 記事管理
- `/admin/profile` - プロファイル管理

### 開発用ツール
- `/letter_opener` - メール確認ツール（開発環境のみ）

## 開発

### テスト実行
```bash
# 全テスト実行
bundle exec rspec

# ドキュメント形式で実行
bundle exec rspec --format documentation

# 特定のテストファイル実行
bundle exec rspec spec/models/post_spec.rb

# 特定のテストケース実行
bundle exec rspec spec/models/post_spec.rb:10
```

**テストカバレッジ**: 31 examples, 0 failures
- モデルテスト（Post, Comment, User）
- リクエストテスト（Admin::Posts, Admin::Profile, Front::Posts, Front::Comments, Users::Registrations）
- ヘルパーテスト（MarkdownHelper）

### コード品質チェック
```bash
# RuboCop実行（Rails Omakaseスタイルガイド準拠）
bundle exec rubocop

# 自動修正
bundle exec rubocop -a

# セキュリティチェック
bundle exec brakeman

# 静的解析（詳細出力）
bundle exec brakeman -A
```

**品質指標**:
- RuboCop: 62ファイル検査、違反なし
- Brakeman: セキュリティ警告0件

### デバッグ
- Better Errorsが開発環境で有効
- `binding.irb`でブレークポイント設定可能

## 設定

### タイムゾーン
- アプリケーション: 東京時間 (JST)
- データベース: ローカル時間

### 言語設定
- デフォルト言語: 日本語 (ja)
- Deviseメッセージも日本語化済み

### 画像アップロード
- CarrierWaveによる画像アップロード機能
- 設定は `app/uploaders/image_uploader.rb` で管理

## ディレクトリ構造

```
rails8/
├── app/
│   ├── controllers/
│   │   ├── admin/          # 管理画面コントローラー
│   │   │   ├── base_controller.rb
│   │   │   ├── home_controller.rb
│   │   │   ├── posts_controller.rb
│   │   │   └── profiles_controller.rb
│   │   ├── front/          # フロントエンドコントローラー
│   │   │   ├── base_controller.rb
│   │   │   ├── comments_controller.rb
│   │   │   └── posts_controller.rb
│   │   ├── users/          # Deviseカスタムコントローラー
│   │   └── application_controller.rb
│   ├── models/             # データモデル
│   │   ├── comment.rb
│   │   ├── post.rb
│   │   └── user.rb
│   ├── views/              # ビューテンプレート (50ファイル)
│   │   ├── admin/
│   │   ├── front/
│   │   ├── layouts/
│   │   └── users/
│   ├── helpers/            # ビューヘルパー
│   │   └── markdown_helper.rb
│   └── uploaders/          # CarrierWaveアップローダー
│       └── image_uploader.rb
├── config/
│   ├── environments/       # 環境別設定
│   ├── initializers/       # 初期化設定
│   ├── locales/           # 言語ファイル
│   │   ├── ja.yml
│   │   └── models/
│   ├── routes.rb          # ルーティング定義
│   └── database.yml       # データベース設定
├── db/
│   ├── migrate/           # マイグレーションファイル (4ファイル)
│   └── seeds.rb           # 初期データ
├── spec/                  # テストファイル (10ファイル)
│   ├── factories/         # Factory Bot定義
│   ├── helpers/
│   ├── models/
│   ├── requests/
│   └── support/
└── public/                # 静的ファイル
```

## ライセンス

このプロジェクトのライセンスについては、プロジェクト管理者にお問い合わせください。

## 貢献

バグレポートや機能リクエストは、GitHubのIssuesにお願いします。プルリクエストも歓迎します。
