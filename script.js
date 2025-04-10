const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

// Load the logo
const logo = new Image();
logo.src = 'logo.jpeg'; // Ensure this file is in the same folder as index.html

let uploadedImg = null;

upload.addEventListener('change', function () {
  const file = upload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    uploadedImg = new Image();
    uploadedImg.onload = drawEverything;
    uploadedImg.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function drawEverything() {
  canvas.width = uploadedImg.width;
  canvas.height = uploadedImg.height;

  // Draw the original image in color
  ctx.drawImage(uploadedImg, 0, 0);

  // Wait until logo is fully loaded
  if (!logo.complete) {
    logo.onload = drawOverlay;
  } else {
    drawOverlay();
  }
}

function drawOverlay() {
  const tagHeight = canvas.height * 0.1;
  const padding = 20;

  // Resize logo
  const logoHeight = tagHeight * 0.8;
  const logoWidth = logo.width * (logoHeight / logo.height);

  const text = "UNION ARMY";
  ctx.font = `${Math.floor(tagHeight * 0.6)}px Impact`;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;

  const textWidth = ctx.measureText(text).width;

  const totalWidth = logoWidth + 10 + textWidth;
  const xStart = (canvas.width - totalWidth) / 2;
  const yBottom = canvas.height - padding;

  // Draw logo
  ctx.drawImage(logo, xStart, yBottom - logoHeight, logoWidth, logoHeight);

  // Draw text beside logo
  const textX = xStart + logoWidth + 10;
  const textY = yBottom - logoHeight / 2 + 10;
  ctx.strokeText(text, textX, textY);
  ctx.fillText(text, textX, textY);
}

downloadBtn.addEventListener('click', function () {
  const link = document.createElement('a');
  link.download = 'union-army-profile.png';
  link.href = canvas.toDataURL();
  link.click();
});
