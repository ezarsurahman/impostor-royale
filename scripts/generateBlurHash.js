/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { encode } = require('blurhash');

const cardsDir = path.join(__dirname, '../public/images/cards');
const outputFile = path.join(__dirname, '../data/blurHashes.json');

async function generateBlurHash(imagePath) {
  const image = sharp(imagePath);
  const { data, info } = await image
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const blurHash = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4
  );

  return blurHash;
}

async function processAllImages() {
  const files = fs.readdirSync(cardsDir);
  const blurHashes = {};

  for (const file of files) {
    if (file.endsWith('.webp') || file.endsWith('.png') || file.endsWith('.jpg')) {
      const cardName = file.replace(/\.(webp|png|jpg)$/, '');
      const imagePath = path.join(cardsDir, file);
      
      try {
        console.log(`Processing ${cardName}...`);
        const blurHash = await generateBlurHash(imagePath);
        blurHashes[cardName] = blurHash;
      } catch (error) {
        console.error(`Error processing ${cardName}:`, error);
      }
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(blurHashes, null, 2));
  console.log(`\n✅ Generated ${Object.keys(blurHashes).length} blur hashes`);
  console.log(`📁 Saved to: ${outputFile}`);
}

processAllImages();