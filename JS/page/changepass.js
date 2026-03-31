const event_change = document.getElementById("btnChange");
event_change.addEventListener("click", () => {
  let user = storage.get("currentuser"); //lấy thông tin user hiện tại

  let oldPass = document.getElementById("oldPass").value;
  let newPass = document.getElementById("newPass").value;
  let confirmPass = document.getElementById("confirmPass").value;
  if (!validator.isMatch(user.password, oldPass)) { //kiểm tra mật khẩu nhập vào có trùng với mật khẩu của user không
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Mật khẩu hiện tại không chính xác!",
      confirmButtonColor: "#3b6fe6",
    });
    return;
  } else if (!validator.isMatch(newPass, confirmPass)) { //kiểm tra mk mới có trùng với mk mới nhập lại không
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Xác nhận mật khẩu không thành công",
      confirmButtonColor: "#3b6fe6",
    });
    return;
  } else {
    auth.updateUser({ password: newPass }); // thay đổi mật khẩu user

    Swal.fire({
      icon: "success",
      title: "Đổi mật khẩu thành công!",
      confirmButtonColor: "#3b6fe6",
    }).then(() => {
      window.location.href = "/login/profile.html";
    });
  }
});
