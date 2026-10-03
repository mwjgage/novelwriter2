// Builds The-Sky-Is-Having-a-Breakdown.docx from the chapter markdown files.
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak,
  Header, Footer, PageNumber, TableOfContents, LevelFormat, TabStopType,
} = require("docx");

const TITLE = "The Sky Is Having a Breakdown";
const SUBTITLE = "400+ True Stories of Fire Tornadoes, Raining Fish, Cloud Monsters, and the Strangest Weather Ever Caught on Camera";
const AUTHOR = "[Author Name]";
const FONT = "Georgia";
const BODY = 23; // 11.5pt

const dir = path.join(__dirname, "chapters");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort();

// Inline **bold** and *italic* to TextRuns.
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const tok = m[0];
    if (tok.startsWith("**")) out.push(new TextRun({ text: tok.slice(2, -2), bold: true, ...base }));
    else out.push(new TextRun({ text: tok.slice(1, -1), italics: true, ...base }));
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}

const body = [];

// Title page
body.push(new Paragraph({ spacing: { before: 2600 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: TITLE.toUpperCase(), bold: true, size: 64, font: FONT })] }));
body.push(new Paragraph({ spacing: { before: 400, after: 1200 }, alignment: AlignmentType.CENTER,
  indent: { left: 400, right: 400 },
  children: [new TextRun({ text: SUBTITLE, italics: true, size: 26, font: FONT })] }));
body.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: AUTHOR, size: 26, font: FONT })] }));

// Copyright page
body.push(new Paragraph({ pageBreakBefore: true, spacing: { before: 6200, after: 120 },
  children: [new TextRun({ text: `Copyright © 2026 ${AUTHOR}. All rights reserved.`, size: 19, font: FONT })] }));
for (const t of [
  "No part of this book may be reproduced without written permission of the author, except for brief quotations in reviews.",
  "This book contains facts about weather and natural phenomena drawn from published sources. It is for general interest and is not a safety manual. Never approach severe weather for photography.",
  "First edition, 2026.",
]) body.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: t, size: 19, font: FONT })] }));

// Contents
body.push(new Paragraph({ pageBreakBefore: true, spacing: { after: 240 },
  children: [new TextRun({ text: "Contents", bold: true, size: 38, font: FONT })] }));
body.push(new TableOfContents("Contents", { hyperlink: true, headingStyleRange: "1-1" }));

// Chapters
files.forEach((file, idx) => {
  const lines = fs.readFileSync(path.join(dir, file), "utf8").split("\n");
  let para = [];
  const flush = () => {
    if (para.length) {
      body.push(new Paragraph({ spacing: { after: 140, line: 330 }, children: runs(para.join(" ")) }));
      para = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    let m;
    if ((m = line.match(/^# (.+)/))) {
      flush();
      body.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun({ text: m[1] })] }));
    } else if ((m = line.match(/^## (.+)/))) {
      flush();
      body.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: m[1] })] }));
    } else if ((m = line.match(/^\d+\. (.+)/))) {
      flush();
      body.push(new Paragraph({ numbering: { reference: "facts", level: 0, instance: idx },
        spacing: { after: 160, line: 330 }, keepLines: true, children: runs(m[1]) }));
    } else if ((m = line.match(/^- (.+)/))) {
      flush();
      body.push(new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80, line: 330 }, children: runs(m[1]) }));
    } else if (line.trim() === "") {
      flush();
    } else {
      para.push(line.trim());
    }
  }
  flush();
});

// Closing page
body.push(new Paragraph({ pageBreakBefore: true, alignment: AlignmentType.CENTER, spacing: { before: 3200, after: 200 },
  children: [new TextRun({ text: "Thank You for Reading", bold: true, size: 32, font: FONT })] }));
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 },
  children: [new TextRun({ text: "If this book made you look at the sky differently, a short review helps other curious readers find it." })] }));
body.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "About the author: ", italics: true }),
    new TextRun({ text: `${AUTHOR} writes about science, nature, and the odd corners of the natural world. Replace this paragraph with your own bio.` })] }));

const numberingConfigs = files.map(() => ({
  level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
  style: { paragraph: { indent: { left: 540, hanging: 400 } } },
}));

const doc = new Document({
  creator: AUTHOR,
  title: TITLE,
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: FONT, size: BODY } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 40, bold: true, font: FONT }, paragraph: { spacing: { before: 0, after: 360 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: FONT }, paragraph: { spacing: { before: 320, after: 140 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "facts", levels: numberingConfigs.slice(0, 1) },
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 540, hanging: 280 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 8640, height: 12960 }, margin: { top: 1300, bottom: 1300, left: 1100, right: 1100 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "THE SKY IS HAVING A BREAKDOWN", size: 15, color: "666666", characterSpacing: 40 })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: [PageNumber.CURRENT], size: 18 })] })] }) },
    children: body,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  const out = path.join(__dirname, "The-Sky-Is-Having-a-Breakdown.docx");
  fs.writeFileSync(out, buf);
  console.log("wrote", out, buf.length, "bytes");
});
