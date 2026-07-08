// 1. قاعدة البيانات الأساسية المتخصصة
const baseDatabase = [
    {
        title: "مستودعات Arch Linux المتقدمة",
        desc: "أدوات متخصصة في تعديل نواة لينكس، إدارة ملفات الـ Swap، وتحسين الـ swappiness.",
        url: "archlinuxkernel9x...onion",
        keywords: ["لينكس", "arch", "linux", "نواة", "swap", "نظام"]
    },
    {
        title: "منصة تعديل أجهزة الألعاب (Console Mods)",
        desc: "أحدث ثغرات وأدوات HEN لأجهزة PS3 وملفات GoldHEN المحدثة لأجهزة PS4.",
        url: "ps3ps4henmods2...onion",
        keywords: ["ps3", "ps4", "hen", "goldhen", "تعديل", "جلبريك", "العاب"]
    },
    {
        title: "مستودع نماذج الذكاء الاصطناعي المحلية",
        desc: "تحميل نماذج Llama و DeepSeek للتشغيل المحلي عبر خوادم Ollama للمساعدة في البرمجة.",
        url: "localaiollama7...onion",
        keywords: ["ai", "ollama", "deepseek", "llama", "ذكاء اصطناعي", "برمجة"]
    },
    {
        title: "مكتبة برمجة بوتات تيليجرام",
        desc: "أكواد جاهزة وشروحات للتعامل مع Telegram API وتنسيقات JSON المتقدمة.",
        url: "telegrambotjson...onion",
        keywords: ["بوت", "تيليجرام", "json", "برمجة", "api", "كود"]
    },
    {
        title: "أرشيف ملفات التطبيقات (IPA Sideload)",
        desc: "مكتبة ضخمة لتطبيقات النظام المعدلة وملفات IPA للتثبيت الخارجي لأجهزة الهاتف.",
        url: "iosipajailbrk5...onion",
        keywords: ["ios", "ipa", "sideload", "جلبريك", "تطبيقات", "هواتف"]
    },
    {
        title: "سيرفرات ومودات الألعاب السحابية",
        desc: "قوائم تعديل (Mod Menus) لـ Geometry Dash، وأدوات استضافة سيرفرات GTA San Andreas Online.",
        url: "gamemodserver8...onion",
        keywords: ["العاب", "gta", "geometry dash", "مودات", "مود", "سان اندرياس"]
    },
    {
        title: "موسوعة صيانة الهاردوير",
        desc: "مخططات تفصيلية لإصلاح اللوحات الأم (Motherboards) التي تعاني من التماس كهربائي (Short) وصيانة الرامات.",
        url: "hardwarerepair3...onion",
        keywords: ["هاردوير", "صيانة", "motherboard", "ram", "كمبيوتر", "تصليح"]
    },
    {
        title: "أكاديمية احتراف خدع اليويو",
        desc: "شروحات تفصيلية للميكانيكا وراء خدع اليويو المتقدمة جداً مثل DNA و Godspeed.",
        url: "yoyoprotutorial...onion",
        keywords: ["يويو", "yoyo", "dna", "godspeed", "خدع", "هوايات"]
    },
    {
        title: "منصة تعلم اللغة الفرنسية للمرحلة الإعدادية",
        desc: "مراجع ممتازة لطلاب الصف الثامن لتعلم أساسيات وقواعد اللغة الفرنسية بسهولة.",
        url: "frenchlearn8th...onion",
        keywords: ["فرنسي", "لغات", "دراسة", "تعليم", "مدرسة"]
    },
    {
        title: "منتدى تقنيات طرابلس المفتوح",
        desc: "نقاشات تقنية حول شبكات الإنترنت، البرمجيات مفتوحة المصدر، وتطوير الويب في ليبيا.",
        url: "tripolitechhub...onion",
        keywords: ["طرابلس", "تقنية", "ليبيا", "شبكات", "ويب"]
    },
    {
        title: "السوق المظلم للحيوانات النادرة",
        desc: "معلومات ومستلزمات متقدمة للحيوانات الأليفة والنادرة من جميع أنحاء العالم.",
        url: "animalstx5q6y2...onion",
        keywords: ["حيوانات", "متاجر", "متجر", "شراء", "حيوان"]
    }
];

// 2. مُولد البيانات الأسطوري (يولد 5000 رابط إضافي لتبدو القاعدة ضخمة جداً)
let massiveDatabase = [...baseDatabase];
const categories = ["حيوانات", "متاجر", "أدوات", "كتب", "برمجيات", "أمن سيبراني", "عملات رقمية", "تصميم"];

for(let i = 1; i <= 5000; i++) {
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const randomHash = Math.random().toString(36).substring(2, 10);
    
    massiveDatabase.push({
        title: `نتيجة أرشفة تلقائية #${i} - قسم ${randomCat}`,
        desc: `هذا الرابط تم توليده تلقائياً داخل قاعدة البيانات الضخمة ويحتوي على معلومات تتعلق بـ ${randomCat}.`,
        url: `hidden${randomHash}x${i}...onion`,
        keywords: [randomCat, "عشوائي", "رابط", "أرشيف"]
    });
}

// 3. محرك البحث الذكي والمحسن للأداء
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    resultsContainer.innerHTML = '';

    if (!query) {
        resultsContainer.innerHTML = '<p style="text-align:center; color:#aaa;">يرجى كتابة كلمة للبحث (جرب: لينكس، ps3، يويو، طرابلس، أو حيوانات).</p>';
        return;
    }

    // قياس سرعة البحث في الآلاف من السجلات
    const startTime = performance.now();

    // فلترة النتائج
    const results = massiveDatabase.filter(item => {
        return item.title.toLowerCase().includes(query) || 
               item.desc.toLowerCase().includes(query) ||
               item.keywords.some(kw => kw.includes(query));
    });

    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(2);

    if (results.length === 0) {
        resultsContainer.innerHTML = `<p style="text-align:center; color:#ff5252;">لم يتم العثور على نتائج مطابقة. تم البحث في ${massiveDatabase.length} سجل.</p>`;
        return;
    }

    // عرض عدد النتائج ووقت البحث (لمسة احترافية لمحركات البحث)
    const statsInfo = document.createElement('p');
    statsInfo.style.textAlign = 'center';
    statsInfo.style.color = '#81c784';
    statsInfo.style.marginBottom = '20px';
    statsInfo.innerText = `تم العثور على ${results.length} نتيجة في ${timeTaken} ملي ثانية (من إجمالي ${massiveDatabase.length} سجل).`;
    resultsContainer.appendChild(statsInfo);

    // لتجنب انهيار المتصفح، سنعرض أول 50 نتيجة فقط إذا كانت النتائج كثيرة جداً
    const maxResultsToShow = 50;
    const resultsToDisplay = results.slice(0, maxResultsToShow);

    resultsToDisplay.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <div class="onion-link">${item.url}</div>
        `;
        resultsContainer.appendChild(card);
    });

    if (results.length > maxResultsToShow) {
        const loadMoreInfo = document.createElement('p');
        loadMoreInfo.style.textAlign = 'center';
        loadMoreInfo.style.color = '#aaa';
        loadMoreInfo.style.marginTop = '15px';
        loadMoreInfo.innerText = `... تم إخفاء ${results.length - maxResultsToShow} نتيجة إضافية لتسريع العرض.`;
        resultsContainer.appendChild(loadMoreInfo);
    }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// 4. منطق زر التثبيت PWA
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`استجابة المستخدم للتثبيت: ${outcome}`);
    deferredPrompt = null;
});
