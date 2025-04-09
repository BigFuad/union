const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

// Load the logo image
const logo = new Image();
logo.src = './logo.jpeg'; // Make sure the file is saved in your project as "logo.jpeg"

upload.addEventListener('change', function () {
  const file = upload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image in black & white
      ctx.drawImage(img, 0, 0);
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        let gray = data[i]*0.3 + data[i+1]*0.59 + data[i+2]*0.11;
        data[i] = data[i+1] = data[i+2] = gray;
      }
      ctx.putImageData(imageData, 0, 0);

      logo.onload = () => {
        const tagHeight = canvas.height * 0.1;
        const padding = 20;

        // Logo size
        const logoHeight = tagHeight * 0.8;
        const logoWidth = logo.width * (logoHeight / logo.height);

        // Text settings
        const text = "UNION ARMY";
        ctx.font = `${Math.floor(tagHeight * 0.6)}px Impact`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;

        const textWidth = ctx.measureText(text).width;

        const totalTagWidth = logoWidth + 10 + textWidth;
        const xStart = (canvas.width - totalTagWidth) / 2;
        const yBottom = canvas.height - padding;

        // Draw logo
        ctx.drawImage(logo, xStart, yBottom - logoHeight, logoWidth, logoHeight);

        // Draw text
        const textX = xStart + logoWidth + 10;
        const textY = yBottom - logoHeight / 2 + 10;
        ctx.strokeText(text, textX, textY);
        ctx.fillText(text, textX, textY);
      };
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', function () {
  const link = document.createElement('a');
  link.download = 'union-army-profile.png';
  link.href = canvas.toDataURL();
  link.click();
});
