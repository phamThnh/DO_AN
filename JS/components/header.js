document.addEventListener("DOMContentLoaded", () => {
  const userData = localStorage.getItem("currentuser");

  if (userData !== null) {
    user = JSON.parse(userData);
    if (user && user.username) {
      const nav = document.querySelector(".nav");

      const loginBtn = document.querySelector('a[href*="login"]');
      const registerBtn = document.querySelector('a[href*="register"]');

      if (loginBtn) loginBtn.style.display = "none";
      if (registerBtn) registerBtn.style.display = "none";

      if (nav) {
        nav.insertAdjacentHTML(
          "beforeend",
          `
        <span class="user-greeting" style="margin-left: 15px; font-size: 20px; color: #333; padding-top:15px">
          Xin chào, <a href="/login/profile.html"><strong style="color: #c92127;">${user.username}</strong></a>
        </span>
        <a href="#" id="logout-btn">Đăng xuất</a>
      `,
        );

        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("Bạn muốn đăng xuất?")) {
              auth.logout();
            }
          });
        }
      }
    }
  }
});
window.updateCartCount = function() {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  let total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const badge = document.getElementById("cart-count");
  badge.style.cssText =
    " position: absolute; left: -4px; background-color: red;width: 30px; height: 30px; color: white; font-size: 20px; border-radius: 50%; text-align: center;";
  if (user && user.username) {
    if (badge) badge.textContent = total;
  }
}

