function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  const index = cart.findIndex((item) => item.id === product.id); //tìm kiếm sản phẩm đã có chưa

  if (index !== -1) {
    //đã có: + số lượng
    cart[index].quantity = (cart[index].quantity || 1) + 1;
  } else {
    //chưa có: thêm vào giỏ hàng
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cartItems", JSON.stringify(cart));

  updateCartCount(); //sửa số trên giỏ hàng

  showAddToCartToast(product.title);
}

function showAddToCartToast(productName) {
  // Xóa toast cũ nếu có
  const old = document.getElementById("cart-toast");
  if (old) old.remove();

  // Tạo toast mới
  const toast = document.createElement("div");
  toast.id = "cart-toast";
  toast.innerHTML = `<i class="fa fa-check-circle"></i> Đã thêm <b>${productName}</b> vào giỏ hàng!`;
  Object.assign(toast.style, {
    position: "fixed",
    top: "60px",
    right: "30px",
    zIndex: 9999,
    background: "#59a3d4",
    color: "black",
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "bold",
    boxShadow: "0 4px 18px rgba(122, 202, 236, 0.25)",
    fontSize: "1.08rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  });
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 1500);
}

// Gọi hàm này khi trang load và sau khi thêm sản phẩm
document.addEventListener("DOMContentLoaded", updateCartCount);
