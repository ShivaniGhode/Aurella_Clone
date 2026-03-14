/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded", () => {
  revealOnScroll();
  updateCart();
  loadWishlist();

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form submitted successfully!");
    });
  });
});

/* ================= CART ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const item = cart.find((i) => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: 1,
    });
  }

  saveCart();
  updateCart();

  alert(name + " added to cart");
}

function removeItem(index) {
  cart.splice(index, 1);

  saveCart();
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");

  let total = 0;
  let count = 0;

  if (cartItems) {
    cartItems.innerHTML = "";
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    if (cartItems) {
      const li = document.createElement("li");

      li.innerHTML = `
      <span>${item.name} × ${item.qty}</span>
      <span>
      ₹${item.price * item.qty}
      <button onclick="removeItem(${index})"
      style="margin-left:8px;border:none;background:none;color:red;cursor:pointer;">
      ✕
      </button>
      </span>
      `;

      cartItems.appendChild(li);
    }
  });

  if (totalEl) {
    totalEl.textContent = total;
  }

  if (cartCount) {
    cartCount.textContent = count;
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you for shopping with Aurella ✨");

  cart = [];

  saveCart();
  updateCart();
}

/* ================= NAV MENU ================= */

function toggleMenu() {
  const nav = document.getElementById("navLinks");

  if (!nav) return;

  if (nav.style.display === "block") {
    nav.style.display = "none";
  } else {
    nav.style.display = "block";
  }
}

/* ================= SCROLL ANIMATION ================= */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 120) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

/* ================= PRODUCT SEARCH ================= */

function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();

  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const name = product.querySelector("h3").innerText.toLowerCase();

    if (name.includes(input)) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }
  });
}

/* ================= FILTER ================= */

function filterProducts() {
  let category = document.getElementById("categoryFilter").value;

  let price = document.getElementById("priceFilter").value;

  let products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    let productCategory = product.getAttribute("data-category");
    let productPrice = parseInt(product.getAttribute("data-price"));

    let show = true;

    if (category !== "all" && category !== productCategory) {
      show = false;
    }

    if (price !== "all" && productPrice > parseInt(price)) {
      show = false;
    }

    product.style.display = show ? "" : "none";
  });
}

/* ================= WISHLIST ================= */

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(el) {
  const product = el.closest(".product-card");
  const name = product.querySelector("h3").innerText;

  if (wishlist.includes(name)) {
    wishlist = wishlist.filter((item) => item !== name);

    el.classList.remove("active");
  } else {
    wishlist.push(name);

    el.classList.add("active");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function loadWishlist() {
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const name = product.querySelector("h3").innerText;
    const heart = product.querySelector(".wishlist");

    if (wishlist.includes(name)) {
      heart.classList.add("active");
    }
  });
}

/* ================= PRODUCT DETAIL IMAGE ================= */

function changeProductImage(el) {
  const main = document.getElementById("mainImage");

  if (main) {
    main.src = el.src;
  }
}
