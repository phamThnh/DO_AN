// lấy sản phẩm từ storage
async function getAllProducts() {
  const response = await fetch("/JS/data/data.json");
  return await response.json();
}

// tìm 1 cuốn sách cụ thể theo bằng ID
async function getProductById(id) {
  const products = await getAllProducts();
  return products.find((item) => item.id === id);
}

// Tìm kiếm tên sách
async function searchProducts(keyword) {
  const products = await getAllProducts();
  const key = keyword.toLowerCase().trim();
  return products.filter((item) => item.title.toLowerCase().includes(key));
}

// chọn 4 cuốn sách ngẫu nhiên từ storage
async function getFeaturedProducts(count = 4) {
  const products = await getAllProducts();
  // Trộn ngẫu nhiên
  const shuffled = products.sort(() => Math.random() - 0.5);
  // Cắt lấy số lượng mong muốn
  return shuffled.slice(0, count);
}
