#!/usr/bin/env python3
"""Assemble the chapter markdown files into a 6x9 PDF via headless Chromium.

Two passes: the first renders without page numbers in the table of contents,
then pdftotext locates each chapter's page and the second pass fills them in.
"""
import glob
import html
import os
import re
import subprocess

import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
TITLE = "The Sky Is Having a Breakdown"
SUBTITLE = "400+ True Stories of Fire Tornadoes, Raining Fish, Cloud Monsters, and the Strangest Weather Ever Caught on Camera"
AUTHOR = "[Author Name]"

CSS = """
@page { size: 6in 9in; margin: 0.8in 0.7in 0.9in 0.7in;
  @bottom-center { content: counter(page); font-size: 9pt; font-family: 'Liberation Serif', Georgia, serif; }
  @top-center { content: "THE SKY IS HAVING A BREAKDOWN"; font-size: 7.5pt; letter-spacing: 0.12em; color: #666; font-family: 'Liberation Serif', Georgia, serif; } }
@page :first { @bottom-center { content: none; } @top-center { content: none; } }
@page front { @bottom-center { content: none; } @top-center { content: none; } }
html { font-family: Georgia, 'Liberation Serif', 'DejaVu Serif', serif; font-size: 11.5pt; line-height: 1.42; color: #111; }
body { margin: 0; }
h1 { font-size: 21pt; line-height: 1.15; margin: 0 0 0.3in; break-before: page; }
h2 { font-size: 14pt; margin: 0.3in 0 0.1in; }
p { margin: 0 0 0.12in; orphans: 3; widows: 3; }
ol { padding-left: 0.3in; margin: 0.2in 0 0; }
ol li { margin-bottom: 0.12in; break-inside: avoid-page; }
ul { padding-left: 0.25in; }
li { margin-bottom: 0.06in; }
.front { page: front; }
.title-page { text-align: center; padding-top: 1.6in; break-after: page; }
.title-page .t { font-size: 34pt; font-weight: bold; line-height: 1.1; margin-bottom: 0.35in; text-transform: uppercase; letter-spacing: 0.02em; }
.title-page .s { font-size: 13pt; font-style: italic; margin: 0 0.3in 0.9in; }
.title-page .a { font-size: 13pt; letter-spacing: 0.1em; }
.copyright { page: front; font-size: 9.5pt; padding-top: 5in; break-after: page; }
.toc { page: front; break-after: page; }
.toc h1 { break-before: auto; page: front; }
.toc .row { display: flex; align-items: baseline; margin: 0.07in 0; }
.toc .row .name { flex: 0 1 auto; }
.toc .row .dots { flex: 1 1 auto; border-bottom: 1px dotted #888; margin: 0 4px; transform: translateY(-3px); }
.toc .row .pg { flex: 0 0 auto; }
.closing { break-before: page; page: front; text-align: center; padding-top: 2in; }
em { font-style: italic; }
strong { font-weight: bold; }
"""


def read(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read()


def build_html(pages=None):
    pages = pages or {}
    files = sorted(glob.glob(os.path.join(HERE, "chapters", "*.md")))
    sections = []
    toc_entries = []
    for f in files:
        text = read(f)
        title = re.match(r"# (.+)", text).group(1)
        toc_entries.append(title)
        sections.append(markdown.markdown(text, extensions=["extra"]))

    toc_rows = ""
    for title in toc_entries:
        pg = pages.get(title, "")
        toc_rows += (
            f'<div class="row"><span class="name">{html.escape(title)}</span>'
            f'<span class="dots"></span><span class="pg">{pg}</span></div>'
        )

    front = f"""
<div class="front title-page"><div class="t">{html.escape(TITLE)}</div>
<div class="s">{html.escape(SUBTITLE)}</div><div class="a">{html.escape(AUTHOR)}</div></div>
<div class="copyright"><p>Copyright &copy; 2026 {html.escape(AUTHOR)}. All rights reserved.</p>
<p>No part of this book may be reproduced without written permission of the author, except for brief quotations in reviews.</p>
<p>This book contains facts about weather and natural phenomena drawn from published sources. It is for general interest and is not a safety manual. Never approach severe weather for photography.</p>
<p>First edition, 2026.</p></div>
<div class="toc"><h1>Contents</h1>{toc_rows}</div>
"""
    closing = f"""
<div class="closing"><h2>Thank You for Reading</h2>
<p>If this book made you look at the sky differently, a short review helps other curious readers find it.</p>
<p><em>About the author:</em> {html.escape(AUTHOR)} writes about science, nature, and the odd corners of the natural world. Replace this paragraph with your own bio.</p></div>
"""
    return f"<!doctype html><html><head><meta charset='utf-8'><title>{html.escape(TITLE)}</title><style>{CSS}</style></head><body>{front}{''.join(sections)}{closing}</body></html>"


def render(html_text, out_pdf):
    src = os.path.join(HERE, "book.html")
    with open(src, "w", encoding="utf-8") as fh:
        fh.write(html_text)
    subprocess.run(
        [CHROME, "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
         f"--print-to-pdf={out_pdf}", f"file://{src}"],
        check=True, stderr=subprocess.DEVNULL,
    )


def find_pages(pdf, titles):
    n = int(re.search(r"Pages:\s+(\d+)", subprocess.check_output(["pdfinfo", pdf], text=True)).group(1))
    found = {}
    for page in range(1, n + 1):
        txt = subprocess.check_output(["pdftotext", "-f", str(page), "-l", str(page), "-layout", pdf, "-"], text=True)
        head = " ".join(txt.split())[:260]
        for t in titles:
            if t not in found and head.find(t[:24]) != -1 and page > 3:
                found[t] = page
    return found, n


if __name__ == "__main__":
    out = os.path.join(HERE, "The-Sky-Is-Having-a-Breakdown.pdf")
    render(build_html(), out)
    titles = [re.match(r"# (.+)", read(f)).group(1) for f in sorted(glob.glob(os.path.join(HERE, "chapters", "*.md")))]
    pages, n = find_pages(out, titles)
    render(build_html(pages), out)
    print("pages:", n, "toc entries located:", len(pages), "of", len(titles))
