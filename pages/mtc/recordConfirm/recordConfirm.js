Page({
  data: {
  },
  //修改车牌号
  goKeyWordpage(){
    my.navigateTo({
      url: "../addLicensePlate/addLicensePlate"
    })
  },
  //信息无误
  goInvoice(){
    my.navigateTo({
      url: "../confirmSuccess/confirmSuccess"
    })
  }
})