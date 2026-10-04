const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const DATA_DIR = path.join(__dirname, "data");
const OUTPUT_FILE = path.join(__dirname, "vector-store.json");
const MODEL = "text-embedding-3-small";
const CHUNK_SIZE = 1000;
const BATCH_SIZE = 64;

function chunkText(text, source) {
  const paragraphs = text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  const chunks = [];
  let current = "";

  for (const paragraph of paragraphs) {
    // Split very long paragraphs too, so a single source line cannot exceed the chunk limit.
    for (let offset = 0; offset < paragraph.length; offset += CHUNK_SIZE) {
      const part = paragraph.slice(offset, offset + CHUNK_SIZE);
      if (current && current.length + part.length + 2 > CHUNK_SIZE) {
        chunks.push({ text: current, source });
        current = "";
      }
      current += `${current ? "\n\n" : ""}${part}`;
    }
  }
  if (current) chunks.push({ text: current, source });
  return chunks;
}

async function embedBatch(chunks) {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: chunks.map((chunk) => chunk.text), model: MODEL }),
    signal: AbortSignal.timeout(60000),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || `Embedding request failed (${response.status})`);
  }
  if (!Array.isArray(data.data) || data.data.length !== chunks.length) {
    throw new Error("OpenAI returned an incomplete embedding batch");
  }
  return data.data
    .sort((left, right) => left.index - right.index)
    .map((item, index) => ({ ...chunks[index], embedding: item.embedding }));
}

async function embedAllData() {
  if (!process.env.OPENAI_API_KEY) throw new Error("Set OPENAI_API_KEY in .env before generating embeddings.");

  const files = fs.readdirSync(DATA_DIR)
    .filter((file) => /\.(md|txt)$/i.test(file))
    .sort();
  const chunks = files.flatMap((file) => {
    const content = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    return content.trim() ? chunkText(content, file) : [];
  });
  if (!chunks.length) throw new Error("No non-empty .md or .txt files were found in data/.");

  console.log(`Creating embeddings for ${chunks.length} text chunks...`);
  const embeddedChunks = [];
  for (let offset = 0; offset < chunks.length; offset += BATCH_SIZE) {
    const batch = await embedBatch(chunks.slice(offset, offset + BATCH_SIZE));
    embeddedChunks.push(...batch);
    console.log(`Embedded ${embeddedChunks.length}/${chunks.length} chunks`);
  }

  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(embeddedChunks)}\n`, "utf8");
  console.log(`Saved ${embeddedChunks.length} chunks to vector-store.json`);
}

embedAllData().catch((error) => {
  console.error(`Embedding generation failed: ${error.message}`);
  process.exitCode = 1;
});
