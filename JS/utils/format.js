//định dạng tiền tệ

const format = {
  formatMoney: function (number) {
    let formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    if (number == 0 || number == undefined) return formatter.format(0);

    //ép kiểu
    number = Number(number);
    return formatter.format(number);
  },

  //định dạng ngày tháng
  formatDate: function (mdy) {
    if (mdy == null || mdy == undefined) return "";

    var date = new Date(mdy);
    const formatdate = date.toLocaleDateString("vi-VN");
    return formatdate;
  },
};
