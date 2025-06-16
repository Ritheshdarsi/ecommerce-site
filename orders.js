<!-- orders.js -->
const orders = JSON.parse(localStorage.getItem('orders') || '[]');
const ordersDiv = document.getElementById('orders');
if (orders.length === 0) {
  ordersDiv.innerHTML = '<p>No orders yet.</p>';
} else {
  ordersDiv.innerHTML = orders.map((order, i) => `
    <div class="order">
      <h3>Order ${i + 1}</h3>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <ul>
        ${order.cart.map(p => `<li>${p.name} - $${p.price}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}
