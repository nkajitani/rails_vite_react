require 'rails_helper'

RSpec.describe MarkdownHelper, type: :helper do
  describe '#render_markdown' do
    it 'renders markdown to sanitized HTML' do
      md = <<~MD
        This is a **bold** text and this is an *italic* text.
        <script>alert('XSS');</script>
      MD

      expected_html = <<~HTML
        <p>This is a <strong>bold</strong> text and this is an <em>italic</em> text.</p>
      HTML

      rendered_html = helper.render_markdown(md).strip
      expect(rendered_html).to eq(expected_html.strip)
      expect(rendered_html).not_to include("<script>")
    end
  end
end
