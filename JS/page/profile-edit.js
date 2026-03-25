const event_edit = document.getElementById("submit");
event_edit.addEventListener("click", (e) => { // sự kiện khi bấm lưu thông tin
  e.preventDefault();

  //lấy giá trị từ các ô và lưu vào biến tạm
  const value_hoten = document.getElementById("hoten").value;
  const value_gioitinh = document.getElementById("gioitinh").value;
  const value_ngaysinh = document.getElementById("ngaysinh").value;
  const value_sdt = document.getElementById("sdt").value;
  const value_diachi = document.getElementById("diachi").value;

  //kiểm tra rỗng đối với các ô
  if (
    validator.isEmptyString(value_hoten) ||
    validator.isEmptyString(value_gioitinh) ||
    validator.isEmptyString(value_ngaysinh) ||
    validator.isEmptyString(value_sdt) ||
    validator.isEmptyString(value_diachi)
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng nhập đầy đủ thông tin",
      confirmButtonColor: "#3b6fe6",
    });
    return;
  } else {
    auth.updateUser({ //update giá trị khi các giá trị trong ô đều thỏa đ/k
      hoten: value_hoten,
      gioitinh: value_gioitinh,
      ngaysinh: value_ngaysinh,
      sdt: value_sdt,
      diachi: value_diachi,
    });
    event_edit.disabled = true; //ngăn không cho spam nút bấm liên tục
    Swal.fire({
      title: "Cập nhật thông tin thành công!",
      icon: "success",
      confirmButtonColor: "#3b6fe6",
    }).then((ok) => {
      if (ok.isConfirmed) window.location.href = "../login/profile.html";
    });
  }
});
