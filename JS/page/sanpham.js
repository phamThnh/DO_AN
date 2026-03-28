async function renderAll() {
  const response = await fetch("/DO_AN-main/JS/data/data.json");
  const data = await response.json();

  allProducts = data;

  const container = document.getElementById("product-list");
  const template = document.getElementById("product-template");

  container.innerHTML = "";

  data.forEach((item) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".imgproduct img").src = item.image;
    clone.querySelector(".imgproduct img").alt = item.title;
    clone.querySelector(".book-title").textContent = item.title;
    clone.querySelector(".book-author").textContent = `By ${item.author}`;
    clone.querySelector(".old-price").textContent =
      `${item.currentPrice.toLocaleString("vi-VN")}đ`;
    clone.querySelector(".salePercent").value = `${item.salePercent * 100}%`;
    clone.querySelector(".current-price").textContent =
      `${item.currentPrice.toLocaleString("vi-VN")}đ`;
    container.appendChild(clone);
  });
}

renderAll();

let allProducts = [];

// hiển thị sản phẩm ra màn hình
function displayProducts(dataList) {
  const container = document.getElementById("product-list");
  const template = document.getElementById("product-template");

  // Xóa sạch nội dung cũ trước khi hiện kết quả mới
  container.innerHTML = "";

  dataList.forEach((item) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".imgproduct img").src = item.image;
    clone.querySelector(".imgproduct img").alt = item.title;
    clone.querySelector(".book-title").textContent = item.title;
    clone.querySelector(".book-author").textContent = `By ${item.author}`;
    clone.querySelector(".old-price").textContent =
      `${item.oldPrice.toLocaleString("vi-VN")}đ`;
    const saleElem = clone.querySelector(".salePercent");
    if (saleElem.tagName === "INPUT")
      saleElem.value = `${item.salePercent * 100}%`;
    else saleElem.textContent = item.salePercent;

    clone.querySelector(".current-price").textContent =
      `${item.currentPrice.toLocaleString("vi-VN")}đ`;

    container.appendChild(clone);
  });
}

// xử lý tìm kiếm
function handleSearch() {
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");

  searchButton.onclick = () => {
    const keyword = searchInput.value.toLowerCase().trim();

    // Lọc dựa trên allProducts
    const filteredResults = allProducts.filter((book) =>
      book.title.toLowerCase().includes(keyword),
    );

    displayProducts(filteredResults);
  };

  searchInput.onkeyup = (e) => {
    if (e.key === "Enter") {
      searchButton.click();
    }
  };
}

// Trang trả về kết quả tìm kiếm
async function init() {
  const response = await fetch("/DO_AN-main/JS/data/data.json");
  allProducts = await response.json();
  displayProducts(allProducts);
  handleSearch();
}

init();
