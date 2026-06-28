// ===============================
// KAM FAM OVERLAY SCRIPT
// ===============================

// Make sure config.js loads BEFORE this file
// and QRCode.js is included in HTML

const state = {
  currentIndex: 0,
  linkKeys: Object.keys(CONFIG.links)
};

// -------------------------------
// INIT
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  applyBranding();
  renderStaticUI();
  generateQR(getCurrentLink());

  if (CONFIG.display.rotateLinks) {
    setInterval(rotateQR, CONFIG.display.rotationSpeed);
  }
});

// -------------------------------
// APPLY BRAND COLORS / TEXT
// -------------------------------
function applyBranding() {
  document.documentElement.style.setProperty("--accent", CONFIG.brand.themeColor);
  document.documentElement.style.setProperty("--text", CONFIG.brand.textColor);
}

// -------------------------------
// STATIC UI ELEMENTS
// -------------------------------
function renderStaticUI() {
  const brandEl = document.getElementById("brandName");
  const memberEl = document.getElementById("memberTag");
  const msgEl = document.getElementById("memberMessage");
  const subMsgEl = document.getElementById("memberSubMessage");

  if (brandEl) brandEl.textContent = CONFIG.brand.name;

  if (CONFIG.display.showMemberTag && memberEl) {
    memberEl.textContent = CONFIG.brand.memberName;
  }

  if (CONFIG.memberMessage.enabled) {
    if (msgEl) msgEl.textContent = CONFIG.memberMessage.text;
    if (subMsgEl) subMsgEl.textContent = CONFIG.memberMessage.subText;
  }

  const qrWrapper = document.getElementById("qrWrapper");
  if (qrWrapper) {
    qrWrapper.style.opacity = CONFIG.overlay.opacity;
    qrWrapper.style.backdropFilter = `blur(${CONFIG.overlay.blur}px)`;
  }
}

// -------------------------------
// QR CODE GENERATION
// -------------------------------
function generateQR(url) {
  const qrContainer = document.getElementById("qrcode");
  if (!qrContainer) return;

  qrContainer.innerHTML = ""; // reset

  new QRCode(qrContainer, {
    text: url,
    width: CONFIG.qr.size,
    height: CONFIG.qr.size,
    colorDark: CONFIG.brand.textColor,
    colorLight: "transparent",
    correctLevel: QRCode.CorrectLevel.H
  });

  updateLinkLabel(url);
}

// -------------------------------
// ROTATE LINKS
// -------------------------------
function rotateQR() {
  state.currentIndex = (state.currentIndex + 1) % state.linkKeys.length;
  const key = state.linkKeys[state.currentIndex];
  generateQR(CONFIG.links[key]);
}

// -------------------------------
// GET CURRENT LINK
// -------------------------------
function getCurrentLink() {
  const key = state.linkKeys[state.currentIndex];
  return CONFIG.links[key];
}

// -------------------------------
// UPDATE LABEL TEXT
// -------------------------------
function updateLinkLabel(url) {
  const label = document.getElementById("qrLabel");
  if (!label) return;

  const match = Object.entries(CONFIG.links).find(
    ([, value]) => value === url
  );

  if (match) {
    label.textContent = match[0].toUpperCase();
  } else {
    label.textContent = "LINK";
  }
}
