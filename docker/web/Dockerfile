ARG RUBY_VERSION=3.4.5

ARG NODE_MAJOR=22

FROM ruby:${RUBY_VERSION}-slim

ARG NODE_MAJOR
ENV NODE_MAJOR=${NODE_MAJOR}

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libyaml-dev \
      pkg-config \
      # MySQL接続用
      libssl-dev \
      # 画像処理（mini_magick, carrierwave用）
      imagemagick \
      # Node.js インストール用
      curl \
      ca-certificates \
      gnupg && \
    install -d -m 0755 /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | \
    gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" | \
    tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 3000
