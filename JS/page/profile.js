const event_changeinfo = document.getElementById("submit__change-info");
const event_changepass = document.getElementById("submit__change-pass");
const event_logout = document.getElementById("submit__logout");

//hiển thị thông tin của người dùng
const current_user = storage.get("currentuser");
if (current_user) {
  document.getElementById("hoten_").innerText = current_user.hoten;

  document.getElementById("gender_").innerText = current_user.gioitinh;

  let f_ngaysinh = format.formatDate(current_user.ngaysinh);
  document.getElementById("ngaysinh_").innerText = f_ngaysinh;

  document.getElementById("email_").innerText = current_user.email;

  document.getElementById("sdt_").innerText = current_user.sdt;

  document.getElementById("diachi_").innerText = current_user.diachi;

  //sự kiện đổi thông tin
  event_changeinfo.addEventListener("click", () => {
    window.location.href = "/login/profile-edit.html";
  });

  //sự kiện đổi mật khẩu
  event_changepass.addEventListener("click", () => {
    window.location.href = "/login/changepass.html";
  });

  //sự kiện đăng xuất
  event_logout.addEventListener("click", () => {
    auth.logout();
  });
}
