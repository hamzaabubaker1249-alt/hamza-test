document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("disclaimer-modal");
  const acceptBtn = document.getElementById("accept-btn");
  const wipeBtn = document.getElementById("wipe-btn");
  const navForm = document.getElementById("nav-form");
  const addressBar = document.getElementById("address-bar");
  const viewport = document.getElementById("web-viewport");

  // --- 1. Disclaimer Modal Acceptance ---
  acceptBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // --- 2. Address Bar Navigation ---
  navForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let url = addressBar.value.trim();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
      addressBar.value = url;
    }

    viewport.src = url;
  });

  // --- 3. Ephemeral Session Cleanup Handler ---
  function purgeSession() {
    // Clear Web Storage
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error("Storage clear failed:", e);
    }

    // Clear Document Cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    // Reset iframe viewport
    if (viewport) {
      viewport.src = "about:blank";
    }
    
    if (addressBar) {
      addressBar.value = "";
    }
  }

  // Manual Trigger: "Wipe Session" Button
  wipeBtn.addEventListener("click", () => {
    purgeSession();
    alert("Session data, storage, and cookies have been wiped.");
  });

  // Automatic Lifecycle Triggers: Clear storage on close / unload
  window.addEventListener("beforeunload", purgeSession);
  window.addEventListener("pagehide", purgeSession);
});
