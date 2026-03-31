// async function renderAll() {
//   const response = await fetch("/JS/data/data.json");
//   const data = await response.json();

//   allProducts = data;

//   const container = document.getElementById("product-list");
//   const template = document.getElementById("product-template");

//   container.innerHTML = "";

//   data.forEach((item) => {
//     const clone = template.content.cloneNode(true);

//     clone.querySelector(".imgproduct img").src = item.image;
//     clone.querySelector(".imgproduct img").alt = item.title;
//     clone.querySelector(".book-title").textContent = item.title;
//     clone.querySelector(".book-author").textContent = `By ${item.author}`;
//     clone.querySelector(".old-price").textContent =
//       `${item.currentPrice.toLocaleString("vi-VN")}đ`;
//     clone.querySelector(".sale").value = `${item.salePercent * 100}%`;
//     clone.querySelector(".current-price").textContent =
//       `${item.currentPrice.toLocaleString("vi-VN")}đ`;
//     container.appendChild(clone);
//   });
// }

//renderAll();


//Giao diện khi tìm kiếm sản phẩm trong trang tìm kiếm


let allProducts = [];

// hiển thị sản phẩm ra màn hình
function displayProducts(dataList) {
  const container = document.getElementById("product-list");
  const template = document.getElementById("product-template");

  // Xóa sạch nội dung cũ trước khi hiện kết quả mới
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

    btnAdd.addEventListener("click", () => { //sự kiện thêm vào giỏ hàng trong giao diện tìm kiếm
      if (validator.checkLogin()) { // kiểm tra đã đăng nhập chưa
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

// xử lý tìm kiếm
function handleSearch() {
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");

  searchButton.onclick = () => {
    const keyword = searchInput.value.toLowerCase().trim(); // lấy giá trị từ ô tìm kiếm

    // Lọc dựa trên allProducts
    const filteredResults = allProducts.filter((book) =>
      book.title.toLowerCase().includes(keyword),
    ); // kiểm tra tiêu đề nào có chứa nội dung tìm kiếm thì hiển thị ra

    displayProducts(filteredResults);
  };

  searchInput.onkeyup = (e) => {
    if (e.key === "Enter") {
      searchButton.click();
    }
  }; // đặt nút Enter trên bàn phím tương đương với sự kiện click chuột vào nút tìm kiếm
}

// Trang trả về kết quả tìm kiếm
async function init() {
  const response = await fetch("/JS/data/data.json");
  allProducts = await response.json();
  displayProducts(allProducts);
  handleSearch();
}

init();
