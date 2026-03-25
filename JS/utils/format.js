//định dạng tiền tệ

const format = {
  formatMoney: function (number) {
    if (number == 0 || number == undefined) return "0VNĐ";

    //ép kiểu
    var number = Number(number);
    return number.toLocaleString("vi-VN") + "VNĐ";
  },

  //định dạng ngày tháng
  formatDate: function (mdy) {
    if (mdy == null || mdy == undefined) return "";

    var date = new Date(mdy);
    const formatdate = date.toLocaleDateString('vi-VN');
    return formatdate;
  },
};
