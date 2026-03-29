const format = {
  //hàm định dạng tiền tệ
  formatCurrency: function (amount) {
    return amount.toLocaleString("vi-VN") + "đ";
  },
  //định dạng ngày tháng
  formatDate: function (mdy) {
    if (mdy == null || mdy == undefined) return "";

    var date = new Date(mdy);
    const formatdate = date.toLocaleDateString("vi-VN");
    return formatdate;
  },
};
