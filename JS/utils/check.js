const currentuser = validator.checkLogin();
if (!currentuser) {
  document.querySelector("a[href*=giohang]").addEventListener("click", (e) => {
    e.preventDefault();
    alert("vui lòng đăng nhập !!");
  });
}

//kiểm tra đã đăng nhập chưa
