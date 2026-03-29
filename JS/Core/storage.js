const storage = {
  initData: async function () {
    //products
    let data_products = localStorage.getItem("products");
    if (data_products == null) {
      const respone = await fetch("/JS/data/data.json");
      const products = await respone.json();
      localStorage.setItem("products", JSON.stringify(products));
    }
      

    //users
    let data_users = localStorage.getItem("users");
    if (data_users == null) {
      var empty_users = [];
      localStorage.setItem("users", JSON.stringify(empty_users));
    }

    //cart
    let data_cart = localStorage.getItem("cartItems");
    if (data_cart == null) {
      var empty_cart = [];
      localStorage.setItem("cartItems", JSON.stringify(empty_cart));
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
