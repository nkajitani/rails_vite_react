ARG RUBY_VERSION=3.4.5

FROM ruby:${RUBY_VERSION}-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libyaml-dev \
      pkg-config \
      # MySQL接続用
      libssl-dev \
      # 画像処理（mini_magick, carrierwave用）
      imagemagick && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 3000
