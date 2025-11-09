# railsコマンドの呼び出しについて

## rubyインストール
省略

## railsインストール
gem install rails

## railsアプリケーション構築
rails new xx

1. ruby-xxx/lib/ruby/gems/3.4.0/gems/railties-8.0.2.1/exe/rails 呼び出し
2. ruby-xxx/lib/ruby/gems/3.4.0/gems/railties-8.0.2.1/lib/rails/cli.rb 呼び出し
  Rails::Command.invoke :application, ARGV 呼び出し
3. ruby-xxx/lib/ruby/gems/3.4.0/gems/railties-8.0.2.1/lib/rails/command.rb 呼び出し
  command.perform(command_name, args, config) がコアゾーン
4. ruby-xxx/lib/ruby/gems/3.4.0/gems/railties-8.0.2.1/lib/rails/commands/application/application_command.rb 呼び出し

## アプリケーション内でのrailsコマンドの参照先

railsコマンドどうなってるん悪戯 (docsに準拠し、Railsアプリケーションを構築することを前提とする)
rubyインストール(gem使用可となる)
railsインストール(gem install rails)
railsアプリケーション構築
rails new呼び出し
ruby-xxx/lib/ruby/gems/3.4.0/gems/railties-8.0.2.1/exe/rails 呼び出し
ruby-xxx/lib/ruby/gems/3.4.0/gems/railties-8.0.2.1/lib/rails/cli.rb 呼び出し
Rails::Command.invoke :application, ARGV 呼び出し
ruby-xxx/lib/ruby/gems/3.4.0/gems/railties-8.0.2.1/lib/rails/command.rb 呼び出し
command.perform(command_name, args, config) がコアゾーン
ruby-xxx/lib/ruby/gems/3.4.0/gems/railties-8.0.2.1/lib/rails/commands/application/application_command.rb 呼び出し
Rails::Generators::AppGenerator.start \ Rails::Generators::ARGVScrubber.new(args).prepare! がコア
ruby-xxx/lib/ruby/gems/3.4.0/gems/railties-8.0.2.1/lib/rails/commands/application/application_command.rb 呼び出し
多分こいつがコマンドのオプションをハンドルしてそう？
以降は調査未遂だが、これによりファイルが多々生成されていると仮定。newが完了。
アプリケーション内でのrailsは上記のrailsとパスが異なる？
これによって、エイリアスコマンドの制御をしてそう。というか、自分だけのコマンド作って標準出力させることできそう。楽しそう
require "rails/command"

aliases = {
  "g"  => "generate",
  "d"  => "destroy",
  "c"  => "console",
  "s"  => "server",
  "db" => "dbconsole",
  "r"  => "runner",
  "t"  => "test"
}

command = ARGV.shift
command = aliases[command] || command

Rails::Command.invoke command, ARGV
以降やること
thor興味あり









