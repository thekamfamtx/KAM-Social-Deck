let index = 0;
let keys = [];

document.addEventListener("DOMContentLoaded", () => {
  keys = Object.keys(CONFIG.links);

  render();
  drawQR();

  if (CONFIG.display.rotate) {
    setInterval(() => {
      index = (index + 1) % keys.length;
      render();
      drawQR();
    }, CONFIG.display.rotationSpeed);
  }
});

function currentKey() {
  return keys[index];
}

function currentData() {
  return CONFIG.links[currentKey()];
}

function render() {
  const brand = document.getElementById("brandName");
  const sub = document.getElementById("memberTag");
  const label = document.getElementById("qrLabel");
  const overlay = document.querySelector(".overlay");

  const key = currentKey();
  const data = currentData();

  if (brand) brand.textContent = CONFIG.brand.title;
  if (sub) sub.textContent = CONFIG.brand.subtitle;

  if (label) label.textContent = key.replaceAll("_", " ");

  // apply dynamic color theme
  if (overlay) {
    overlay.style.boxShadow = `0 0 18px ${data.color}`;
    overlay.style.border = `2px solid ${data.color}`;
  }
}

function drawQR() {
  const container = document.getElementById("qrcode");
  if (!container) return;

  container.innerHTML = "";

  new QRCode(container, {
    text: currentData().url,
    width: CONFIG.qr.size,
    height: CONFIG.qr.size,
    colorDark: "#ffffff",
    colorLight: "transparent",
    correctLevel: QRCode.CorrectLevel.H
  });
}
