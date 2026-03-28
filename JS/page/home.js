//hàm hiển thị sản phẩm ngẫu nhiên
async function loadrandomProducts(id) {
  const response = await fetch("/JS/data/data.json");
  const data = await response.json();

  const container = document.getElementById(id);
  const product = document.getElementById("product");

  const sorteddata = data.sort(() => 
    0.5 - Math.random()).slice(0,4);


  sorteddata.forEach((item) => {
    const clone = product.content.cloneNode(true);

    const price = calculatePrice(item.oldPrice,item.salePercent);

    clone.querySelector(".imgproduct img").src = item.image;
    clone.querySelector(".imgproduct img").alt = item.title;
    clone.querySelector(".book-title").textContent = item.title;
    clone.querySelector(".book-author").textContent = `By ${item.author}`;
    clone.querySelector(".old-price").textContent = format.formatMoney(item.oldPrice);
    clone.querySelector(".sale").textContent = `-${item.salePercent * 100}%`;
    clone.querySelector(".current-price").textContent = format.formatMoney(price);

    container.appendChild(clone);
  });
}
//hàm tính currentPrice
function calculatePrice(oldPrice, salePercent) {
    return Math.round(oldPrice - oldPrice*salePercent);
}

loadrandomProducts("product-list1");
loadrandomProducts("product-list2");
loadrandomProducts("product-list3");