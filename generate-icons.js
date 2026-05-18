const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generateIcon(size, outPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  const bg = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  bg.addColorStop(0, '#0a3d1f');
  bg.addColorStop(1, '#0d1117');
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.18);
  ctx.fill();

  // Water drop icon
  const cx = size / 2;
  const cy = size * 0.52;
  const r  = size * 0.28;

  ctx.fillStyle = '#00c96b';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Drop tip
  ctx.beginPath();
  ctx.moveTo(cx, cy - r * 1.5);
  ctx.quadraticCurveTo(cx - r, cy - r * 0.3, cx - r, cy);
  ctx.quadraticCurveTo(cx - r, cy + r * 0.5, cx, cy + r);
  ctx.quadraticCurveTo(cx + r, cy + r * 0.5, cx + r, cy);
  ctx.quadraticCurveTo(cx + r, cy - r * 0.3, cx, cy - r * 1.5);
  ctx.fillStyle = '#00c96b';
  ctx.fill();

  // Shine
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.25, cy - r * 0.3, r * 0.18, r * 0.28, -0.5, 0, Math.PI * 2);
  ctx.fill();

  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log('Generated:', outPath);
}

const iconsDir = path.join(__dirname, 'icons');
generateIcon(192, path.join(iconsDir, 'icon-192.png'));
generateIcon(512, path.join(iconsDir, 'icon-512.png'));
