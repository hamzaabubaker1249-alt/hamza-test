let cart = [];
let totalPrice = 0;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    totalPrice += price;
    
    // تحديث الواجهة
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('total-price').innerText = totalPrice;

    // تجهيز بيانات الطلب لإرسالها في الإيميل
    let orderDetails = cart.map(item => item.name).join(" + ");
    orderDetails += ` | الإجمالي: ${totalPrice} د.ل`;
    document.getElementById('order-details').value = orderDetails;
    
    alert(`تمت إضافة ${productName} إلى السلة!`);
}
