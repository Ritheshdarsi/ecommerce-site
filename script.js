const products = [
  { id: 1, name: "Sneakers", price: 1200, category: "clothing" },
  { id: 2, name: "Headphones", price: 2500, category: "electronics" },
  { id: 3, name: "T-Shirt", price: 600, category: "clothing" },
  { id: 4, name: "Bluetooth Speaker", price: 1500, category: "electronics" }
];

localStorage.setItem("products", JSON.stringify(products));

const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

function renderProducts(list) {
  container.innerHTML = "";
  list.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Item added to cart!");
}

function updateCartCount() {
  const countSpan = document.getElementById("cart-count");
  if (countSpan) countSpan.innerText = cart.length;
}

function filterProducts() {
  const search = searchInput?.value.toLowerCase() || "";
  const category = categoryFilter?.value || "all";
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(search)
  );
  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }
  renderProducts(filtered);
}

searchInput?.addEventListener("input", filterProducts);
categoryFilter?.addEventListener("change", filterProducts);

renderProducts(products);
