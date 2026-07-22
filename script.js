document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("disclaimer-modal");
  const acceptBtn = document.getElementById("accept-btn");
  const wipeBtn = document.getElementById("wipe-btn");
  const navForm = document.getElementById("nav-form");
  const addressBar = document.getElementById("address-bar");
  const viewport = document.getElementById("web-viewport");

  // --- 1. قبول إخلاء المسؤولية ---
  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // --- 2. معالجة البحث والتحويل بشكل صحيح ---
  if (navForm) {
    navForm.addEventListener("submit", (e) => {
      e.preventDefault(); // منع إعادة تحميل الصفحة
      e.stopPropagation();

      let input = addressBar.value.trim();
      if (!input) return;

      // إضافة https:// تلقائياً إذا لم تكن موجودة
      let targetUrl = input;
      if (!/^https?:\/\//i.test(input)) {
        targetUrl = "https://" + input;
      }

      addressBar.value = targetUrl;

      // لاستعراض المواقع التي تمنع الـ iframe (مثل Google) نستخدم بروكسي خفيف للعرض
      // إذا كان الرابط هو جوجل أو يوتيوب أو فيسبوك، نمرره عبر الخدمة لفتح الحظر:
      if (targetUrl.includes("google.com") || targetUrl.includes("facebook.com") || targetUrl.includes("x.com")) {
        viewport.src = "https://api.allorigins.win/raw?url=" + encodeURIComponent(targetUrl);
      } else {
        viewport.src = targetUrl;
      }
    });
  }

  // --- 3. مسح الجلسة وتفريغ البيانات ---
  function purgeSession() {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error("خطأ أثناء مسح الذاكرة:", e);
    }

    // مسح الكوكيز
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    // إعادة ضبط الشاشة والشريط
    if (viewport) viewport.src = "about:blank";
    if (addressBar) addressBar.value = "";
  }

  // زر مسح الجلسة اليدوي
  if (wipeBtn) {
    wipeBtn.addEventListener("click", () => {
      purgeSession();
      alert("تم مسح جميع بيانات الجلسة بنجاح!");
    });
  }

  // التنظيف التلقائي عند إغلاق أو تحديث التطبيق
  window.addEventListener("beforeunload", purgeSession);
  window.addEventListener("pagehide", purgeSession);
});
