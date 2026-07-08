// لا نضع المفتاح هنا، المتصفح سيطلبه منك عند أول تشغيل
let OPENAI_API_KEY = localStorage.getItem('user_api_key');

// إذا لم يكن المفتاح موجوداً في المتصفح، سيطلب منك إدخاله
async function getApiKey() {
    if (!OPENAI_API_KEY) {
        OPENAI_API_KEY = prompt("يرجى إدخال مفتاح API الخاص بك ليعمل المساعد:");
        if (OPENAI_API_KEY) {
            localStorage.setItem('user_api_key', OPENAI_API_KEY);
        }
    }
    return OPENAI_API_KEY;
}

// تعديل دالة askAI لتستخدم المفتاح الذي أدخلته أنت
async function askAI() {
    const key = await getApiKey();
    if (!key) return; // إذا لم تدخل المفتاح، لن يعمل المساعد

    const userInput = document.getElementById('userInput').value;
    const chatArea = document.getElementById('chatArea');
    
    chatArea.innerHTML += `<p><strong>أنت:</strong> ${userInput}</p>`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${key}` 
        },
        body: JSON.stringify({ 
            model: "gpt-3.5-turbo", 
            messages: [{ role: "user", content: userInput }] 
        })
    });
    
    const data = await response.json();
    chatArea.innerHTML += `<p><strong>المساعد:</strong> ${data.choices[0].message.content}</p>`;
}
