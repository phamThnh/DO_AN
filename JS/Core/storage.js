const storage = {
  initData: function () {
    //products
    let data_products = localStorage.getItem("products");
    if (data_products == null)
      localStorage.setItem("products", JSON.stringify(products));

    //users
    let data_users = localStorage.getItem("users");
    if (data_users == null) {
      var empty_users = [];
      localStorage.setItem("users", JSON.stringify(empty_users));
    }

    //cart
    let data_cart = localStorage.getItem("cart");
    if (data_cart == null) {
      var empty_cart = [];
      localStorage.setItem("cart", JSON.stringify(empty_cart));
    }

    //orders
    let data_orders = localStorage.getItem("orders");
    if (data_orders == null) {
      var empty_orders = [];
      localStorage.setItem("orders", JSON.stringify(empty_orders));
    }

    //current user
    let data_currentuser = localStorage.getItem("currentuser");
    if (data_currentuser == null) {
      localStorage.setItem("currentuser", JSON.stringify(null));
    }
  },
  //Lấy dữ liệu
  get: function (key) {
    let data = localStorage.getItem(key);

    if (data == null) return null;
    let obj = JSON.parse(data);
    return obj;
  },
  //luư dữ liệu
  set: function (key, value) {
    let datastring = JSON.stringify(value);
    localStorage.setItem(key, datastring);
  },
  //xóa dữ liệu
  remove: function (key) {
    localStorage.removeItem(key);
  },
};
