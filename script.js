const btn = document.getElementById('helloBtn');
const message = document.getElementById('message');

btn.addEventListener('click', () => {
  message.textContent = 'تم الضغط على الزر بنجاح!';
});
