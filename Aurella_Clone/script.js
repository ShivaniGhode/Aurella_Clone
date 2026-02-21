/*  PAGE LOAD EFFECTS  */
document.addEventListener("DOMContentLoaded", () => {
  /*  FORM SUBMIT  */
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form submitted successfully!");
    });
  });

  /*  SCROLL ANIMATION  */
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease";
  });

  window.addEventListener("scroll", () => {
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  });

  updateCart(); // load cart on refresh
});

/*  CART DATA  */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART  */
function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  updateCart();
}

/*  REMOVE ITEM  */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

/*  UPDATE CART UI  */
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
      <span>
        ₹${item.price * item.qty}
        <button onclick="removeItem(${index})"
          style="margin-left:8px;border:none;background:none;color:red;cursor:pointer;">
          ✕
        </button>
      </span>
    `;
    cartItems.appendChild(li);
  });

  totalEl.textContent = total;
}

/*  SAVE CART */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/*  CHECKOUT  */
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
