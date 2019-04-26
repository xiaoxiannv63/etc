Page({
  data: {},
  onLoad() {},
  toMyInv(){
    my.navigateTo({
      url: "/pages/myInvoice/invoiceList/invoiceList"
    });
  },
  continue(){
    my.navigateBack();
  },
  backToFirst(){
     my.switchTab({
      url: "/pages/index/index"
    });
  }
});
