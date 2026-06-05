const sharp = require("sharp");
const fs    = require("fs");
const path  = require("path");

const ASSETS_DIR = path.join(__dirname, "../src/assets");
const SRC_DIR    = path.join(__dirname, "../src");

function getAllWebp(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllWebp(full));
    else if (entry.name.endsWith(".webp")) results.push(full);
  }
  return results;
}

function revertImports(webpName, pngName) {
  const jsxFiles = [];
  function collect(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) collect(full);
      else if (/\.(jsx|js|ts|tsx)$/.test(e.name)) jsxFiles.push(full);
    }
  }
  collect(SRC_DIR);

  const escaped = webpName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let count = 0;
  for (const file of jsxFiles) {
    const content = fs.readFileSync(file, "utf8");
    if (!new RegExp(escaped).test(content)) continue;
    fs.writeFileSync(file, content.replace(new RegExp(escaped, "g"), pngName), "utf8");
    count++;
  }
  return count;
}

async function run() {
  const webpFiles = getAllWebp(ASSETS_DIR);
  let done = 0;

  for (const webpPath of webpFiles) {
    const pngPath = webpPath.replace(/\.webp$/, ".png");
    try {
      await sharp(webpPath, { failOn: "none" }).png().toFile(pngPath);
      const fixed = revertImports(path.basename(webpPath), path.basename(pngPath));
      fs.unlinkSync(webpPath);
      console.log(`✓ ${path.basename(webpPath)} → ${path.basename(pngPath)}  [${fixed} import(s) updated]`);
      done++;
    } catch (e) {
      console.error(`✗ ${path.basename(webpPath)}: ${e.message}`);
    }
  }
  console.log(`\nDone: ${done} files reverted to PNG.`);
}

run();
