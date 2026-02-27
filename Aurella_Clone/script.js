/*  PAGE LOAD  */
document.addEventListener("DOMContentLoaded", () => {
  /* FORM SUBMIT (Demo) */
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form submitted successfully!");
    });
  });

  revealOnScroll();
  updateCart();
});

/*  CART  */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const item = cart.find((i) => i.name === name);
  if (item) item.qty++;
  else cart.push({ name, price, qty: 1 });

  saveCart();
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (!cartItems || !totalEl) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} × ${item.qty}</span>
      <span>₹${item.price * item.qty}
        <button onclick="removeItem(${index})"
        style="margin-left:8px;border:none;background:none;color:red;cursor:pointer;">✕</button>
      </span>
    `;
    cartItems.appendChild(li);
  });

  totalEl.textContent = total;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function checkout() {
  if (cart.length === 0) return alert("Your cart is empty!");
  alert("Thank you for shopping with Aurella ✨");
  cart = [];
  saveCart();
  updateCart();
}

/*  NAV MENU  */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;
  nav.style.display = nav.style.display === "block" ? "none" : "block";
}

/*  SCROLL REVEAL */
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/*  SEARCH  */
function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const name = product.dataset.name || "";
    product.style.display = name.includes(input) ? "block" : "none";
  });
}

/*  IMAGE CHANGE */
function changeImage(imgId, newSrc) {
  const img = document.getElementById(imgId);
  if (img) img.src = newSrc;
}

/*  VARIANT IMAGE + PRICE  */
function changeVariant(imgId, price, priceId, imgPath) {
  const img = document.getElementById(imgId);
  const priceEl = document.getElementById(priceId);

  if (img) img.src = imgPath;
  if (priceEl) priceEl.innerText = "₹" + price;
}

/*  SIZE SELECT  */
function selectSize(el) {
  const sizes = el.parentElement.querySelectorAll(".size");
  sizes.forEach((s) => s.classList.remove("active"));

  el.classList.add("active");

  const display = el.parentElement.nextElementSibling;
  if (display) display.querySelector("b").innerText = el.innerText;
}

/* WISHLIST  */
function toggleWishlist(el) {
  el.classList.toggle("active");
}
