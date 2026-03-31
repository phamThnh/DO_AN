//hiển thị sản phẩm lên giỏ hàng
const template = document.getElementById("cart-item"); //Lấy mẫu từ template có id cart-item
const cart = JSON.parse(localStorage.getItem("cartItems")) || []; //lấy giỏ hàng từ localStorage
const cart_list = document.getElementById("cart-list"); // lấy phần tử tại vị trí có id cart-list
const info = document.getElementById("info"); //lấy phần tử tại vị trí thông tin thanh toán
if (cart.length === 0) {
  //giỏ hàng rỗng thì tạo một khối div mới và hiển thị nó lên màn hình
  info.style.display = "none";
  const emptyDiv = document.createElement("div");
  emptyDiv.className = "cart-empty";

  emptyDiv.innerHTML = `
  <div class="empty-cart-box">
    <h2>Giỏ hàng của bạn đang trống</h2>
    
    <a href="/sanpham/sanpham.html">
      <button class="btn-shop">Mua sắm ngay</button>
    </a>
  </div>
`;

  cart_list.appendChild(emptyDiv);
}

cart.forEach((element, index) => {
  //duyệt từng phần tử trong cartItems

  const clone = template.content.cloneNode(true);
  const price = Math.round(
    element.oldPrice - element.oldPrice * element.salePercent,
  ); //giá hiện tại

  clone.querySelector(".cart-item__img img").src = element.image; //hình ảnh sách

  clone.querySelector(".cart-item__info h3:nth-child(1)").textContent =
    "Tên sách: " + element.title;

  clone.querySelector(".cart-item__info h3:nth-child(2)").textContent =
    "Tác giả: " + element.author;

  clone.querySelector(".cart-item__info h3:nth-child(3)").textContent =
    "Đơn giá: " + price.toLocaleString() + " đ";

  const quantity = clone.querySelector(".cart-item__quantity span");//tạo biếnmới để cóthể cậpnhật khi tăg/giảm sốlượng
  quantity.textContent = element.quantity;

  const total = clone.querySelector(".cart-item__total"); //tạo biếnmới để cóthể cập nhật khi tăg/giảm số lượng
  total.textContent = (price * element.quantity).toLocaleString() + " đ";

  //xử lí tăng giảm số lượng khi bấm nút + -
  const btn_up = clone.querySelector("#up");
  const btn_down = clone.querySelector("#down");
  btn_up.addEventListener("click", () => {
    //khi bấm +
    element.quantity = element.quantity + 1;
    quantity.textContent = element.quantity;
    total.textContent = (price * element.quantity).toLocaleString() + " đ"; //hiển thị lại số lượng sau khi bấm nút
    updateTotal(cart); //cập nhật lại tiền hàng khi tăng số lượng
    localStorage.setItem("cartItems", JSON.stringify(cart)); // Lưu lại giỏ hàng mới

    if (typeof updateCartCount === "function") {  
        updateCartCount(); //hàm toàn cục có tác dụng cập nhật số trên biểu tượng giỏ hàng
      }
  });
  btn_down.addEventListener("click", () => {
    //khi bấm -
    if (element.quantity > 1) {
      element.quantity -= 1;
      quantity.textContent = element.quantity;
      total.textContent = (price * element.quantity).toLocaleString() + " đ"; //hiển thị lại số lượng sau khi bấm nút
      updateTotal(cart); //cập nhật lại tiền hàng khi giảm số lượng
      localStorage.setItem("cartItems", JSON.stringify(cart)); // Lưu lại giỏ hàng mới

      if (typeof updateCartCount === "function") {
        updateCartCount();  //hàm toàn cục có tác dụng cập nhật số trên biểu tượng giỏ hàng
      }
    }
  });

  //xử lí khi bấm nút xóa
  const btn_remove = clone.querySelector("#remove");
  btn_remove.addEventListener("click", () => {
    cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    location.reload(); //load lại trang giỏ hàng sau khi bấm xóa

    //cập nhật lại tiền hàng khi xóa
    updateTotal(cart);
  });
  updateTotal(cart, element);
  cart_list.appendChild(clone); //đưa clone vào khối cart-list
});

// Hàm Cập nhạt tiền hàng
function updateTotal(cart) {
  // Tính tổng tiền các sản phẩm trong giỏ
  let subtotal = cart.reduce( //duyệt tất cả phần tử trong mảng và thực hiện cộng dồn
    (sum, element) =>
      sum +
      Math.round(element.oldPrice - element.oldPrice * element.salePercent) *
        element.quantity,
    0,
  );
  document.getElementById("subtotal").innerText =
    "Tổng tiền: " + subtotal.toLocaleString() + " đ";
}
//lấy các thông tin của khách hàng: sdt, địa chỉ
const user1 = JSON.parse(localStorage.getItem("currentuser"));
info.querySelector(".info h3:nth-child(2) > strong").innerText = "SĐT: " + user1.sdt;
info.querySelector(".info h3:nth-child(3) > strong").innerText = "Địa chỉ: " + user1.diachi;

//sự kiện khi bấm nút đặt hàng: Xóa toàn bộ vật phẩm trong giỏ hàng, hiện thị thông báo đặt hàng thành công
const order = document.getElementById("order");
order.addEventListener("click", () => {
  
  const success_order = document.createElement("div"); //tạo ra khối div mới
  success_order.className = "success_order"; // đặt class cho khối div vừa tạo
  success_order.innerText = "đặt hàng thành công!!"; // thêm nội dung cho khối div
  
  document.body.appendChild(success_order);

  cart.splice(0,cart.length); //xóa toàn bộ giỏ hàng từ vị trí 0 
  localStorage.setItem("cartItems", JSON.stringify(cart)); // lưu lại giỏ hàng vừa đổi

  setTimeout(() => {
    success_order.remove(); 
    location.reload();
  }, 1500); //đặt thời gian tồn tại cho khối div vừa tạo là 1500ms
  
});
