# マークダウンヘルパー
module MarkdownHelper
  # HTML element
  ALLOWED_TAGS = %w[p br a strong em code pre h1 h2 h3 h4 h5 h6 ul ol li blockquote hr table thead tbody tr th td img]
  # HTML attribute
  ALLOWED_ATTRS = %w[href title rel target src alt id class aria-hidden]

  def render_markdown(md)
    # https://github.com/gjtorikian/commonmarker
    html = Commonmarker.to_html(md.to_s, options: { parse: { smart: true } })
    sanitize(html, tags: ALLOWED_TAGS, attributes: ALLOWED_ATTRS)
  end
end
