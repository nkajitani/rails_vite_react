# 設計・実装のポイント

このプロジェクトで工夫した設計判断と技術的な配慮について説明します。

## 1. コントローラーの責務分離 (`app/controllers/admin`, `app/controllers/users`)

**目的**: 管理機能の肥大化を防ぎ、関心事を明確に分離

- **`users/`配下**: Deviseの認証機能に関するカスタマイズ（registrations, sessions, passwords等）
- **`admin/`配下**: 管理画面のビジネスロケーション（posts, profiles, home等）

この構成により、Deviseの標準的な振る舞いと、アプリケーション固有のロジックが混在せず、保守性が向上します。

## 2. Deviseメソッドの命名規則に準拠 (`app/models/user.rb`)

**カスタムメソッド**: `update_without_current_password`

Deviseには`update_without_password`という標準メソッドが存在します。本アプリケーションでは、プロファイル編集時に「パスワード変更時のみパスワード確認を求める」という仕様を実現するため、カスタムメソッドを実装しました。

- **命名の工夫**: Deviseの命名規則に合わせることで、コードの一貫性を保ち、直感的に理解できる
- **参考**: `vendor/bundle/ruby/3.4.0/gems/devise-4.9.4/lib/devise/models/database_authenticatable.rb`

## 3. ルーティングの名前空間設計 (`config/routes.rb`)

**フロントエンド**: `scope module: "front"` を使用
**管理画面**: `namespace :admin` を使用

- フロントエンドはURLに`/front`を含めず、クリーンなURL構造を維持
- コントローラーは`Front::`名前空間で整理され、ディレクトリ構造とマッピング
- 管理画面は`/admin`プレフィックスで明確に分離

この設計により、URLの可読性とコードの構造化を両立しています。

## 4. テスト設定のモジュール化 (`spec/support/*`)

**方針**: RSpecの設定を関心事ごとに分割管理

RSpecの推奨構成に従い、`rails_helper.rb`に直接記述せず、`spec/support/`配下にモジュールごとのファイルを配置：
- `devise.rb`: Devise用のテストヘルパー設定
- `carrierwave.rb`: CarrierWave用のテスト設定
- `factory_bot.rb`: FactoryBotのショートハンド有効化
- `shoulda_matchers.rb`: ShouldaMatchersの設定

これにより設定の見通しが良くなり、メンテナンスが容易になります。

## 5. テストパフォーマンスの最適化 (`spec/support/carrierwave.rb`)

**課題**: 画像アップロードのテストで不要なファイルが蓄積・処理速度が低下

**対策**:
```ruby
# テスト後に自動でアップロード画像を削除
config.after(:each) do
  FileUtils.rm_rf(Dir["#{Rails.root}/public/uploads/test"])
end

# テスト実行時は画像処理（リサイズ等）をスキップ
CarrierWave.configure do |config|
  config.enable_processing = false
end
```

これによりテスト実行時間が短縮され、不要なファイルの蓄積を防ぎます。

## 6. Markdownのセキュアな処理 (`app/helpers/markdown_helper.rb`)

**使用Gem**: `commonmarker` (GitHub Flavored Markdown対応)

**セキュリティ対策**: サニタイゼーション設定を明示的に制御
```ruby
Commonmarker.to_html(text, options: :DEFAULT, extensions: {
  tagfilter: true,     # 危険なHTMLタグをフィルタリング
  autolink: true,      # URL自動リンク化
  table: true,         # テーブル記法サポート
  strikethrough: true  # 打ち消し線サポート
})
```

許可する要素を明示的に定義することで、XSS攻撃のリスクを最小化しています。

---

これらの工夫により、**保守性**、**セキュリティ**、**パフォーマンス**のバランスが取れた設計を実現しています。
