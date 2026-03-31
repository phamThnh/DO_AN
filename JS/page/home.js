//Đây là trang giao diện của trang chủ

function loadRandomProduct(dataList, containerId) { //lấy vài sản phẩm từ danh sách sản phẩm theo id
  const container = document.getElementById(containerId);
  const template = document.getElementById("product");

  if (!container || !template) return;
  container.innerHTML = "";

  dataList.forEach((item) => {
    const clone = template.content.cloneNode(true);

    item.currentPrice = calculatePrice(item.oldPrice, item.salePercent);

    clone.querySelector(".imgproduct img").src = item.image;
    clone.querySelector(".imgproduct img").alt = item.title;
    clone.querySelector(".book-title").textContent = item.title;
    clone.querySelector(".book-author").textContent = `By ${item.author}`;
    clone.querySelector(".old-price").textContent = format.formatCurrency(item.oldPrice);
    clone.querySelector(".sale").value = `-${Math.round(item.salePercent * 100)}%`;
    clone.querySelector(".current-price").textContent = format.formatCurrency(item.currentPrice);

    const btnAdd = clone.querySelector(".add_shopping");

    btnAdd.addEventListener("click", () => { // thêm sự kiện click vào nút "thêm vào giỏ hàng"
      if (validator.checkLogin()) { //kiểm tra nếu đã đăng nhập rồi thì có thể bấm
        const product = { //tạo đối tượng sản phẩm chứa các sản phẩm
          id: item.id,
          title: item.title,
          image: item.image,
          oldPrice: item.oldPrice,
          salePercent: item.salePercent,
          author: item.author,
          currentPrice: item.currentPrice,
        };

        addToCart(product); /// thêm sản phẩm vào giỏ hàng
      }
      else {
        alert("Vui lòng đăng nhập!!");
        window.location.href="/login/login.html";
      }
    });
    container.appendChild(clone);
  });
}
// hàm tính giá hiện tại
function calculatePrice(oldPrice, salePercent) {
  return Math.round(oldPrice - oldPrice * salePercent);
}

// trang chủ
async function initHome() {
  const featured = await getFeaturedProducts(12);

  //tạo 4 sản phẩm random đặt vào 3 id 
  loadRandomProduct(featured.slice(0, 4), "product-list1"); 
  loadRandomProduct(featured.slice(4, 8), "product-list2");
  loadRandomProduct(featured.slice(8, 12), "product-list3");
}

initHome();