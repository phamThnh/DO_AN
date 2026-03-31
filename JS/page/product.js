//Giao diện của trang sản phẩm

async function loadProducts() {
  const response = await fetch("/JS/data/data.json");
  const data = await response.json();

  const container = document.getElementById("product-list");
  const template = document.getElementById("product-template");

  data.forEach((item) => { // duyệt từng phần tử trong data.json
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

    btnAdd.addEventListener("click", () => { //sự kiện thêm vào giỏ hàng
      if (validator.checkLogin()) {
        const product = {
          id: item.id,
          title: item.title,
          image: item.image,
          oldPrice: item.oldPrice,
          salePercent: item.salePercent,
          author: item.author,
          currentPrice: item.currentPrice,
        };

        addToCart(product);
      }
      else {
        alert("Vui lòng đăng nhập!!");
        window.location.href="/login/login.html";
      }
    });

    container.appendChild(clone);
  });
}
//hàm tính currentPrice
function calculatePrice(oldPrice, salePercent) {
  return Math.round(oldPrice - oldPrice * salePercent);
}

loadProducts();
