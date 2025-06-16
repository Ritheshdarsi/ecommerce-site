<!-- script.js -->
const products = [
  { id: 1, name: 'Shirt', price: 20, category: 'clothing' },
  { id: 2, name: 'Jeans', price: 40, category: 'clothing' },
  { id: 3, name: 'Shoes', price: 60, category: 'footwear' },
];

const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');

function displayProducts(filteredProducts) {
  if (!productList) return;
  productList.innerHTML = filteredProducts.map(p => `
    <div class="product">
      <h3>${p.name}</h3>
      <p>Price: $${p.price}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    </div>
  `).join('');
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const filtered = products.filter(p => 
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchTerm)
  );
  displayProducts(filtered);
}

if (searchInput && categoryFilter) {
  searchInput.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
  displayProducts(products);
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart');
}
