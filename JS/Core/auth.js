const auth = {
  register: function (userData) {
    let users = storage.get("users") || [];
    const check_box = document.getElementById("checkbox");

    if (validator.isEmpty(userData)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng nhập đầy đủ thông tin",
        confirmButtonColor: "#3b6fe6",
      });
    } else if (!validator.isValidEmail(userData.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email không hợp lệ!",
        confirmButtonColor: "#3b6fe6",
      });
    } else if (!validator.isMatch(userData.password, userData.repassword)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Mật khẩu không trùng nhau!",
        confirmButtonColor: "#3b6fe6",
      });
    } else if (!validator.checkLength(userData.username, 6, 30)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username phải từ 6 đến 30 ký tự!",
        confirmButtonColor: "#3b6fe6",
      });
    } else if (!check_box.checked) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng đồng ý với chính sách!",
        confirmButtonColor: "#3b6fe6",
      });
    } else if (validator.isUsedUsername(userData.username)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username đã tồn tại!",
        confirmButtonColor: "#3b6fe6",
      });
    } else if (validator.isUsedEmail(userData.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email đã tồn tại!",
        confirmButtonColor: "#3b6fe6",
      });
    } else {
      delete userData.repassword; // xóa repassword
      delete userData.check; //xóa checkbox
      userData.firstLogin = true; // thêm thuộc tính đăng nhập lần đầu
      users.push(userData); // thêm user mới
      storage.set("users", users);

      Swal.fire({
        title: "Đăng ký thành công!",
        text: "Đang chuyển hướng...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = "../login/login.html";
      }, 2000);
    }
  },

  login: function () {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let users = storage.get("users") || [];

    const currentUser = users.find(function (v) {
      if (user === v.username && pass === v.password) return true;
      return false;
    }); // thêm phương thức find đồng thời định nghĩa cho đối tượng user

    if (currentUser) {
      Swal.fire({
        title: "Đăng nhập thành công!",
        text: "Đang chuyển hướng...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(function () {
        storage.set("currentuser", currentUser);
        if (currentUser.firstLogin === true) {
          
          let users = storage.get("users") || [];
          const idx = users.findIndex(
            (v) => v.username === currentUser.username,
          );
          users[idx] = currentUser;
          
          storage.set("users", users);
          
          storage.set("currentuser", currentUser);

          window.location.href = "../login/profile-edit.html";
        } else {
          window.location.href = "../trangchu.html";
        }
      }, 2000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sai username hoặc mật khẩu!",
        confirmButtonColor: "#3b6fe6",
      });
    }
  },

  logout: function () {
    storage.remove("currentuser");
    window.location.href = "/login/login.html";
  },

  getCurrentUser: function () {
    return storage.get("currentuser");
  },

  updateUser: function (userData) {
    let users = storage.get("users") || [];
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      console.error("Chưa đăng nhập");
      return;
    }
    const idx = users.findIndex((v) => v.username === currentUser.username);

    users[idx] = {
      ...users[idx],
      ...userData,
    };
    storage.set("users", users);
    storage.set("currentuser", users[idx]);
  },
};
