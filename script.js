const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const borderSlider = document.getElementById('borderSize');
const toggleBgBtn = document.getElementById('toggleBg');
const toggleShapeBtn = document.getElementById('toggleShape');

const logo = new Image();
logo.src = 'logo.jpeg';

let uploadedImg = null;
let borderSize = parseInt(borderSlider.value);
let shape = 'square'; // or 'circle'

upload.addEventListener('change', function () {
  const file = upload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    uploadedImg = new Image();
    uploadedImg.onload = () => drawImageWithBorder();
    uploadedImg.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

borderSlider.addEventListener('input', function () {
  borderSize = parseInt(borderSlider.value);
  if (uploadedImg) drawImageWithBorder();
});

toggleBgBtn.addEventListener('click', function () {
  document.body.classList.toggle('static-bg');
});

toggleShapeBtn.addEventListener('click', function () {
  shape = shape === 'square' ? 'circle' : 'square';
  if (uploadedImg) drawImageWithBorder();
});

function drawImageWithBorder() {
  const logoSize = borderSize * 0.75;
  const totalSize = borderSize * 2;

  canvas.width = uploadedImg.width + totalSize;
  canvas.height = uploadedImg.height + totalSize;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(uploadedImg, borderSize, borderSize);

  if (!logo.complete) {
    logo.onload = () => drawLogoBorder(logoSize);
  } else {
    drawLogoBorder(logoSize);
  }
}

function drawLogoBorder(size) {
  if (shape === 'square') {
    drawSquareBorder(size);
  } else {
    drawCircleBorder(size);
  }
}

function drawSquareBorder(size) {
  const cols = Math.floor((canvas.width - size) / size);
  const rows = Math.floor((canvas.height - size) / size);

  for (let x = 0; x < cols; x++) {
    ctx.drawImage(logo, x * size, 0, size, size); // top
    ctx.drawImage(logo, x * size, canvas.height - size, size, size); // bottom
  }
  for (let y = 0; y < rows; y++) {
    ctx.drawImage(logo, 0, y * size, size, size); // left
    ctx.drawImage(logo, canvas.width - size, y * size, size, size); // right
  }
}

function drawCircleBorder(size) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) / 2 - size;

  const count = 40; // how many logos around the circle

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = centerX + radius * Math.cos(angle) - size / 2;
    const y = centerY + radius * Math.sin(angle) - size / 2;
    ctx.drawImage(logo, x, y, size, size);
  }
}

downloadBtn.addEventListener('click', function () {
  const link = document.createElement('a');
  link.download = 'union-bordered-image.png';
  link.href = canvas.toDataURL();
  link.click();
});
