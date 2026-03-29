function loadRandomProduct(dataList, containerId) {
  const container = document.getElementById(containerId);
  const template = document.getElementById("product");

  if (!container || !template) return;
  container.innerHTML = "";

  dataList.forEach((item) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".imgproduct img").src = item.image;
    clone.querySelector(".book-title").textContent = item.title;
    clone.querySelector(".old-price").textContent =
      `${item.oldPrice.toLocaleString()}đ`;
    clone.querySelector(".current-price").textContent =
      `${item.currentPrice.toLocaleString()}đ`;

    const saleBtn = clone.querySelector(".sale");
    if (saleBtn) {
      saleBtn.value =
        typeof item.salePercent === "number"
          ? `-${item.salePercent * 100}%`
          : item.salePercent;
    }

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

  loadRandomProduct(featured.slice(0, 4), "product-list1");
  loadRandomProduct(featured.slice(4, 8), "product-list2");
  loadRandomProduct(featured.slice(8, 12), "product-list3");
}

initHome();
