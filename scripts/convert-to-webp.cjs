/**
 * Converts large PNG/JPEG images to WebP format.
 * Skips files already under 100KB (already small enough).
 * Updates all JSX/JS import references automatically.
 * Run once: node scripts/convert-to-webp.js
 */

const sharp = require("sharp");
const fs    = require("fs");
const path  = require("path");

const ASSETS_DIR  = path.join(__dirname, "../src/assets");
const SRC_DIR     = path.join(__dirname, "../src");
const MIN_SIZE_KB = 100; // only convert files larger than this
const QUALITY     = 72;

// Collect all image files recursively
function getImages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getImages(full));
    else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) results.push(full);
  }
  return results;
}

// Replace import/require path in source files
function updateImports(oldRel, newRel) {
  const jsxFiles = [];
  function collectJSX(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) collectJSX(full);
      else if (/\.(jsx|js|ts|tsx)$/.test(entry.name)) jsxFiles.push(full);
    }
  }
  collectJSX(SRC_DIR);

  // Normalize to forward slashes, strip leading ../
  const oldName = path.basename(oldRel);
  const newName = path.basename(newRel);

  let totalReplaced = 0;
  for (const file of jsxFiles) {
    const content = fs.readFileSync(file, "utf8");
    // Match the filename (with extension) in import/require strings
    const escaped = oldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex   = new RegExp(escaped, "g");
    if (!regex.test(content)) continue;
    const updated = content.replace(new RegExp(escaped, "g"), newName);
    fs.writeFileSync(file, updated, "utf8");
    totalReplaced++;
  }
  return totalReplaced;
}

async function run() {
  const images = getImages(ASSETS_DIR);
  let converted = 0, skipped = 0;

  for (const imgPath of images) {
    const stat    = fs.statSync(imgPath);
    const sizeKB  = stat.size / 1024;
    const ext     = path.extname(imgPath).toLowerCase();
    const webpPath = imgPath.replace(/\.(png|jpg|jpeg)$/i, ".webp");

    // Skip if already a .webp or file is small
    if (ext === ".webp" || sizeKB < MIN_SIZE_KB) { skipped++; continue; }
    // Skip if webp already exists and is newer
    if (fs.existsSync(webpPath) && fs.statSync(webpPath).mtimeMs > stat.mtimeMs) { skipped++; continue; }

    try {
      await sharp(imgPath, { failOn: "none" })
        .flatten({ background: "#ffffff" }) // handle transparency → white bg
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      const newSizeKB  = fs.statSync(webpPath).size / 1024;
      const saving     = Math.round((1 - newSizeKB / sizeKB) * 100);
      const filesFixed = updateImports(imgPath, webpPath);

      console.log(`✓ ${path.basename(imgPath)} → ${path.basename(webpPath)}  ${Math.round(sizeKB)}KB → ${Math.round(newSizeKB)}KB  (−${saving}%)  [${filesFixed} file(s) updated]`);

      // Remove original to save disk space
      fs.unlinkSync(imgPath);
      converted++;
    } catch (e) {
      console.error(`✗ ${path.basename(imgPath)}: ${e.message}`);
    }
  }

  console.log(`\nDone: ${converted} converted, ${skipped} skipped.`);
}

run();
