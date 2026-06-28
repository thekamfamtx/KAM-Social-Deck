// ===============================
// KAM FAM SOCIAL QR CONFIG
// ===============================

const CONFIG = {
  brand: {
    name: "KAM Fam",
    memberName: "KAM Klub Member",
    themeColor: "#ff2bd6", // neon pink
    textColor: "#ffffff",
    accentOutline: "#ff2bd6"
  },

  qr: {
    size: 140, // px
    cornerPosition: "bottom-right", // top-left, top-right, bottom-left, bottom-right
    padding: 20,
    borderRadius: 12,
    background: "rgba(0,0,0,0.65)"
  },

  links: {
    youtube: "https://youtube.com/@YOURCHANNEL",
    facebook: "https://facebook.com/YOURPAGE",
    instagram: "https://instagram.com/YOURHANDLE",
    merch: "https://YOURSTORE.fourthwall.com",
    membership: "https://youtube.com/@YOURCHANNEL/join"
  },

  display: {
    showQRCode: true,
    showBranding: true,
    showMemberTag: true,
    rotateLinks: false,     // if true cycles QR targets
    rotationSpeed: 8000,    // ms
    animationStyle: "pulse" // pulse, fade, none
  },

  overlay: {
    opacity: 0.95,
    blur: 6,
    borderGlow: true,
    shadow: true
  },

  memberMessage: {
    enabled: true,
    text: "Thanks for becoming a KAM Klub Member!",
    subText: "Welcome to the crew 💥"
  }
};
