async function loadProducts() {
  const response = await fetch("/JS/data/data.json");
  const data = await response.json();

  const container = document.getElementById("product-list");
  const template = document.getElementById("product-template");

  data.forEach((item) => {
    const clone = template.content.cloneNode(true);

    const price = calculatePrice(item.oldPrice, item.salePercent);

    clone.querySelector(".imgproduct img").src = item.image;
    clone.querySelector(".imgproduct img").alt = item.title;
    clone.querySelector(".book-title").textContent = item.title;
    clone.querySelector(".book-author").textContent = `By ${item.author}`;
    clone.querySelector(".old-price").textContent = format.formatMoney(
      item.oldPrice,
    );
    clone.querySelector(".sale").textContent = `-${item.salePercent * 100}%`;
    clone.querySelector(".current-price").textContent =
      format.formatMoney(price);

    container.appendChild(clone);
  });
}
//hàm tính currentPrice
function calculatePrice(oldPrice, salePercent) {
  return Math.round(oldPrice - oldPrice * salePercent);
}

loadProducts();
