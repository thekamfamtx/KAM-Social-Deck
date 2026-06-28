let index = 0;
let keys = [];

document.addEventListener("DOMContentLoaded", () => {
  keys = Object.keys(CONFIG.links);

  renderAll();
  generateQR(getCurrent());

  if (CONFIG.display.rotate) {
    setInterval(() => {
      index = (index + 1) % keys.length;
      renderAll();
      generateQR(getCurrent());
    }, CONFIG.display.rotationSpeed);
  }
});

// ------------------
// CURRENT LINK
// ------------------
function getCurrent() {
  return CONFIG.links[keys[index]];
}

// ------------------
// RENDER TEXT UI
// ------------------
function renderAll() {
  const brand = document.getElementById("brandName");
  const member = document.getElementById("memberTag");
  const label = document.getElementById("qrLabel");

  if (brand) brand.textContent = CONFIG.brand.name;
  if (member) member.textContent = CONFIG.brand.memberTag;

  if (label) {
    // cleaner display labels (no underscores)
    const pretty = keys[index].replaceAll("_", " ");
    label.textContent = pretty;
  }
}

// ------------------
// QR CODE GENERATION
// ------------------
function generateQR(url) {
  const container = document.getElementById("qrcode");
  if (!container) return;

  container.innerHTML = "";

  new QRCode(container, {
    text: url,
    width: CONFIG.qr.size,
    height: CONFIG.qr.size,
    colorDark: "#ffffff",
    colorLight: "transparent",
    correctLevel: QRCode.CorrectLevel.H
  });
}
