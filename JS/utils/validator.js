//kiểm tra các ô trong form

const validator = {
  // kiểm tra ô nhập trống
  isEmpty: function (value) {
    return Object.values(value).some((v) => v === "");
  },
  isEmptyString: function (value) {
    return !value || value.trim() === "";
  },
  // kiểm tra email hợp lệ
  isValidEmail: function (email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  },
  isValidsdt: function (sdt) {
    const pattern = /^0\d{9}$/;
    return pattern.test(sdt);
  },

  // kiểm tra mật khẩu trùng nhau
  isMatch: function (v1, v2) {
    return v1 === v2;
  },

  //kiểm tra độ dài của username
  checkLength: function (value) {
    const v = value.trim();
    return v.length >= 6 && v.length <= 30;
  },
  // kiểm tra username đã tồn tại
  isUsedUsername: function (username) {
    const users = storage.get("users") || [];
    return users.some((user) => user.username === username);
  },

  // kiểm tra email đã tồn tại
  isUsedEmail: function (email) {
    const users = storage.get("users") || [];
    return users.some((user) => user.email === email);
  },

  // kiểm tra đã đăng nhập chưa
  checkLogin: function () {
    return storage.get("currentuser");
  },
};
