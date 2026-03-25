function getParam(name) {}
function generateID() {
  //tạo id ngẫu nhiên cho đơn hàng VD: DH-12345
  var random = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

  return "DH-" + random;
}
